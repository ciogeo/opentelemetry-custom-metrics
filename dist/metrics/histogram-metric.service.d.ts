import { Histogram, Meter, MetricAttributes } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";
export declare class HistogramMetricService implements MetricInterface {
    protected histogram: Histogram;
    constructor(meter: Meter, name: string, options?: MetricAttributes);
    observe(value: number): void;
}
