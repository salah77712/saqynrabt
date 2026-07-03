'use client';

export default function VoicePage() {
  // Rule 32 Voice AI financial lock dead-switch
  // Renders strictly null unless the env variable is set to "true"
  const isVoiceActivated = process.env.NEXT_PUBLIC_VOICE_AI_ACTIVATED === 'true';

  if (!isVoiceActivated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-dark-700 pb-6">
        <h1 className="text-2xl font-bold text-white">Voice Dispatch Hub</h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitor active voice calls and stream caller transcripts live to the dispatch console.
        </p>
      </div>

      <div className="bg-dark-800 border border-dark-700 p-8 rounded-xl text-center space-y-4">
        <span className="text-4xl block mb-2">📞</span>
        <h3 className="text-sm font-semibold text-slate-200">Voice Stream Connection Established</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Streaming active caller transcription frames via WebSockets (Rule 33).
        </p>
      </div>
    </div>
  );
}
