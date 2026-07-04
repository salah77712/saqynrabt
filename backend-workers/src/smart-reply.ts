export async function generateSmartReply(
  openaiApiKey: string,
  messageContext: string,
  sopContext: string
): Promise<string> {
  const url = 'https://api.openai.com/1/chat/completions';

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are an expert hospitality & operations front-desk coordinator. Generate a short, polite one-sentence smart reply to the customer's message based strictly on the provided company SOP text. If the SOP does not cover it, output a polite check-in hold request.`,
      },
      {
        role: 'user',
        content: `SOP Context: ${sopContext}\nCustomer Message: ${messageContext}`,
      },
    ],
    max_tokens: 60,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) return 'Understood. Let me look that up for you.';

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Understood. Let me check.';
  } catch {
    return 'Understood. Let me look that up for you.';
  }
}
