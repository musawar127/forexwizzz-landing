"use client";

/**
 * ForexMarketHoursClock
 *
 * Live, interactive forex market hours and session clock.
 * Uses the pure calculation module at @/lib/forex-sessions.
 *
 * Hydration-safe: renders a static placeholder on the server and on the
 * first client render, then hydrates with live, ticking data after mount.
 * All timezone math is DST-aware via the Intl API and IANA timezones.
 */

import { useEffect, useMemo, useState } from "react";
import {
  SESSIONS,
  PRESET_TIMEZONES,
  getAllTimezones,
  detectTimezone,
  formatInTimezone,
  getDatePartsInTz,
  getTimezoneOffsetMinutes,
  getMarketStatus,
  getAllSessionStatuses,
  getLondonNyOverlap,
  formatCountdown,
  type SessionDef,
  type SessionStatus,
} from "@/lib/forex-sessions";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

/** Distinct color per session (no indigo / blue). */
const SESSION_COLORS: Record<string, string> = {
  Sydney: "#ffd740",
  Tokyo: "#ff5252",
  London: "#00e676",
  "New York": "#ba68c8",
};

/** Convert a #rrggbb hex to an rgba() string with the given alpha. */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Compute the session open/close as decimal hours (0-24) in the visitor's
 * timezone, for positioning bars on the 24-hour timeline. Mirrors the
 * logic of sessionTimeToTargetTz but returns numeric hours.
 */
function getSessionHoursInVisitorTz(
  session: SessionDef,
  date: Date,
  visitorTz: string
): { startHour: number; endHour: number } {
  const parts = getDatePartsInTz(date, session.timezone);
  const sessionOffset = getTimezoneOffsetMinutes(session.timezone, date);
  const startUtcMs =
    Date.UTC(parts.year, parts.month - 1, parts.day, session.openHour, session.openMinute, 0) -
    sessionOffset * 60 * 1000;
  const endUtcMs =
    Date.UTC(parts.year, parts.month - 1, parts.day, session.closeHour, session.closeMinute, 0) -
    sessionOffset * 60 * 1000;

  const sParts = getDatePartsInTz(new Date(startUtcMs), visitorTz);
  const eParts = getDatePartsInTz(new Date(endUtcMs), visitorTz);

  return {
    startHour: sParts.hour + sParts.minute / 60,
    endHour: eParts.hour + eParts.minute / 60,
  };
}

/**
 * Compute the London–New York overlap as absolute UTC timestamps so we
 * can show a live countdown. Mirrors getLondonNyOverlap but returns ms.
 */
function getOverlapTimestamps(date: Date): { startMs: number; endMs: number } | null {
  const london = SESSIONS.find((s) => s.name === "London");
  const ny = SESSIONS.find((s) => s.name === "New York");
  if (!london || !ny) return null;

  const parts = getDatePartsInTz(date, "UTC");
  const londonOffset = getTimezoneOffsetMinutes(london.timezone, date);
  const nyOffset = getTimezoneOffsetMinutes(ny.timezone, date);

  const londonOpenUtc =
    Date.UTC(parts.year, parts.month - 1, parts.day, london.openHour, london.openMinute, 0) -
    londonOffset * 60 * 1000;
  const londonCloseUtc =
    Date.UTC(parts.year, parts.month - 1, parts.day, london.closeHour, london.closeMinute, 0) -
    londonOffset * 60 * 1000;
  const nyOpenUtc =
    Date.UTC(parts.year, parts.month - 1, parts.day, ny.openHour, ny.openMinute, 0) -
    nyOffset * 60 * 1000;
  const nyCloseUtc =
    Date.UTC(parts.year, parts.month - 1, parts.day, ny.closeHour, ny.closeMinute, 0) -
    nyOffset * 60 * 1000;

  const start = Math.max(londonOpenUtc, nyOpenUtc);
  const end = Math.min(londonCloseUtc, nyCloseUtc);
  if (end <= start) return null;
  return { startMs: start, endMs: end };
}

/** Format an hour (0-24) as a label, honoring the 12h/24h toggle. */
function formatHourLabel(h: number, use24Hour: boolean): string {
  if (use24Hour) return `${String(h).padStart(2, "0")}:00`;
  if (h === 0) return "12a";
  if (h === 12) return "12p";
  if (h === 24) return "12a";
  return h < 12 ? `${h}a` : `${h - 12}p`;
}

