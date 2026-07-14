import { redactPII } from './pii-redactor';
import { detectJailbreak } from './jailbreak-detector';
import { detectToxicity } from './toxicity-detector';

export interface GuardrailsConfig {
  pii_redaction_enabled: boolean;
  jailbreak_detection_enabled: boolean;
  toxicity_filter_enabled: boolean;
}

/**
 * Runs security guardrails checks on input message query
 */
export async function runInputGuardrails(
  query: string,
  config: GuardrailsConfig
): Promise<{ passed: boolean; cleanQuery: string; reason?: string }> {
  let cleanQuery = query;

  // 1. Jailbreak attempt detection
  if (config.jailbreak_detection_enabled) {
    const isJailbreak = detectJailbreak(query);
    if (isJailbreak) {
      return { passed: false, cleanQuery, reason: 'PROMPT_INJECTION_DETECTED' };
    }
  }

  // 2. PII Redaction
  if (config.pii_redaction_enabled) {
    cleanQuery = redactPII(cleanQuery);
  }

  // 3. Toxicity filter
  if (config.toxicity_filter_enabled) {
    const isToxic = detectToxicity(cleanQuery);
    if (isToxic) {
      return { passed: false, cleanQuery, reason: 'TOXIC_CONTENT_BLOCKED' };
    }
  }

  return { passed: true, cleanQuery };
}
