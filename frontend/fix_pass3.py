import os, re, glob

root = '.'
extensions = ['.tsx', '.ts', '.css']
files = []
for ext in extensions:
    files.extend(glob.glob(f'{root}/**/*{ext}', recursive=True))

PATTERNS = [
    (r'bg-\[#141F33\] text-white\b', 'bg-[#141F33] text-[#F8F9FB]'),
    (r'bg-navy text-white\b', 'bg-[#141F33] text-[#F8F9FB]'),
    (r'bg-\[#141F33\] text-white rounded', 'bg-[#141F33] text-[#F8F9FB] rounded'),
    (r'bg-\[#141F33\] text-white font', 'bg-[#141F33] text-[#F8F9FB] font'),
    (r'text-white font-bold py-4', 'text-[#F8F9FB] font-bold py-4'),
    (r'text-white text-sm font-semibold', 'text-[#F8F9FB] text-sm font-semibold'),
    (r'text-white rounded-br-none', 'text-[#F8F9FB] rounded-br-none'),
    (r'border border-\[#141F33\] text-white', 'border border-[#141F33] text-[#F8F9FB]'),
    (r'bg-\[#2A5CFF\] text-white', 'bg-[#2A5CFF] text-[#F8F9FB]'),
    (r'bg-royal text-\[#F8F9FB\]', 'bg-[#2A5CFF] text-[#F8F9FB]'),
    (r'bg-royal text-white', 'bg-[#2A5CFF] text-[#F8F9FB]'),
    (r'text-emerald-900\b', 'text-[#141F33]'),
    (r'bg-emerald-600\b', 'bg-[#2A5CFF]'),
    (r'bg-emerald-500\b', 'bg-[#2A5CFF]'),
    (r'border-amber-600\b', 'border-[#2A5CFF]'),
    (r'bg-gray-50\b', 'bg-[#F8F9FB]'),
    (r'text-blue-100\b', 'text-[#F8F9FB]'),
    (r'text-slate-900\b', 'text-[#141F33]'),
    (r'text-slate-200\b', 'text-[#141F33]/20'),
    (r'hover:bg-gray-50\b', 'hover:bg-[#141F33]/5'),
    (r'hover:bg-emerald-50\b', 'hover:bg-[#F8F9FB]'),
    (r'hover:bg-emerald-100\b', 'hover:bg-[#F8F9FB]'),
    (r'via-white/10\b', 'via-[#F8F9FB]/10'),
    (r'from-transparent via-white', 'from-transparent via-[#F8F9FB]'),
    (r'bg-primary text-white\b', 'bg-[#141F33] text-[#F8F9FB]'),
    (r'text-amber-400', 'text-[#2A5CFF]'),
    (r' via-white/', ' via-[#F8F9FB]/'),
    (r'text-white', 'text-[#F8F9FB]'),
    (r'bg-white\b', 'bg-[#F8F9FB]'),
]

files_changed = 0
total_repl = 0
for fpath in files:
    if any(x in fpath.lower() for x in ['.storybook', '.next', 'node_modules', 'dist', 'build', '.git']):
        continue
    try:
        original = open(fpath, 'r', encoding='utf-8').read()
        modified = original
        for pat, repl in PATTERNS:
            new = re.sub(pat, repl, modified)
            if new != modified:
                modified = new
        if modified != original:
            open(fpath, 'w', encoding='utf-8').write(modified)
            files_changed += 1
    except Exception as e:
        pass

print(f'Pass3: {files_changed} files changed')
