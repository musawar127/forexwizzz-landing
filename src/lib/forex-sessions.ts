/**
 * Forex Market Hours & Session Clock — Pure Calculation Module
 *
 * Contains all timezone and session logic for the Forex Market Hours tool.
 * No React dependencies — pure TypeScript, testable independently.
 *
 * Uses IANA timezone names and the Intl API for DST-aware conversions.
 * Never hardcodes UTC offsets for London, New York, or Sydney.
 */

/** A trading session definition */
export interface SessionDef {
  name: string;
  city: string;
  /** IANA timezone of the trading centre */
  timezone: string;
  /** Local opening hour (24h, e.g. 8 = 08:00) */
  openHour: number;
  /** Local opening minute */
  openMinute: number;
  /** Local closing hour (24h) */
  closeHour: number;
  /** Local closing minute */
  closeMinute: number;
}

/** Result of a session status check */
export interface SessionStatus {
  session: SessionDef;
  isOpen: boolean;
  /** Current local time in the session's trading centre (ISO string) */
  localTime: string;
  /** Opening time in visitor's timezone (ISO string) */
  openTimeInVisitorTz: string;
  /** Closing time in visitor's timezone (ISO string) */
  closeTimeInVisitorTz: string;
  /** Milliseconds until next opening (0 if currently open) */
  msUntilOpen: number;
  /** Milliseconds until next closing (0 if currently closed) */
  msUntilClose: number;
  /** Whether the session crosses midnight in local time */
  crossesMidnight: boolean;
}

/** Overlap interval between two sessions */
export interface SessionOverlap {
  sessionA: string;
  sessionB: string;
  /** Start of overlap in visitor's timezone (ISO string) */
  startIso: string;
  /** End of overlap in visitor's timezone (ISO string) */
  endIso: string;
  /** Duration in minutes */
  durationMinutes: number;
  /** Whether the overlap is currently active */
  isActive: boolean;
}

/** Forex market status */
export interface MarketStatus {
  isOpen: boolean;
  /** "OPEN" or "CLOSED" */
  status: string;
  /** Next event: "opens" or "closes" */
  nextEvent: "opens" | "closes";
  /** ISO string of the next event */
  nextEventTime: string;
  /** Human-readable countdown */
  countdownMs: number;
}

/**
 * The four major forex sessions.
 * Reference hours are commonly cited retail FX conventions:
 * - Sydney: 07:00–16:00 AEST/AEDT
 * - Tokyo: 09:00–18:00 JST
 * - London: 08:00–17:00 GMT/BST
 * - New York: 08:00–17:00 EST/EDT
 *
 * These are indicative activity windows, not official exchange hours.
 */
export const SESSIONS: SessionDef[] = [
  { name: "Sydney", city: "Sydney", timezone: "Australia/Sydney", openHour: 7, openMinute: 0, closeHour: 16, closeMinute: 0 },
  { name: "Tokyo", city: "Tokyo", timezone: "Asia/Tokyo", openHour: 9, openMinute: 0, closeHour: 18, closeMinute: 0 },
  { name: "London", city: "London", timezone: "Europe/London", openHour: 8, openMinute: 0, closeHour: 17, closeMinute: 0 },
  { name: "New York", city: "New York", timezone: "America/New_York", openHour: 8, openMinute: 0, closeHour: 17, closeMinute: 0 },
];

/** Supported preset timezones */
export const PRESET_TIMEZONES = [
  { label: "Pakistan (PKT)", tz: "Asia/Karachi" },
  { label: "UAE (GST)", tz: "Asia/Dubai" },
  { label: "Saudi Arabia (AST)", tz: "Asia/Riyadh" },
  { label: "Qatar", tz: "Asia/Qatar" },
  { label: "Kuwait", tz: "Asia/Kuwait" },
  { label: "Oman", tz: "Asia/Muscat" },
  { label: "Bahrain", tz: "Asia/Bahrain" },
  { label: "United Kingdom", tz: "Europe/London" },
  { label: "United States (New York)", tz: "America/New_York" },
  { label: "UTC", tz: "UTC" },
];

/**
 * Gets the list of all IANA timezones the browser supports.
 * Falls back to preset list if Intl.supportedValuesOf is not available.
 */
