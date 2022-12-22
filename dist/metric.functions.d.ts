import { MetricAttributes } from "@opentelemetry/api";
import { MetricInterface } from "./metrics/metric.interface";
export declare const intrumentation: Map<any, any>;
export declare function addCounter(name: string, options?: MetricAttributes): MetricInterface;
export declare function addHistogram(name: string, options?: MetricAttributes): MetricInterface;
export declare function addObservableGauge(name: string, options?: MetricAttributes): MetricInterface;
export declare function observe(name: string, value: number): void;
