import { Attributes, Context, Histogram, Meter, MetricOptions } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';

export class HistogramMetric implements MetricInterface {
    protected histogram: Histogram;

    constructor(meter: Meter, name: string, options?: MetricOptions) {
        this.histogram = meter.createHistogram(name, options);
    }

    public observe(value: number, attributes?: Attributes, context?: Context): void {
        this.histogram.record(value, attributes, context);
    }
}