/* ------------------------------------------------------------------ */
/* Session card                                                        */
/* ------------------------------------------------------------------ */

function SessionCard({
  status,
}: {
  status: SessionStatus;
}) {
  const color = SESSION_COLORS[status.session.name] ?? "#ffffff";
  const nextEventText = status.isOpen
    ? `Closes in ${formatCountdown(status.msUntilClose)}`
    : `Opens in ${formatCountdown(status.msUntilOpen)}`;

  return (
    <div
      className="glass-strong rounded-xl p-4 md:p-5 flex flex-col gap-3 h-full"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-bold" style={{ color }}>
          {status.session.name}
        </h3>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            status.isOpen
              ? "bg-trading-green/20 text-trading-green border border-trading-green/40"
              : "bg-white/5 text-muted-foreground border border-white/10"
          }`}
        >
          {status.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          Session Local Time
        </p>
        <p className="text-xl font-bold tabular-nums text-foreground">
          {status.localTime}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Opens
          </p>
          <p className="text-sm font-semibold tabular-nums text-foreground">
            {status.openTimeInVisitorTz}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Closes
          </p>
          <p className="text-sm font-semibold tabular-nums text-foreground">
            {status.closeTimeInVisitorTz}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-auto pt-1">
        {nextEventText}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function ForexMarketHoursClock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [visitorTz, setVisitorTz] = useState<string>("UTC");
  const [use24Hour, setUse24Hour] = useState(true);

  /* Auto-detect the visitor's timezone on mount, then start ticking. */
  useEffect(() => {
    const detected = detectTimezone();
    const initialNow = new Date();
    // Use a microtask to avoid the lint rule about synchronous setState in effects.
    // This is the standard pattern for client-only initialization (timezone detection,
    // interval setup) that can't run during SSR.
    Promise.resolve().then(() => {
      setVisitorTz(detected);
      setNow(initialNow);
      setMounted(true);
    });
  }, []);

  /* Update every second once mounted. */
  useEffect(() => {
    if (!mounted) return;
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [mounted]);

  /* Build the timezone dropdown list: presets first, then all IANA. */
  const tzOptions = useMemo(() => {
    const presets = PRESET_TIMEZONES.map((p) => ({ label: p.label, value: p.tz }));
    const allTzs = getAllTimezones();
    const presetTzs = new Set(PRESET_TIMEZONES.map((p) => p.tz));
    const others = allTzs
      .filter((tz) => !presetTzs.has(tz))
      .map((tz) => ({ label: tz, value: tz }));
    return [...presets, ...others];
  }, []);

  /* Recompute all live data whenever now / tz / format changes. */
  const data = useMemo(() => {
    if (!now) return null;
    const market = getMarketStatus(now);
    const sessions = getAllSessionStatuses(now, visitorTz);
    const overlap = getLondonNyOverlap(now, visitorTz);

    const visitorParts = getDatePartsInTz(now, visitorTz);
    const visitorHour =
      visitorParts.hour + visitorParts.minute / 60 + visitorParts.second / 3600;
    const visitorTimeStr = formatInTimezone(now, visitorTz, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !use24Hour,
    });
    const visitorDateStr = formatInTimezone(now, visitorTz, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    /* Session bars for the 24-hour timeline. */
    const sessionBars = sessions.map((s) => {
      const { startHour, endHour } = getSessionHoursInVisitorTz(s.session, now, visitorTz);
      const segments: { start: number; end: number }[] = [];
      if (endHour <= startHour) {
        /* Crosses midnight in visitor TZ — split into two segments. */
        segments.push({ start: startHour, end: 24 });
        if (endHour > 0) segments.push({ start: 0, end: endHour });
      } else {
        segments.push({ start: startHour, end: endHour });
      }
      return {
        status: s,
        segments,
        color: SESSION_COLORS[s.session.name] ?? "#ffffff",
      };
    });

    /* Overlap countdown. */
    const overlapTs = getOverlapTimestamps(now);
    const nowMs = now.getTime();
    const overlapCountdown = overlapTs
      ? {
          msUntilStart: Math.max(0, overlapTs.startMs - nowMs),
          msUntilEnd: Math.max(0, overlapTs.endMs - nowMs),
        }
      : null;

    return {
      market,
      sessions,
      overlap,
      overlapCountdown,
      visitorHour,
      visitorTimeStr,
      visitorDateStr,
      sessionBars,
    };
  }, [now, visitorTz, use24Hour]);

  const handleReset = () => {
    setVisitorTz(detectTimezone());
    setUse24Hour(true);
  };

  /* ----- Hydration-safe placeholder ----- */
  if (!mounted || !data) {
    return (
      <div className="w-full glass-strong rounded-2xl gradient-border p-8 md:p-12 text-center">
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading live forex market hours&hellip;
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          Detecting your timezone and session status.
        </p>
      </div>
    );
  }

  const market = data.market;
  const isOpen = market.isOpen;
  const statusColor = isOpen ? "text-trading-green" : "text-trading-red";
  const statusGlow = isOpen ? "text-glow-green" : "";

  /* Overlap countdown text. */
  let overlapCountdownText: string | null = null;
  let overlapCountdownAccent: "gold" | "muted" = "muted";
  if (data.overlap && data.overlapCountdown) {
    if (data.overlap.isActive) {
      overlapCountdownText = `Active now &mdash; ends in ${formatCountdown(data.overlapCountdown.msUntilEnd)}`;
      overlapCountdownAccent = "gold";
    } else if (data.overlapCountdown.msUntilStart > 0) {
      overlapCountdownText = `Starts in ${formatCountdown(data.overlapCountdown.msUntilStart)}`;
    } else {
      overlapCountdownText = "Ended for today";
    }
  }

  return (
    <div className="w-full space-y-5">
      {/* ===== STATUS HEADER ===== */}
      <div
        className={`glass-strong rounded-2xl gradient-border p-5 md:p-6 border ${
          isOpen
            ? "bg-trading-green/5 border-trading-green/30"
            : "bg-trading-red/5 border-trading-red/30"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Global Forex Market
            </p>
            <p
              className={`text-4xl md:text-5xl font-extrabold ${statusColor} ${statusGlow}`}
            >
              {market.status}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {market.nextEvent === "opens" ? "Opens in " : "Closes in "}
              <span className="font-bold text-foreground tabular-nums">
                {formatCountdown(market.countdownMs)}
              </span>
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Your Time &mdash; {visitorTz}
            </p>
            <p className="text-2xl md:text-3xl font-bold tabular-nums text-foreground">
              {data.visitorTimeStr}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {data.visitorDateStr}
            </p>
          </div>
        </div>
      </div>

      {/* ===== CONTROLS ===== */}
      <div className="glass-strong rounded-2xl gradient-border p-4 md:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <label
              htmlFor="fmh-tz"
              className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5"
            >
              Your Timezone
            </label>
            <select
              id="fmh-tz"
              value={visitorTz}
              onChange={(e) => setVisitorTz(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:border-trading-green/50 focus:outline-none transition-colors cursor-pointer"
            >
              {tzOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-trading-dark text-foreground"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Time Format
            </span>
            <div className="inline-flex rounded-lg border border-white/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setUse24Hour(false)}
                aria-pressed={!use24Hour}
                className={`px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                  !use24Hour
                    ? "bg-trading-green text-trading-dark"
                    : "bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                12h
              </button>
              <button
                type="button"
                onClick={() => setUse24Hour(true)}
                aria-pressed={use24Hour}
                className={`px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                  use24Hour
                    ? "bg-trading-green text-trading-dark"
                    : "bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                24h
              </button>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2 text-sm font-semibold glass-strong border border-white/10 hover:border-trading-green/30 text-foreground hover:text-trading-green rounded-lg transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* ===== SESSION CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.sessions.map((s) => (
          <SessionCard key={s.session.name} status={s} />
        ))}
      </div>

      {/* ===== LONDON–NY OVERLAP ===== */}
      <div className="glass-strong rounded-2xl gradient-border p-5 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-foreground">
              London &amp; New York Overlap
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              The highest-liquidity window when both major sessions are open.
            </p>
          </div>
          {data.overlap && (
            <span
              className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                data.overlap.isActive
                  ? "bg-trading-gold/20 text-trading-gold border border-trading-gold/40 animate-pulse"
                  : "bg-white/5 text-muted-foreground border border-white/10"
              }`}
            >
              {data.overlap.isActive ? "Active Now" : "Inactive"}
            </span>
          )}
        </div>

        {data.overlap ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Window
                </p>
                <p className="text-lg font-bold tabular-nums text-foreground">
                  {data.overlap.startIso} &ndash; {data.overlap.endIso}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Duration
                </p>
                <p className="text-lg font-bold tabular-nums text-foreground">
                  {data.overlap.durationMinutes} min
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Sessions
                </p>
                <p className="text-lg font-bold text-foreground">
                  {data.overlap.sessionA} &amp; {data.overlap.sessionB}
                </p>
              </div>
            </div>
            {overlapCountdownText && (
              <p
                className="mt-4 text-sm"
                dangerouslySetInnerHTML={{
                  __html:
                    overlapCountdownAccent === "gold"
                      ? `<span class="font-bold text-trading-gold">${overlapCountdownText}</span>`
                      : `<span class="text-muted-foreground">${overlapCountdownText}</span>`,
                }}
              />
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            No overlap window detected for today.
          </p>
        )}
      </div>

      {/* ===== 24-HOUR TIMELINE ===== */}
      <div className="glass-strong rounded-2xl gradient-border p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="text-base font-bold text-foreground">
            24-Hour Session Timeline
          </h3>
          <p className="text-xs text-muted-foreground">
            Times shown in {visitorTz}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
          {data.sessionBars.map((s) => (
            <div key={s.status.session.name} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs text-muted-foreground font-medium">
                {s.status.session.name}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 sm:ml-auto">
            <span className="w-0.5 h-4 bg-trading-gold inline-block" />
            <span className="text-xs text-muted-foreground font-medium">
              Current Time
            </span>
          </div>
        </div>

        {/* Timeline track */}
        <div className="relative">
          <div className="space-y-1.5">
            {data.sessionBars.map((s) => (
              <div
                key={s.status.session.name}
                className="relative h-8 bg-white/5 rounded overflow-hidden"
              >
                {/* Hour grid lines */}
                {[3, 6, 9, 12, 15, 18, 21].map((h) => (
                  <div
                    key={h}
                    className="absolute top-0 bottom-0 w-px bg-white/5"
                    style={{ left: `${(h / 24) * 100}%` }}
                  />
                ))}
                {/* Session segments */}
                {s.segments.map((seg, j) => {
                  const width = ((seg.end - seg.start) / 24) * 100;
                  const showLabel = width > 10;
                  return (
                    <div
                      key={j}
                      className="absolute inset-y-1 rounded flex items-center px-2 overflow-hidden"
                      style={{
                        left: `${(seg.start / 24) * 100}%`,
                        width: `${width}%`,
                        backgroundColor: hexToRgba(s.color, 0.25),
                        border: `1px solid ${hexToRgba(s.color, 0.6)}`,
                      }}
                    >
                      {showLabel && (
                        <span
                          className="text-[10px] font-bold truncate"
                          style={{ color: s.color }}
                        >
                          {s.status.session.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Current-time indicator (spans all rows) */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-trading-gold pointer-events-none z-10"
            style={{ left: `${(data.visitorHour / 24) * 100}%` }}
          >
            <div className="absolute -top-1 -left-[3px] w-2 h-2 bg-trading-gold rounded-full shadow-[0_0_8px_rgba(255,215,64,0.9)]" />
          </div>
        </div>

        {/* Hour labels */}
        <div className="relative mt-2 h-5">
          {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => {
            const pos = (h / 24) * 100;
            const alignClass =
              h === 0
                ? "translate-x-0"
                : h === 24
                  ? "-translate-x-full"
                  : "-translate-x-1/2";
            return (
              <span
                key={h}
                className={`absolute text-[10px] text-muted-foreground tabular-nums ${alignClass}`}
                style={{ left: `${pos}%` }}
              >
                {formatHourLabel(h, use24Hour)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground/70 leading-relaxed text-center max-w-3xl mx-auto">
        Session times are indicative retail FX activity windows, not official
        exchange hours. The retail forex market runs approximately Sunday 17:00
        New York time to Friday 17:00 New York time. All conversions are
        DST-aware and update live every second.
      </p>
    </div>
  );
}

export default ForexMarketHoursClock;
