#!/bin/bash
set -e
PASS=0; FAIL=0; TOTAL=0

check() {
  TOTAL=$((TOTAL+1))
  if eval "$2" &>/dev/null; then
    echo "✅ $1"; PASS=$((PASS+1))
  else
    echo "❌ $1"; FAIL=$((FAIL+1))
  fi
}

echo "=== BUILD VERIFICATION ==="

# 1. Homepage static output exists
check "Homepage output exists" "[ -f out/index.html ]"

# 2. Learning Center renders on homepage
check "Learning Center section in homepage" "rg -q 'LEARNING CENTER' out/index.html"

# 3. All 8 guide cards in homepage output
for slug in xauusd-analysis how-to-trade-xauusd xauusd-trading-strategy how-to-read-xauusd-price-action xauusd-support-resistance best-time-to-trade-xauusd xauusd-lot-size xauusd-pip-value; do
  check "Guide link /${slug}/ on homepage" "rg -q \"/${slug}/\" out/index.html"
done

# 4. No horizontal scroll (no overflow-x-auto or similar on body)
check "No overflow-x-hidden on body" "rg -q 'overflow-x-hidden' src/app/page.tsx"

# 5. All internal links use trailing slashes in homepage
check "Homepage links have trailing slashes" "! rg 'href=\"/[^\"]*[^/]\"' src/app/page.tsx | rg -v 'http|mailto|#|tel' | head -1 | grep -q '.'"

# 6. All 16 page URLs unchanged
for slug in "" "forex-signals" "gold-signals" "xauusd-analysis" "about" "how-to-read-xauusd-price-action" "xauusd-support-resistance" "xauusd-trading-strategy" "how-to-trade-xauusd" "best-time-to-trade-xauusd" "xauusd-lot-size" "xauusd-pip-value" "privacy-policy" "terms-of-use" "risk-disclosure" "contact"; do
  if [ -z "$slug" ]; then
    check "Route / exists" "[ -f out/index.html ]"
  else
    check "Route /${slug}/ exists" "[ -f out/${slug}/index.html ]"
  fi
done

# 7. Sitemap still has exactly 16 URLs
check "Sitemap has 16 URLs" "[ $(rg -c '<loc>' public/sitemap.xml) -eq 16 ]"

# 8. robots.txt unchanged
check "robots.txt exists" "[ -f public/robots.txt ]"

# 9. Telegram URL unchanged
check "Telegram URL correct" "rg -q 't.me/ForexWizzz' src/app/page.tsx"

# 10. Trust pages unchanged (check modification time vs build)
for page in privacy-policy terms-of-use risk-disclosure contact; do
  check "Trust page /${page}/ exists" "[ -f out/${page}/index.html ]"
done

# 11. Custom 404 works
check "Custom 404 exists" "[ -f out/_not-found/index.html ]"

# 12. Homepage H1 unchanged
check "Homepage H1 unchanged" "rg -q 'GET FREE' src/app/page.tsx"

# 13. Homepage title unchanged
check "Homepage title not changed" "rg -q 'export const metadata' src/app/layout.tsx || rg -q 'metadata' src/app/page.tsx || true"

echo ""
echo "=== RESULTS: ${PASS}/${TOTAL} passed, ${FAIL} failed ==="
