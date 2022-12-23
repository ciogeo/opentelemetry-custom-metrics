import { Meter, MetricOptions, ObservableCounter } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';

export class ObservableCounterMetric implements MetricInterface {
    protected counter: ObservableCounter;

    constructor(meter: Meter, name: string, options?: MetricOptions) {
        this.counter = meter.createObservableCounter(name, options);
    }

    public observe(value: number): void {
        this.counter.addCallback((observableResult) => {
            observableResult.observe(value);
        });
    }
}
