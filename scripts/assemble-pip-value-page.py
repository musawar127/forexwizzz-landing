#!/usr/bin/env python3
"""Assemble the XAUUSD pip value page from parts."""
import os, sys

# Execute part 1
result = os.system(sys.executable + ' /home/z/my-project/scripts/gen-pv-part1.py')
if result != 0:
    print("ERROR in part 1")
    sys.exit(1)

# Execute mid section
result = os.system(sys.executable + ' /home/z/my-project/scripts/gen-pv-mid.py')
if result != 0:
    print("ERROR in mid section")
    sys.exit(1)

# Execute part 4
result = os.system(sys.executable + ' /home/z/my-project/scripts/gen-pv-part4.py')
if result != 0:
    print("ERROR in part 4")
    sys.exit(1)

# Execute part 5
result = os.system(sys.executable + ' /home/z/my-project/scripts/gen-pv-part5.py')
if result != 0:
    print("ERROR in part 5")
    sys.exit(1)

# Read part 2 up to the truncation point, then append mid
with open('/home/z/my-project/scripts/gen-pv-part2.py', 'r') as f:
    part2_content = f.read()

# Find the part2 string (from part2 = r''' to the end)
start = part2_content.find("part2 = r'''")
if start >= 0:
    start += len("part2 = r'''")
    # Find where the content was truncated (the last complete line before <div className=)
    # We want everything up to and including '<div className='
    end = part2_content.rfind('<div className=')
    if end >= 0:
        part2_body = part2_content[start:end]
    else:
        part2_body = part2_content[start:]
else:
    part2_body = ''

# Now assemble all parts
output_path = '/home/z/my-project/src/app/xauusd-pip-value/page.tsx'

with open('/tmp/pv-part1.tsx', 'r') as f:
    part1 = f.read()
with open('/tmp/pv-mid.tsx', 'r') as f:
    mid = f.read()
with open('/tmp/pv-part4.tsx', 'r') as f:
    part4 = f.read()
with open('/tmp/pv-part5.tsx', 'r') as f:
    part5 = f.read()

combined = part1 + part2_body + mid + part4 + part5

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(combined)

lines = combined.count('\n') + 1
print(f"Assembled: {output_path}")
print(f"Total lines: {lines}")
print(f"Total chars: {len(combined)}")
