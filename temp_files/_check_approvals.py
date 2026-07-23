with open(r'frontend\app\dashboard\approvals\page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

print('--- approvals button check ---')
for i, line in enumerate(c.split('\n'), 1):
    if 'class=' in line and ('Approve' in c.split('\n')[min(i, len(c.split('\n'))-1)] or 'Approving' in c.split('\n')[max(0,i-2):i+2].__str__()):
        pass

# Check line 167
lines = c.split('\n')
for i, l in enumerate(lines, 1):
    if 'hover:shadow-md' in l and 'Approve' in l:
        print(f'Line {i}: {l}')
