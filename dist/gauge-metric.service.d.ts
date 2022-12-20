import { Meter, Observable } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";
export declare class GaugeMetriService implements MetricInterface {
    protected gauge: Observable;
    constructor(meter: Meter, name: string);
    observe(value: number): void;
}
