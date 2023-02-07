import { Attributes, Context, Meter, MetricOptions, UpDownCounter } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';

export class UpDownCounterMetric implements MetricInterface {
    protected counter: UpDownCounter;

    constructor(meter: Meter, name: string, options?: MetricOptions) {
        this.counter = meter.createUpDownCounter(name, options);
    }

    public observe(value: number, attributes?: Attributes, context?: Context): void {
        this.counter.add(value, attributes, context);
    }
}
