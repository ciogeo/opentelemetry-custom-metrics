import { Meter, MetricAttributes, Observable } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";
export declare class ObservableGaugeMetriService implements MetricInterface {
    protected gauge: Observable;
    constructor(meter: Meter, name: string, options?: MetricAttributes);
    observe(value: number): void;
}
