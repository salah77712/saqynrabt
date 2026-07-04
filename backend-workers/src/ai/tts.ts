export async function generateTextToSpeech(
  apiKey: string,
  text: string,
  voice: string = 'alloy'
): Promise<ArrayBuffer> {
  const url = 'https://api.openai.com/1/audio/speech';

  const payload = {
    model: 'tts-1',
    input: text,
    voice,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return response.arrayBuffer();
}
