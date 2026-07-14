/**
 * Harmful and offensive content scanner
 */
export function detectToxicity(text: string): boolean {
  const lowercase = text.toLowerCase();

  const offensiveKeywords = [
    'hate speech',
    'harass',
    'violence',
    'offensive',
    'exploit'
  ];

  return offensiveKeywords.some(w => lowercase.includes(w));
}
