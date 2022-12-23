import { Histogram, Meter, MetricOptions } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';
export declare class HistogramMetric implements MetricInterface {
    protected histogram: Histogram;
    constructor(meter: Meter, name: string, options?: MetricOptions);
    observe(value: number): void;
}
