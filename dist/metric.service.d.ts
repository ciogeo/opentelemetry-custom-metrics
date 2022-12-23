import { MetricOptions } from '@opentelemetry/api';
import { MetricInterface } from './metrics/metric.interface';
export declare class MetricService {
    addCounter(name: string, options?: MetricOptions): MetricInterface;
    addHistogram(name: string, options?: MetricOptions): MetricInterface;
    addObservableCounter(name: string, options?: MetricOptions): MetricInterface;
    addObservableGauge(name: string, options?: MetricOptions): MetricInterface;
    addUpDownCounter(name: string, options?: MetricOptions): MetricInterface;
    addObservableUpDownCounter(name: string, options?: MetricOptions): MetricInterface;
    observe(name: string, value: number): void;
}
