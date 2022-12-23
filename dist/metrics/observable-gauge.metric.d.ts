import { Meter, MetricOptions, ObservableGauge } from '@opentelemetry/api';
import { MetricInterface } from './metric.interface';
export declare class ObservableGaugeMetric implements MetricInterface {
    protected gauge: ObservableGauge;
    constructor(meter: Meter, name: string, options?: MetricOptions);
    observe(value: number): void;
}
