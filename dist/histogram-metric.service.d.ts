import { Histogram, Meter } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";
export declare class HistogramMetricService implements MetricInterface {
    protected histogram: Histogram;
    constructor(meter: Meter, name: string);
    observe(value: number): void;
}
