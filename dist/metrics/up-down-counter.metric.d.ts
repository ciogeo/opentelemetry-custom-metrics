import { Meter, MetricOptions, UpDownCounter } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';
export declare class UpDownCounterMetric implements MetricInterface {
    protected counter: UpDownCounter;
    constructor(meter: Meter, name: string, options?: MetricOptions);
    observe(value: number): void;
}
