import re

with open(r'frontend\app\dashboard\documents\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Cancel button
content = content.replace(
    'className="min-h-[44px] rounded-xl text-xs font-bold px-4 border-[#141F33]/10"',
    'className="min-h-[44px] rounded-xl text-xs font-bold px-6 border-[#141F33]/10 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"'
)

# Fix Delete button
content = content.replace(
    'className="min-h-[44px] rounded-xl text-xs font-semibold px-4 bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB]"',
    'className="min-h-[44px] rounded-xl text-xs font-bold px-6 bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"'
)

# Fix Browse Files button
content = content.replace(
    'className="transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 mt-3 md:mt-5 bg-[#141F33] hover:opacity-95 text-[#F8F9FB] font-bold px-6 py-3 rounded-xl text-xs min-h-[44px] inline-flex items-center justify-center"',
    'className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 bg-[#141F33] hover:opacity-95 text-[#F8F9FB] inline-flex items-center justify-center"'
)

with open(r'frontend\app\dashboard\documents\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('documents done')
