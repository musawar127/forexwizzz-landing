#!/usr/bin/env python3
import os

# Base directory
base = '/home/z/my-project/src/app/best-time-to-trade-xauusd'

# Read all .part files in order and concatenate
parts = []
i = 1
while True:
    pf = f'/home/z/my-project/scripts/parts/p{i}.txt'
    if not os.path.exists(pf):
        break
    with open(pf, 'r') as f:
        parts.append(f.read())
    i += 1

with open(f'{base}/page.tsx', 'w') as out:
    out.write(''.join(parts))

print(f'Assembled {len(parts)} parts into page.tsx')
print(f'Total size: {os.path.getsize(f"{base}/page.tsx")} bytes')
