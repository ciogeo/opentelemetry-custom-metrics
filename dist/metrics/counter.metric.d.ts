import { Counter, Meter, MetricOptions } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';
export declare class CounterMetric implements MetricInterface {
    protected counter: Counter;
    constructor(meter: Meter, name: string, options?: MetricOptions);
    observe(value: number): void;
}
