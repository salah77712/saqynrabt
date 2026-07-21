import type { RequestWithContext } from '../utils';
import { corsHeaders } from '../utils';

export async function handleVoiceStream(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  const jwt = request.jwt;
  if (!jwt) {
    headers['Content-Type'] = 'application/json';
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  try {
    const companyId = jwt.company_id || '';
    const text = request.headers.get('X-Text') || 'Hello, this is SAQYN AI assistant.';

    if (!companyId) {
      headers['Content-Type'] = 'application/json';
      return new Response(JSON.stringify({ error: 'company_id is required' }), { status: 400, headers });
    }

    const vapiKey = request.env.VAPI_API_KEY;
    if (vapiKey) {
      const ttsRes = await fetch('https://api.vapi.ai/tts', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${vapiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'default' }),
      });
      if (ttsRes.ok) {
        const audioBuffer = await ttsRes.arrayBuffer();
        return new Response(audioBuffer, { headers: { ...headers, 'Content-Type': 'audio/wav', 'Content-Length': String(audioBuffer.byteLength) } });
      }
    }

    return new Response('TTS not configured', { status: 503, headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } });
  }
}
