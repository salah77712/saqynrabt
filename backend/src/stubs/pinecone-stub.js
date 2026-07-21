export class Pinecone {
    apiKey;
    constructor(_opts) { this.apiKey = _opts?.apiKey || ''; }
    index(_name, _host) {
        return {
            namespace: (_ns) => ({
                upsert: async (_records) => {
                    console.warn(`[stub] Pinecone upsert namespace=${_ns} records=${_records?.length ?? 0}`);
                },
            }),
            query: async (params) => {
                console.warn(`[stub] Pinecone query namespace=${params?.namespace}`);
                return { matches: [] };
            },
        };
    }
}
