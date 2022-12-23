import { Meter, MetricOptions, ObservableUpDownCounter } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';
export declare class ObservableUpDownCounterMetric implements MetricInterface {
    protected counter: ObservableUpDownCounter;
    constructor(meter: Meter, name: string, options?: MetricOptions);
    observe(value: number): void;
}