export function getAllTimezones(): string[] {
  try {
    // @ts-expect-error - supportedValuesOf may not exist in all TS lib versions
    const supported = Intl.supportedValuesOf?.("timeZone");
    if (supported && Array.isArray(supported)) return supported;
  } catch {
    // fallthrough
  }
  return PRESET_TIMEZONES.map((p) => p.tz);
}

/**
 * Detects the visitor's timezone from the browser.
 * Returns UTC as fallback.
 */
export function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

/**
 * Formats a date in a given timezone.
 */
export function formatInTimezone(date: Date, timezone: string, options: Intl.DateTimeFormatOptions): string {
  try {
    return new Intl.DateTimeFormat("en-US", { ...options, timeZone: timezone }).format(date);
  } catch {
    // Invalid timezone — fall back to UTC
    return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(date);
  }
}

/**
 * Validates whether a timezone string is valid.
 */
export function isValidTimezone(timezone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets the current time in a given timezone as a formatted string.
 */
export function getCurrentTimeInTz(timezone: string, use24Hour: boolean = true): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !use24Hour,
  };
  return formatInTimezone(now, timezone, options);
}

/**
 * Gets the current date in a given timezone (year, month, day, hour, minute).
 * Returns the components that would be shown on a wall clock in that timezone.
 */
export function getDatePartsInTz(date: Date, timezone: string): {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number; // 0 = Sunday
  hour: number;
  minute: number;
  second: number;
} {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = fmt.formatToParts(date);
    const map: Record<string, string> = {};
    for (const part of parts) {
      map[part.type] = part.value;
    }
    const weekdayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
    };
    return {
      year: parseInt(map.year, 10),
      month: parseInt(map.month, 10),
      day: parseInt(map.day, 10),
      dayOfWeek: weekdayMap[map.weekday] ?? 0,
      hour: parseInt(map.hour === "24" ? "0" : map.hour, 10),
      minute: parseInt(map.minute, 10),
      second: parseInt(map.second, 10),
    };
  } catch {
    // Fallback to UTC
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      dayOfWeek: date.getUTCDay(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
    };
  }
}

/**
 * Converts a local session time (in the session's own timezone) to a specific
 * target timezone. Returns an ISO string.
 *
 * We construct a date by interpreting the session's local open/close time
 * in the session's timezone, then format it in the visitor's timezone.
 */
