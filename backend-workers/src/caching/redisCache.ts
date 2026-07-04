export class RedisCache {
  private redisUrl: string;

  constructor(redisUrl: string) {
    this.redisUrl = redisUrl;
  }

  private async fetchRedis(command: string, args: string[]): Promise<any> {
    const response = await fetch(this.redisUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([command, ...args]),
    });
    const data = await response.json();
    return data.result;
  }

  async get(key: string): Promise<string | null> {
    return this.fetchRedis('GET', [key]);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    const args = [key, value];
    if (ttlSeconds) {
      args.push('EX', String(ttlSeconds));
    }
    await this.fetchRedis('SET', args);
  }

  async del(key: string): Promise<void> {
    await this.fetchRedis('DEL', [key]);
  }
}
