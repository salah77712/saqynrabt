/**
 * Marketplace Plugin Registry configurations
 */
export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  developer: string;
  endpoint_url: string;
}

export const MARKETPLACE_PLUGINS: Record<string, PluginMetadata> = {
  slack_alert: {
    id: 'slack_alert',
    name: 'Slack Alerts Integration',
    version: '1.2.0',
    developer: 'SAQYN Core',
    endpoint_url: 'https://saqyn-slack-worker.workers.dev'
  },
  bamboohr_sync: {
    id: 'bamboohr_sync',
    name: 'BambooHR Employee Sync',
    version: '2.1.0',
    developer: 'SAQYN Core',
    endpoint_url: 'https://saqyn-bamboohr-worker.workers.dev'
  }
};
