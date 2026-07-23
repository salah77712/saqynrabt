import re

with open(r'frontend\app\dashboard\analytics\page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Cards 2,3,4 at lines 89,94,99 have bare <Card> with content on next line
    if line == '      <Card>\n' and i+1 < len(lines):
        next_line = lines[i+1]
        if 'Annual Run Rate' in next_line or 'Active Companies' in next_line or 'Monthly Questions Usage' in next_line:
            line = '      <Card className="p-6 rounded-2xl">\n'
    new_lines.append(line)

with open(r'frontend\app\dashboard\analytics\page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print('analytics cards 2,3,4 fixed')
