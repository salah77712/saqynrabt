/**
 * Distributed tracing configuration and APM instrumentation helper
 */
export interface APMSpan {
  name: string;
  start_time: number;
  attributes: Record<string, string>;
}

export class APMTraceManager {
  private spans: APMSpan[] = [];
  private traceId: string;

  constructor(traceId?: string) {
    this.traceId = traceId || `tr-${Math.random().toString(36).substring(2, 15)}`;
  }

  public getTraceId(): string {
    return this.traceId;
  }

  public startSpan(name: string, attributes?: Record<string, string>): string {
    const spanId = `sp-${Math.random().toString(36).substring(2, 8)}`;
    this.spans.push({
      name,
      start_time: Date.now(),
      attributes: { span_id: spanId, ...(attributes || {}) }
    });
    return spanId;
  }

  public endSpan(spanId: string): void {
    const span = this.spans.find(s => s.attributes.span_id === spanId);
    if (span) {
      const duration = Date.now() - span.start_time;
      console.log(`[APM TRACE] TraceID: ${this.traceId} | Span: ${span.name} completed in ${duration}ms`, span.attributes);
    }
  }
}