export function sessionTimeToTargetTz(
  session: SessionDef,
  date: Date,
  isClose: boolean,
  targetTimezone: string
): string {
  // Get the current date in the session's timezone
  const parts = getDatePartsInTz(date, session.timezone);
  const hour = isClose ? session.closeHour : session.openHour;
  const minute = isClose ? session.closeMinute : session.openMinute;

  // Build a date string for today's session open/close in the session's TZ
  // We need to create a Date that represents "today at HH:MM in session.timezone"
  // The trick: format the target time in the session timezone, parse it back

  // Create an ISO-like string for the session time
  const dateStr = `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;

  // We can't directly parse this as the session's timezone, so we use a different approach:
  // Format a date that would be "today at HH:MM" in the target timezone

  // Actually, let's use a simpler approach:
  // 1. Create a date for "today at HH:MM" in UTC
  // 2. Find the offset of the session timezone
  // 3. Adjust

  // Better approach: use Intl to format the session time in the target timezone
  // We create a temporary date and use formatToParts

  // Simplest reliable approach: compute the session open/close as a UTC timestamp
  // by finding the offset of the session timezone at the current moment

  const sessionOffset = getTimezoneOffsetMinutes(session.timezone, date);
  // "Today at HH:MM in session.timezone" = "Today at HH:MM + offset in UTC"
  // But we need today's date in session.timezone, not in UTC
  // date in session TZ = parts.year-month-day
  // session time = HH:MM
  // UTC equivalent = session time - session offset

  const utcMs = Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute, 0) - sessionOffset * 60 * 1000;
  const sessionDate = new Date(utcMs);

  // Now format this in the target timezone
  return formatInTimezone(sessionDate, targetTimezone, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * Gets the UTC offset in minutes for a timezone at a given date.
 * Uses the Intl API to determine DST-aware offsets.
 */
export function getTimezoneOffsetMinutes(timezone: string, date: Date): number {
  try {
    // Method: format a known UTC time in the target timezone and compare
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = dtf.formatToParts(date);
    const map: Record<string, string> = {};
    for (const part of parts) map[part.type] = part.value;

    const asUTC = Date.UTC(
      parseInt(map.year, 10),
      parseInt(map.month, 10) - 1,
      parseInt(map.day, 10),
      parseInt(map.hour === "24" ? "0" : map.hour, 10),
      parseInt(map.minute, 10),
      parseInt(map.second, 10)
    );

    // The offset is: (local-as-UTC) - (actual-UTC) → but we need it in the
    // direction that means "add this to local to get UTC"
    // offset = (actual UTC ms) - (local-as-UTC ms) / 60000
    // Wait — if local is ahead of UTC (e.g. Tokyo +9), then local-as-UTC
    // will be 9 hours ahead of actual UTC. So offset = actual - local-as-UTC
    // gives a negative number for east of UTC.
    // We want: to convert local to UTC, we subtract the offset.
    // offset = actualUTC - localAsUTC → this is negative for east.
    // To get "minutes to add to local wall time to get UTC": we need -offset
    // Let's just return (actualUTC - localAsUTC) / 60000
    return (asUTC - date.getTime()) / 60000;
  } catch {
    return 0;
  }
}

/**
 * Checks whether a session is currently open.
 * A session is open if the current time (in the session's timezone) is between
 * the opening and closing times.
 */
export function isSessionOpen(session: SessionDef, date: Date): boolean {
  const parts = getDatePartsInTz(date, session.timezone);
  const currentMinutes = parts.hour * 60 + parts.minute;
  const openMinutes = session.openHour * 60 + session.openMinute;
  const closeMinutes = session.closeHour * 60 + session.closeMinute;

  if (openMinutes < closeMinutes) {
    // Normal session (doesn't cross midnight)
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  } else {
    // Session crosses midnight (e.g. 22:00–06:00)
    return currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  }
}

/**
 * Calculates when the next session opening or closing will occur.
 * Returns milliseconds until the next event.
 */
export function getNextSessionEvent(session: SessionDef, date: Date): {
  msUntilOpen: number;
  msUntilClose: number;
} {
  const parts = getDatePartsInTz(date, session.timezone);
  const nowMinutes = parts.hour * 60 + parts.minute + parts.second / 60;
  const openMinutes = session.openHour * 60 + session.openMinute;
  const closeMinutes = session.closeHour * 60 + session.closeMinute;

  const sessionOffset = getTimezoneOffsetMinutes(session.timezone, date);

  // Helper: convert "today at HH:MM in session TZ" to a Date object
  function makeSessionDate(dayOffset: number, hour: number, minute: number): Date {
    const utcMs = Date.UTC(parts.year, parts.month - 1, parts.day + dayOffset, hour, minute, 0) - sessionOffset * 60 * 1000;
    return new Date(utcMs);
  }

  let msUntilOpen: number;
  let msUntilClose: number;

  if (openMinutes < closeMinutes) {
    // Normal session
    const todayOpen = makeSessionDate(0, session.openHour, session.openMinute);
    const todayClose = makeSessionDate(0, session.closeHour, session.closeMinute);
    const tomorrowOpen = makeSessionDate(1, session.openHour, session.openMinute);

    if (nowMinutes < openMinutes) {
      // Before open today
      msUntilOpen = todayOpen.getTime() - date.getTime();
      msUntilClose = todayClose.getTime() - date.getTime();
    } else if (nowMinutes < closeMinutes) {
      // Currently open
      msUntilOpen = tomorrowOpen.getTime() - date.getTime();
      msUntilClose = todayClose.getTime() - date.getTime();
    } else {
      // After close today
      msUntilOpen = tomorrowOpen.getTime() - date.getTime();
      msUntilClose = makeSessionDate(1, session.closeHour, session.closeMinute).getTime() - date.getTime();
    }
  } else {
    // Session crosses midnight
    const todayOpen = makeSessionDate(0, session.openHour, session.openMinute);
    const todayClose = makeSessionDate(1, session.closeHour, session.closeMinute);

    if (nowMinutes >= openMinutes) {
      // Currently in the open part (after open, before midnight)
      msUntilOpen = makeSessionDate(1, session.openHour, session.openMinute).getTime() - date.getTime();
      msUntilClose = todayClose.getTime() - date.getTime();
    } else if (nowMinutes < closeMinutes) {
      // Currently in the open part (after midnight, before close)
      msUntilOpen = todayOpen.getTime() - date.getTime();
      msUntilClose = todayClose.getTime() - date.getTime();
    } else {
      // Closed (after close, before open)
      msUntilOpen = todayOpen.getTime() - date.getTime();
      msUntilClose = makeSessionDate(1, session.closeHour, session.closeMinute).getTime() - date.getTime();
    }
  }

  // Ensure no negative values
  msUntilOpen = Math.max(0, msUntilOpen);
  msUntilClose = Math.max(0, msUntilClose);

  return { msUntilOpen, msUntilClose };
}

/**
 * Gets the full status for all sessions.
 */
export function getAllSessionStatuses(date: Date, visitorTimezone: string): SessionStatus[] {
  return SESSIONS.map((session) => {
    const open = isSessionOpen(session, date);
    const { msUntilOpen, msUntilClose } = getNextSessionEvent(session, date);
    const crossesMidnight = session.openHour * 60 + session.openMinute >= session.closeHour * 60 + session.closeMinute;

    return {
      session,
      isOpen: open,
      localTime: formatInTimezone(date, session.timezone, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      openTimeInVisitorTz: sessionTimeToTargetTz(session, date, false, visitorTimezone),
      closeTimeInVisitorTz: sessionTimeToTargetTz(session, date, true, visitorTimezone),
      msUntilOpen,
      msUntilClose,
      crossesMidnight,
    };
  });
}

/**
 * Calculates the London–New York overlap.
 * London: 08:00–17:00 (Europe/London)
 * New York: 08:00–17:00 (America/New_York)
 * The overlap is when both are open simultaneously.
 */
export function getLondonNyOverlap(date: Date, visitorTimezone: string): SessionOverlap | null {
  const london = SESSIONS.find((s) => s.name === "London")!;
  const newYork = SESSIONS.find((s) => s.name === "New York")!;

  const parts = getDatePartsInTz(date, "UTC");
  const londonOffset = getTimezoneOffsetMinutes(london.timezone, date);
  const nyOffset = getTimezoneOffsetMinutes(newYork.timezone, date);

  // London open/close in UTC ms
  const londonOpenUtc = Date.UTC(parts.year, parts.month - 1, parts.day, london.openHour, london.openMinute, 0) - londonOffset * 60 * 1000;
  const londonCloseUtc = Date.UTC(parts.year, parts.month - 1, parts.day, london.closeHour, london.closeMinute, 0) - londonOffset * 60 * 1000;

  // New York open/close in UTC ms
  const nyOpenUtc = Date.UTC(parts.year, parts.month - 1, parts.day, newYork.openHour, newYork.openMinute, 0) - nyOffset * 60 * 1000;
  const nyCloseUtc = Date.UTC(parts.year, parts.month - 1, parts.day, newYork.closeHour, newYork.closeMinute, 0) - nyOffset * 60 * 1000;

  // Overlap = max(londonOpen, nyOpen) to min(londonClose, nyClose)
  const overlapStart = Math.max(londonOpenUtc, nyOpenUtc);
  const overlapEnd = Math.min(londonCloseUtc, nyCloseUtc);

  if (overlapEnd <= overlapStart) {
    return null; // No overlap today
  }

  const durationMinutes = Math.round((overlapEnd - overlapStart) / 60000);
  const now = date.getTime();

  return {
    sessionA: "London",
    sessionB: "New York",
    startIso: formatInTimezone(new Date(overlapStart), visitorTimezone, { hour: "2-digit", minute: "2-digit", hour12: false }),
    endIso: formatInTimezone(new Date(overlapEnd), visitorTimezone, { hour: "2-digit", minute: "2-digit", hour12: false }),
    durationMinutes,
    isActive: now >= overlapStart && now < overlapEnd,
  };
}

/**
 * Determines the global retail Forex market status.
 * The retail FX week runs approximately Sunday 17:00 NY time to Friday 17:00 NY time.
 */
export function getMarketStatus(date: Date): MarketStatus {
  const nyParts = getDatePartsInTz(date, "America/New_York");
  const nyOffset = getTimezoneOffsetMinutes("America/New_York", date);

  // Get today's 17:00 NY time as a UTC timestamp
  const today5pmNyUtc = Date.UTC(nyParts.year, nyParts.month - 1, nyParts.day, 17, 0, 0) - nyOffset * 60 * 1000;

  // Sunday = 0, Friday = 5
  const dayOfWeek = nyParts.dayOfWeek;

  if (dayOfWeek === 6) {
    // Saturday — market is always closed
    // Next event: Sunday 17:00 NY
    const sunday5pm = today5pmNyUtc + (1) * 24 * 60 * 60 * 1000; // +1 day to Sunday
    return {
      isOpen: false,
      status: "CLOSED",
      nextEvent: "opens",
      nextEventTime: new Date(sunday5pm).toISOString(),
      countdownMs: Math.max(0, sunday5pm - date.getTime()),
    };
  }

  if (dayOfWeek === 0) {
    // Sunday
    if (date.getTime() < today5pmNyUtc) {
      // Before 17:00 — market closed, opens at 17:00
      return {
        isOpen: false,
        status: "CLOSED",
        nextEvent: "opens",
        nextEventTime: new Date(today5pmNyUtc).toISOString(),
        countdownMs: Math.max(0, today5pmNyUtc - date.getTime()),
      };
    } else {
      // After 17:00 — market open, closes Friday 17:00
      const friday5pm = today5pmNyUtc + (5) * 24 * 60 * 60 * 1000; // +5 days to Friday
      return {
        isOpen: true,
        status: "OPEN",
        nextEvent: "closes",
        nextEventTime: new Date(friday5pm).toISOString(),
        countdownMs: Math.max(0, friday5pm - date.getTime()),
      };
    }
  }

  if (dayOfWeek >= 1 && dayOfWeek <= 4) {
    // Monday–Thursday — market is open
    const friday5pm = Date.UTC(nyParts.year, nyParts.month - 1, nyParts.day + (5 - dayOfWeek), 17, 0, 0) - nyOffset * 60 * 1000;
    return {
      isOpen: true,
      status: "OPEN",
      nextEvent: "closes",
      nextEventTime: new Date(friday5pm).toISOString(),
      countdownMs: Math.max(0, friday5pm - date.getTime()),
    };
  }

  if (dayOfWeek === 5) {
    // Friday
    if (date.getTime() < today5pmNyUtc) {
      // Before 17:00 — still open
      return {
        isOpen: true,
        status: "OPEN",
        nextEvent: "closes",
        nextEventTime: new Date(today5pmNyUtc).toISOString(),
        countdownMs: Math.max(0, today5pmNyUtc - date.getTime()),
      };
    } else {
      // After 17:00 — closed until Sunday 17:00
      const sunday5pm = today5pmNyUtc + (2) * 24 * 60 * 60 * 1000; // +2 days to Sunday
      return {
        isOpen: false,
        status: "CLOSED",
        nextEvent: "opens",
        nextEventTime: new Date(sunday5pm).toISOString(),
        countdownMs: Math.max(0, sunday5pm - date.getTime()),
      };
    }
  }

  // Fallback (shouldn't reach here)
  return {
    isOpen: false,
    status: "CLOSED",
    nextEvent: "opens",
    nextEventTime: new Date().toISOString(),
    countdownMs: 0,
  };
}

/**
 * Formats a countdown in milliseconds to a human-readable string.
 * e.g. "2h 15m 30s" or "3d 5h 20m"
 */
export function formatCountdown(ms: number): string {
  if (!isFinite(ms) || ms < 0) ms = 0;

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}

/**
 * Formats a time string for display (12h or 24h).
 */
export function formatTimeString(hour: number, minute: number, use24Hour: boolean): string {
  if (use24Hour) {
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}
