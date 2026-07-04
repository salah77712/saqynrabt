export async function generateAiImage(
  apiKey: string,
  prompt: string
): Promise<string> {
  const url = 'https://api.openai.com/1/images/generations';
  
  const payload = {
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const resData = await response.json();
  return resData.data?.[0]?.url || '';
}
