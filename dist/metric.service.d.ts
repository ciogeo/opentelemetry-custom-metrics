import { Meter, MetricAttributes } from "@opentelemetry/api";
import { MetricInterface } from "./metrics/metric.interface";
export declare class MetricService {
    protected meter: Meter;
    protected intrumentation: Map<any, any>;
    constructor();
    addCounter(name: string, options?: MetricAttributes): MetricInterface;
    addHistogram(name: string, options?: MetricAttributes): MetricInterface;
    addObservableGauge(name: string, options?: MetricAttributes): MetricInterface;
    observe(name: string, value: number): void;
}
