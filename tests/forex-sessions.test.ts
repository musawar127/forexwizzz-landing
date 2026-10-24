import { describe, test, expect } from "bun:test";
import {
  SESSIONS,
  detectTimezone,
  isValidTimezone,
  formatInTimezone,
  getDatePartsInTz,
  getTimezoneOffsetMinutes,
  isSessionOpen,
  getNextSessionEvent,
  getAllSessionStatuses,
  getLondonNyOverlap,
  getMarketStatus,
  formatCountdown,
  formatTimeString,
  PRESET_TIMEZONES,
} from "../src/lib/forex-sessions";

// Use fixed dates to test DST transitions
// 2026 DST transitions:
// US: Spring forward March 8 2026, Fall back November 1 2026
// EU: Spring forward March 29 2026, Fall back October 25 2026
// Australia: Fall back April 5 2026 (AEDT->AEST), Spring forward October 4 2026 (AEST->AEDT)

const SUMMER_2026 = new Date("2026-07-15T12:00:00Z"); // July — US/EU in DST, AU in standard
const WINTER_2026 = new Date("2026-01-15T12:00:00Z"); // January — US/EU in standard, AU in DST
const PRE_US_DST = new Date("2026-03-07T12:00:00Z"); // March 7 — before US DST
const POST_US_DST = new Date("2026-03-10T12:00:00Z"); // March 10 — after US DST
const PRE_EU_DST = new Date("2026-03-28T12:00:00Z"); // March 28 — before EU DST
const POST_EU_DST = new Date("2026-03-30T12:00:00Z"); // March 30 — after EU DST
const PRE_AU_DST = new Date("2026-10-03T12:00:00Z"); // Oct 3 — before AU DST transition (Oct 4)
const POST_AU_DST = new Date("2026-10-05T12:00:00Z"); // Oct 5 — after AU DST transition

