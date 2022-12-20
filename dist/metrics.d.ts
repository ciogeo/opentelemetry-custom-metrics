import { Meter } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";
export declare class Metrics {
    protected meter: Meter;
    protected intrumentation: Map<any, any>;
    constructor();
    addInstrumentation(type: string, name: string): MetricInterface;
    observe(name: string, value: number): void;
}
