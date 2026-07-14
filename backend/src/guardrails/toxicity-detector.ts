/**
 * Harmful and offensive content scanner using OpenAI Moderation API
 */
export async function detectToxicity(text: string, apiKey: string): Promise<boolean> {
  const lowercase = text.toLowerCase();
  const offensiveKeywords = ['hate speech', 'harass', 'violence', 'offensive', 'exploit'];
  if (offensiveKeywords.some(w => lowercase.includes(w))) return true;

  try {
    const res = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: text }),
    });
    if (!res.ok) return false;
    const data: any = await res.json();
    return data.results?.[0]?.flagged === true;
  } catch {
    return false;
  }
}
