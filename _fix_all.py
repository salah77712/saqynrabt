import re

# Fix analytics page - Cards 2, 3, 4 need p-6 rounded-2xl
with open(r'frontend\app\dashboard\analytics\page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '      <Card>\n        <p className="text-[10px] uppercase font-bold text-[#141F33]">{t({en: \'Annual Run Rate\', ar: \'معدل التشغيل السنوي\'})}</p>',
    '      <Card className="p-6 rounded-2xl">\n        <p className="text-[10px] uppercase font-bold text-[#141F33]">{t({en: \'Annual Run Rate\', ar: \'معدل التشغيل السنوي\'})}</p>'
)
content = content.replace(
    '      <Card>\n        <p className="text-[10px] uppercase font-bold text-[#141F33]">{t({en: \'Active Companies\', ar: \'الشركات النشطة\'})}</p>',
    '      <Card className="p-6 rounded-2xl">\n        <p className="text-[10px] uppercase font-bold text-[#141F33]">{t({en: \'Active Companies\', ar: \'الشركات النشطة\'})}</p>'
)
content = content.replace(
    '      <Card>\n        <p className="text-[10px] uppercase font-bold text-[#141F33]">{t({en: \'Monthly Questions Usage\', ar: \'استخدام الأسئلة الشهري\'})}</p>',
    '      <Card className="p-6 rounded-2xl">\n        <p className="text-[10px] uppercase font-bold text-[#141F33]">{t({en: \'Monthly Questions Usage\', ar: \'استخدام الأسئلة الشهري\'})}</p>'
)

with open(r'frontend\app\dashboard\analytics\page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('analytics done')
