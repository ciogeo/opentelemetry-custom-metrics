import { Meter, MetricOptions, ObservableGauge } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';

export class ObservableGaugeMetric implements MetricInterface {
    protected gauge: ObservableGauge;

    constructor(meter: Meter, name: string, options?: MetricOptions) {
        this.gauge = meter.createObservableGauge(name, options);
    }

    public observe(value: number): void {
        this.gauge.addCallback((observableResult) => {
            observableResult.observe(value);
        });
    }
}
