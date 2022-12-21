import { Counter, Meter, MetricAttributes } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";
export declare class CounterMetricService implements MetricInterface {
    protected counter: Counter;
    constructor(meter: Meter, name: string, options?: MetricAttributes);
    observe(value: number): void;
}
