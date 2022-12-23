import { Meter, MetricOptions, ObservableCounter } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';
export declare class ObservableCounterMetric implements MetricInterface {
    protected counter: ObservableCounter;
    constructor(meter: Meter, name: string, options?: MetricOptions);
    observe(value: number): void;
}
