export async function analyzeImage(
  apiKey: string,
  imageBuffer: ArrayBuffer,
  prompt: string
): Promise<string> {
  const url = 'https://api.openai.com/v1/chat/completions';
  
  // Base64 encode array buffer for JSON payload integration
  const base64Image = btoa(
    new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  const payload = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
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
  return resData.choices?.[0]?.message?.content || 'Vision response parsing failed.';
}
