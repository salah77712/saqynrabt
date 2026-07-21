export class Pinecone {
  apiKey: string;
  constructor(_opts: any) { this.apiKey = _opts?.apiKey || ''; }
  index(_name: string, _host?: string) {
    return {
      namespace: (_ns: string) => ({
        upsert: async (_records: any[]) => {
          console.warn(`[stub] Pinecone upsert namespace=${_ns} records=${_records?.length ?? 0}`);
        },
      }),
      query: async (params: any) => {
        console.warn(`[stub] Pinecone query namespace=${params?.namespace}`);
        return { matches: [] };
      },
    };
  }
}
