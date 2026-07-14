/**
 * Model A/B split testing selector
 */
export interface ABTestConfig {
  model_a: string;
  model_b: string;
  split_pct_a: number; // e.g. 50 (for 50% split)
}

/**
 * Selects model ID based on the company's active A/B testing split
 */
export function selectModelForABTest(
  config: ABTestConfig | null | undefined,
  defaultModel = 'gpt-4o-mini'
): string {
  if (!config || !config.model_a || !config.model_b) {
    return defaultModel;
  }

  // Generate random value from 0 to 99
  const roll = Math.floor(Math.random() * 100);

  if (roll < config.split_pct_a) {
    return config.model_a;
  }

  return config.model_b;
}
