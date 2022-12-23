import { MetricOptions } from '@opentelemetry/api';
import { MetricInterface } from './metrics/metric.interface';
export declare function addCounter(name: string, options?: MetricOptions): MetricInterface;
export declare function addHistogram(name: string, options?: MetricOptions): MetricInterface;
export declare function addObservableCounter(name: string, options?: MetricOptions): MetricInterface;
export declare function addObservableGauge(name: string, options?: MetricOptions): MetricInterface;
export declare function addUpDownCounter(name: string, options?: MetricOptions): MetricInterface;
export declare function addObservableUpDownCounter(name: string, options?: MetricOptions): MetricInterface;
export declare function observe(name: string, value: number): void;