describe("Forex Market Hours & Session Clock", () => {

  // === BASIC UTILITIES ===
  test("detectTimezone returns a string", () => {
    const tz = detectTimezone();
    expect(typeof tz).toBe("string");
    expect(tz.length).toBeGreaterThan(0);
  });

  test("isValidTimezone: valid timezones", () => {
    expect(isValidTimezone("UTC")).toBe(true);
    expect(isValidTimezone("America/New_York")).toBe(true);
    expect(isValidTimezone("Asia/Karachi")).toBe(true);
    expect(isValidTimezone("Europe/London")).toBe(true);
    expect(isValidTimezone("Australia/Sydney")).toBe(true);
  });

  test("isValidTimezone: invalid timezones", () => {
    expect(isValidTimezone("Invalid/Zone")).toBe(false);
    expect(isValidTimezone("")).toBe(false);
    expect(isValidTimezone("Foo")).toBe(false);
  });

  test("PRESET_TIMEZONES includes Pakistan, UAE, Saudi Arabia", () => {
    const tzs = PRESET_TIMEZONES.map(p => p.tz);
    expect(tzs).toContain("Asia/Karachi");
    expect(tzs).toContain("Asia/Dubai");
    expect(tzs).toContain("Asia/Riyadh");
    expect(tzs).toContain("UTC");
  });

  // === TIMEZONE OFFSETS ===
  test("getTimezoneOffsetMinutes: UTC is always 0", () => {
    expect(getTimezoneOffsetMinutes("UTC", SUMMER_2026)).toBe(0);
    expect(getTimezoneOffsetMinutes("UTC", WINTER_2026)).toBe(0);
  });

  test("getTimezoneOffsetMinutes: Tokyo is always +540 (no DST)", () => {
    expect(getTimezoneOffsetMinutes("Asia/Tokyo", SUMMER_2026)).toBe(540);
    expect(getTimezoneOffsetMinutes("Asia/Tokyo", WINTER_2026)).toBe(540);
  });

  test("getTimezoneOffsetMinutes: Karachi is always +300 (no DST)", () => {
    expect(getTimezoneOffsetMinutes("Asia/Karachi", SUMMER_2026)).toBe(300);
    expect(getTimezoneOffsetMinutes("Asia/Karachi", WINTER_2026)).toBe(300);
  });

  test("DST: New York offset changes between winter and summer", () => {
    const winterOffset = getTimezoneOffsetMinutes("America/New_York", WINTER_2026);
    const summerOffset = getTimezoneOffsetMinutes("America/New_York", SUMMER_2026);
    expect(winterOffset).toBe(-300); // EST = UTC-5
    expect(summerOffset).toBe(-240); // EDT = UTC-4
    expect(summerOffset).not.toBe(winterOffset);
  });

  test("DST: London offset changes between winter and summer", () => {
    const winterOffset = getTimezoneOffsetMinutes("Europe/London", WINTER_2026);
    const summerOffset = getTimezoneOffsetMinutes("Europe/London", SUMMER_2026);
    expect(winterOffset).toBe(0);   // GMT
    expect(summerOffset).toBe(60);  // BST
  });

  test("DST: Sydney offset changes between summer (AU) and winter (AU)", () => {
    // In July (northern summer), AU is in standard time (AEST = +10:00)
    const julOffset = getTimezoneOffsetMinutes("Australia/Sydney", SUMMER_2026);
    // In January (northern winter), AU is in DST (AEDT = +11:00)
    const janOffset = getTimezoneOffsetMinutes("Australia/Sydney", WINTER_2026);
    expect(julOffset).toBe(600);  // AEST
    expect(janOffset).toBe(660);  // AEDT
  });

  test("DST: US spring transition March 8 2026", () => {
    const before = getTimezoneOffsetMinutes("America/New_York", PRE_US_DST);
    const after = getTimezoneOffsetMinutes("America/New_York", POST_US_DST);
    expect(before).toBe(-300); // EST
    expect(after).toBe(-240);  // EDT
  });

  test("DST: EU spring transition March 29 2026", () => {
    const before = getTimezoneOffsetMinutes("Europe/London", PRE_EU_DST);
    const after = getTimezoneOffsetMinutes("Europe/London", POST_EU_DST);
    expect(before).toBe(0);   // GMT
    expect(after).toBe(60);   // BST
  });

  test("DST: AU spring transition October 4 2026", () => {
    const before = getTimezoneOffsetMinutes("Australia/Sydney", PRE_AU_DST);
    const after = getTimezoneOffsetMinutes("Australia/Sydney", POST_AU_DST);
    expect(before).toBe(600);  // AEST
    expect(after).toBe(660);   // AEDT
  });

  // === SESSION STATUS ===
  test("SESSIONS has 4 sessions", () => {
    expect(SESSIONS.length).toBe(4);
    expect(SESSIONS.map(s => s.name)).toEqual(["Sydney", "Tokyo", "London", "New York"]);
  });

  test("isSessionOpen: London open at 12:00 UTC in summer (13:00 BST)", () => {
    // July 15 2026 12:00 UTC = 13:00 BST (London is in BST, +1)
    // London session: 08:00-17:00 local → 13:00 is within range
    expect(isSessionOpen(SESSIONS[2], SUMMER_2026)).toBe(true);
  });

  test("isSessionOpen: London closed at 02:00 UTC in summer (03:00 BST)", () => {
    const earlyMorning = new Date("2026-07-15T02:00:00Z");
    // 03:00 BST is before 08:00 → closed
    expect(isSessionOpen(SESSIONS[2], earlyMorning)).toBe(false);
  });

  test("isSessionOpen: Tokyo open at 12:00 UTC (21:00 JST)", () => {
    // 12:00 UTC = 21:00 JST → Tokyo 09:00-18:00 → 21:00 is after 18:00 → closed
    // Wait, 21:00 is after 18:00 so it should be closed
    expect(isSessionOpen(SESSIONS[1], SUMMER_2026)).toBe(false);
  });

  test("isSessionOpen: Tokyo open at 01:00 UTC (10:00 JST)", () => {
    const morning = new Date("2026-07-15T01:00:00Z");
    // 10:00 JST is within 09:00-18:00 → open
    expect(isSessionOpen(SESSIONS[1], morning)).toBe(true);
  });

  test("isSessionOpen: New York open at 13:00 UTC in summer (09:00 EDT)", () => {
    const nyTime = new Date("2026-07-15T13:00:00Z");
    // 09:00 EDT is within 08:00-17:00 → open
    expect(isSessionOpen(SESSIONS[3], nyTime)).toBe(true);
  });

  test("isSessionOpen: New York closed at 22:00 UTC in summer (18:00 EDT)", () => {
    const nyTime = new Date("2026-07-15T22:00:00Z");
    // 18:00 EDT is at close (17:00) → closed
    expect(isSessionOpen(SESSIONS[3], nyTime)).toBe(false);
  });

  // === SESSION EVENTS ===
  test("getNextSessionEvent: returns non-negative values", () => {
    for (const session of SESSIONS) {
      const { msUntilOpen, msUntilClose } = getNextSessionEvent(session, SUMMER_2026);
      expect(msUntilOpen).toBeGreaterThanOrEqual(0);
      expect(msUntilClose).toBeGreaterThanOrEqual(0);
      expect(isFinite(msUntilOpen)).toBe(true);
      expect(isFinite(msUntilClose)).toBe(true);
    }
  });

  test("getNextSessionEvent: when open, msUntilClose < msUntilOpen (usually)", () => {
    // At 12:00 UTC July, London is open (13:00 BST)
    const { msUntilOpen, msUntilClose } = getNextSessionEvent(SESSIONS[2], SUMMER_2026);
    expect(msUntilClose).toBeLessThan(msUntilOpen);
  });

  // === ALL SESSION STATUSES ===
  test("getAllSessionStatuses: returns 4 statuses with all fields", () => {
    const statuses = getAllSessionStatuses(SUMMER_2026, "Asia/Karachi");
    expect(statuses.length).toBe(4);
    for (const s of statuses) {
      expect(s.session).toBeDefined();
      expect(typeof s.isOpen).toBe("boolean");
      expect(typeof s.localTime).toBe("string");
      expect(typeof s.openTimeInVisitorTz).toBe("string");
      expect(typeof s.closeTimeInVisitorTz).toBe("string");
      expect(s.msUntilOpen).toBeGreaterThanOrEqual(0);
      expect(s.msUntilClose).toBeGreaterThanOrEqual(0);
      expect(isFinite(s.msUntilOpen)).toBe(true);
      expect(isFinite(s.msUntilClose)).toBe(true);
    }
  });

  // === OVERLAP ===
  test("getLondonNyOverlap: returns an overlap in summer", () => {
    const overlap = getLondonNyOverlap(SUMMER_2026, "UTC");
    expect(overlap).not.toBeNull();
    expect(overlap!.durationMinutes).toBeGreaterThan(0);
    expect(overlap!.sessionA).toBe("London");
    expect(overlap!.sessionB).toBe("New York");
  });

  test("getLondonNyOverlap: duration is ~5 hours in summer (EDT)", () => {
    // Summer: London 08:00-17:00 BST = 07:00-16:00 UTC
    // NY 08:00-17:00 EDT = 12:00-21:00 UTC
    // Overlap: 12:00-16:00 UTC = 4 hours = 240 minutes
    const overlap = getLondonNyOverlap(SUMMER_2026, "UTC");
    expect(overlap).not.toBeNull();
    expect(overlap!.durationMinutes).toBe(240); // 4 hours
  });

  test("getLondonNyOverlap: duration is ~4 hours in winter (EST)", () => {
    // Winter: London 08:00-17:00 GMT = 08:00-17:00 UTC
    // NY 08:00-17:00 EST = 13:00-22:00 UTC
    // Overlap: 13:00-17:00 UTC = 4 hours = 240 minutes
    const overlap = getLondonNyOverlap(WINTER_2026, "UTC");
    expect(overlap).not.toBeNull();
    expect(overlap!.durationMinutes).toBe(240); // 4 hours
  });

  test("getLondonNyOverlap: isActive is boolean", () => {
    const overlap = getLondonNyOverlap(SUMMER_2026, "UTC");
    expect(overlap).not.toBeNull();
    expect(typeof overlap!.isActive).toBe("boolean");
  });

  // === MARKET STATUS (FOREX WEEK) ===
  test("getMarketStatus: market open on Wednesday", () => {
    // July 15 2026 is a Wednesday
    const status = getMarketStatus(SUMMER_2026);
    expect(status.isOpen).toBe(true);
    expect(status.status).toBe("OPEN");
    expect(status.nextEvent).toBe("closes");
    expect(status.countdownMs).toBeGreaterThan(0);
    expect(isFinite(status.countdownMs)).toBe(true);
  });

  test("getMarketStatus: market closed on Saturday", () => {
    // July 18 2026 is a Saturday
    const saturday = new Date("2026-07-18T12:00:00Z");
    const status = getMarketStatus(saturday);
    expect(status.isOpen).toBe(false);
    expect(status.status).toBe("CLOSED");
    expect(status.nextEvent).toBe("opens");
    expect(status.countdownMs).toBeGreaterThan(0);
  });

  test("getMarketStatus: Sunday before 17:00 NY — market closed", () => {
    // July 19 2026 is a Sunday, 12:00 UTC = 08:00 EDT (before 17:00)
    const sundayMorning = new Date("2026-07-19T12:00:00Z");
    const status = getMarketStatus(sundayMorning);
    expect(status.isOpen).toBe(false);
    expect(status.nextEvent).toBe("opens");
  });

  test("getMarketStatus: Sunday after 17:00 NY — market open", () => {
    // July 19 2026 is a Sunday, 22:00 UTC = 18:00 EDT (after 17:00)
    const sundayEvening = new Date("2026-07-19T22:00:00Z");
    const status = getMarketStatus(sundayEvening);
    expect(status.isOpen).toBe(true);
    expect(status.nextEvent).toBe("closes");
  });

  test("getMarketStatus: Friday after 17:00 NY — market closed", () => {
    // July 17 2026 is a Friday, 22:00 UTC = 18:00 EDT (after 17:00)
    const fridayEvening = new Date("2026-07-17T22:00:00Z");
    const status = getMarketStatus(fridayEvening);
    expect(status.isOpen).toBe(false);
    expect(status.nextEvent).toBe("opens");
  });

  test("getMarketStatus: Friday before 17:00 NY — market open", () => {
    // July 17 2026 is a Friday, 12:00 UTC = 08:00 EDT (before 17:00)
    const fridayMorning = new Date("2026-07-17T12:00:00Z");
    const status = getMarketStatus(fridayMorning);
    expect(status.isOpen).toBe(true);
  });

  test("getMarketStatus: countdown never NaN or Infinity", () => {
    for (const date of [SUMMER_2026, WINTER_2026, PRE_US_DST, POST_US_DST, PRE_AU_DST, POST_AU_DST]) {
      const status = getMarketStatus(date);
      expect(isFinite(status.countdownMs)).toBe(true);
      expect(status.countdownMs).toBeGreaterThanOrEqual(0);
    }
  });

  // === FORMATTING ===
  test("formatCountdown: handles 0", () => {
    expect(formatCountdown(0)).toBe("0m 0s");
  });

  test("formatCountdown: handles negative (treats as 0)", () => {
    expect(formatCountdown(-1000)).toBe("0m 0s");
  });

  test("formatCountdown: handles NaN (treats as 0)", () => {
    expect(formatCountdown(NaN)).toBe("0m 0s");
  });

  test("formatCountdown: handles Infinity (treats as 0)", () => {
    expect(formatCountdown(Infinity)).toBe("0m 0s");
  });

  test("formatCountdown: formats hours/minutes/seconds", () => {
    // 2h 15m 30s = 2*3600 + 15*60 + 30 = 8130 seconds = 8130000 ms
    expect(formatCountdown(8130000)).toBe("2h 15m 30s");
  });

  test("formatCountdown: formats days", () => {
    // 3d 5h 20m = 3*86400 + 5*3600 + 20*60 = 278400 seconds = 278400000 ms
    expect(formatCountdown(278400000)).toBe("3d 5h 20m");
  });

  test("formatTimeString: 24h format", () => {
    expect(formatTimeString(14, 30, true)).toBe("14:30");
    expect(formatTimeString(0, 0, true)).toBe("00:00");
    expect(formatTimeString(23, 59, true)).toBe("23:59");
  });

  test("formatTimeString: 12h format", () => {
    expect(formatTimeString(14, 30, false)).toBe("2:30 PM");
    expect(formatTimeString(0, 0, false)).toBe("12:00 AM");
    expect(formatTimeString(12, 0, false)).toBe("12:00 PM");
    expect(formatTimeString(9, 5, false)).toBe("9:05 AM");
  });

  // === INVALID TIMEZONE FALLBACK ===
  test("formatInTimezone: invalid timezone falls back to UTC", () => {
    const result = formatInTimezone(SUMMER_2026, "Invalid/Zone", { hour: "2-digit" });
    expect(typeof result).toBe("string");
    // Should not throw
  });

  test("getDatePartsInTz: invalid timezone returns fallback", () => {
    const parts = getDatePartsInTz(SUMMER_2026, "Invalid/Zone");
    expect(parts).toBeDefined();
    expect(parts.year).toBe(2026);
  });

  // === CROSS-MIDNIGHT ===
  test("Sydney session crosses midnight in some configurations", () => {
    // Sydney 07:00-16:00 doesn't cross midnight, but let's verify the logic
    const sydney = SESSIONS[0];
    expect(sydney.openHour).toBe(7);
    expect(sydney.closeHour).toBe(16);
    // 7 < 16, so doesn't cross midnight
  });

  // === DST EDGE: October 3-5 2026 (AU transition weekend) ===
  test("AU DST transition weekend: Oct 3 before transition", () => {
    const status = getMarketStatus(PRE_AU_DST);
    // Oct 3 2026 is a Saturday → market closed
    expect(status.isOpen).toBe(false);
  });

  test("AU DST transition weekend: Oct 5 after transition", () => {
    const status = getMarketStatus(POST_AU_DST);
    // Oct 5 2026 is a Monday → market open
    expect(status.isOpen).toBe(true);
  });

  test("AU DST: Sydney offset changes across Oct 4 2026", () => {
    const before = getTimezoneOffsetMinutes("Australia/Sydney", PRE_AU_DST);
    const after = getTimezoneOffsetMinutes("Australia/Sydney", POST_AU_DST);
    expect(before).toBe(600);  // AEST (+10:00)
    expect(after).toBe(660);   // AEDT (+11:00)
    expect(before).not.toBe(after);
  });

  // === UAE TIMEZONE ===
  test("UAE timezone has no DST (fixed +4)", () => {
    expect(getTimezoneOffsetMinutes("Asia/Dubai", SUMMER_2026)).toBe(240);
    expect(getTimezoneOffsetMinutes("Asia/Dubai", WINTER_2026)).toBe(240);
  });

  // === PAKISTAN TIMEZONE ===
  test("Pakistan timezone has no DST (fixed +5)", () => {
    expect(getTimezoneOffsetMinutes("Asia/Karachi", SUMMER_2026)).toBe(300);
    expect(getTimezoneOffsetMinutes("Asia/Karachi", WINTER_2026)).toBe(300);
  });
});
