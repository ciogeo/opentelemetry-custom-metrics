import { Counter, Meter } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";
export declare class CounterMetricService implements MetricInterface {
    protected counter: Counter;
    constructor(meter: Meter, name: string);
    observe(value: number): void;
}
