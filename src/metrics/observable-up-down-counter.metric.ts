import { Attributes, Meter, MetricOptions, ObservableUpDownCounter } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';

export class ObservableUpDownCounterMetric implements MetricInterface {
    protected counter: ObservableUpDownCounter;

    constructor(meter: Meter, name: string, options?: MetricOptions) {
        this.counter = meter.createObservableUpDownCounter(name, options);
    }

    public observe(value: number, attributes?: Attributes): void {
        this.counter.addCallback((observableResult) => {
            observableResult.observe(value, attributes);
        });
    }
}
