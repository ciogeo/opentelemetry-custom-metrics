import { Counter, Meter, MetricOptions } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';

export class CounterMetric implements MetricInterface {
    protected counter: Counter;

    constructor(meter: Meter, name: string, options?: MetricOptions) {
        this.counter = meter.createCounter(name, options);
    }

    public observe(value: number): void {
        this.counter.add(value);
    }
}
