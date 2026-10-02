# Task 4 — PipValueCalculator Component

**Agent:** Main Agent
**Task ID:** 4
**Deliverable:** `/home/z/my-project/src/components/tools/pip-value-calculator.tsx`

## Summary

Created a fully client-side (`"use client"`) React component `PipValueCalculator` that wraps the pure calculation module at `@/lib/pip-value-calc`. The component supports both XAUUSD (gold) and FOREX (currency pairs) modes with live recalculation via `useMemo` — no submit button.

## API consumed from `@/lib/pip-value-calc`

- `calculatePipValue(inputs: PipValueInputs): PipValueResult` — main calc
- `formatMoney(value, currency)` — used for ALL monetary displays
- `parseForexPair(pair)` — base/quote split for FOREX
- `getDefaultForexPipSize(pair)` — auto pip size (0.01 for JPY quotes, 0.0001 otherwise)
- `DEFAULT_XAUUSD_INPUTS`, `DEFAULT_FOREX_INPUTS` — reset values per mode
- `FOREX_PAIR_PRESETS` — pair dropdown options
- `ACCOUNT_CURRENCIES` — account currency dropdown options
- Types: `InstrumentMode`, `PipValueInputs`, `PipValueResult`

## Component design

### Mode toggle (top)
Two-button toggle: **XAUUSD (Gold)** (gold accent) / **Forex Pairs** (green accent). Switching mode resets contract size + lot size to that mode's defaults and clears the conversion rate.

### XAUUSD mode inputs
- Lot size, Contract size (default 100)
- Pip convention: 3-button selector — `$0.01 / pip` (1-cent), `$0.10 / pip` (10-cent), `Custom`
- Custom pip size input shown only when convention = custom
- Account currency dropdown (from `ACCOUNT_CURRENCIES`)
- Conversion rate field shown only when account currency != USD; label = `USD to {acct} Conversion Rate`

### FOREX mode inputs
- Currency pair dropdown (all `FOREX_PAIR_PRESETS` + a "Custom (6-letter)" option)
- Custom 6-letter pair text input (uppercase, A-Z only, maxLength 6) shown only when "Custom" selected; inline validation for length/format
- Lot size, Contract size (default 100000)
- Pip size: Auto-detect / Custom toggle. Auto uses `getDefaultForexPipSize(pair)` and displays the detected value. Custom shows a manual input.
- Account currency dropdown
- Conversion rate field shown conditionally based on `getConversionContext()`:
  - quote == account → no field, descriptive text
  - base == account → field labeled `{pair} Current Price ({quote}/{base})` (calc inverts internally)
  - third currency → field labeled `{quote} to {acct} Conversion Rate`

### Price distance section (optional, collapsible)
Toggle button with ON/OFF badge. When ON: Start Price, End Price, Direction (BUY/SELL). Results only computed when both prices are valid.

### Results panel (right, sticky on desktop)
- LIVE badge with pulsing green dot
- Invalid state: red error box showing `result.error`
- Valid state:
  - Instrument summary card (instrument, pip convention, lot size, contract exposure with oz/units unit, quote currency)
  - Headline: Value per Pip (1 pip) in account currency — large green glowing number
  - Pip Values at Scale grid: 1 / 10 / 50 / 100 / 500 pips + per standard lot
  - Currency breakdown: value per pip in quote currency + in account currency
  - Conversion card: `result.conversionDescription` + applied rate
  - Price distance result card (gold border) when prices provided: price difference, pip count, absolute move value, signed P/L (green/red by sign)

### Behavior
- All calculations via `useMemo` keyed on form state + derived pipSize/pair
- Reset button restores `initialForm()`
- Account currency change clears conversion rate
- FOREX pair change clears conversion rate
- Mode change clears conversion rate + resets mode-specific defaults

## Styling (matches `xauusd-lot-size-calculator.tsx`)
- `glass-strong`, `gradient-border`, `bg-white/5`, `border-white/10`
- `text-trading-green`, `text-trading-gold`, `text-trading-red`
- `text-glow-green` for headline
- `inputClass`, `labelClass`, `sectionHeaderClass` constants reused from reference
- Two-column grid `lg:grid-cols-2` with `lg:sticky lg:top-6` results panel; stacked on mobile

## JSX rule compliance
- No `{" "}` at end of heading spans (used `ml-1` spacing classes instead for inline label/value pairs)
- HTML entities `&mdash;`, `&apos;` used only in JSX text content (not in string expressions)
- Unicode escapes (`\u2014` em-dash, `\u2192` arrow) used inside string expressions where entities wouldn't be interpreted
- Named export `PipValueCalculator` + default export

## Verification
- `bun run lint` — passes cleanly (0 errors, 0 warnings)
- Dev server compiles without errors
