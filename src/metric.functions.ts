import otel, { MetricOptions } from '@opentelemetry/api';
import { OPENTELEMETRY_CUSTOM_METRICS } from './constants';
import { MetricType } from './metric.type';
import { CounterMetric } from './metrics/counter.metric';
import { HistogramMetric } from './metrics/histogram.metric';
import { MetricInterface } from './metrics/metric.interface';
import { ObservableCounterMetric } from './metrics/observable-counter.metric';
import { ObservableGaugeMetric } from './metrics/observable-gauge.metric';
import { ObservableUpDownCounterMetric } from './metrics/observable-up-down-counter.metric';
import { UpDownCounterMetric } from './metrics/up-down-counter.metric';

const intrumentation = new Map();

export function addCounter(name: string, options?: MetricOptions): MetricInterface {
    return addInstrumentation(MetricType.COUNTER, name, options);
}

export function addHistogram(name: string, options?: MetricOptions): MetricInterface {
    return addInstrumentation(MetricType.HISTOGRAM, name, options);
}

export function addObservableCounter(name: string, options?: MetricOptions): MetricInterface {
    return addInstrumentation(MetricType.OBSERVABLE_COUNTER, name, options);
}

export function addObservableGauge(name: string, options?: MetricOptions): MetricInterface {
    return addInstrumentation(MetricType.OBSERVABLE_GAUGE, name, options);
}

export function addUpDownCounter(name: string, options?: MetricOptions): MetricInterface {
    return addInstrumentation(MetricType.UP_DOWN_COUNTER, name, options);
}

export function addObservableUpDownCounter(name: string, options?: MetricOptions): MetricInterface {
    return addInstrumentation(MetricType.OBSERVABLE_UP_DOWN_COUNTER, name, options);
}

export function observe(name: string, value: number): void {
    if (!this.intrumentation.has(name)) {
        throw new Error(`Instrumentation ${name} not found`);
    }

    intrumentation.get(name).observe(value);
}

function addInstrumentation(type: string, name: string, options?: MetricOptions): MetricInterface {
    if (intrumentation.has(name)) {
        return intrumentation.get(name);
    }

    const meter = otel.metrics.getMeterProvider().getMeter(OPENTELEMETRY_CUSTOM_METRICS);

    switch (type) {
        case MetricType.COUNTER:
            intrumentation.set(name, new CounterMetric(meter, name, options));
            break;
        case MetricType.HISTOGRAM:
            intrumentation.set(name, new HistogramMetric(meter, name, options));
            break;
        case MetricType.OBSERVABLE_COUNTER:
            intrumentation.set(name, new ObservableCounterMetric(meter, name, options));
            break;
        case MetricType.OBSERVABLE_GAUGE:
            intrumentation.set(name, new ObservableGaugeMetric(meter, name, options));
            break;
        case MetricType.UP_DOWN_COUNTER:
            intrumentation.set(name, new UpDownCounterMetric(meter, name, options));
            break;
        case MetricType.OBSERVABLE_UP_DOWN_COUNTER:
            intrumentation.set(name, new ObservableUpDownCounterMetric(meter, name, options));
            break;
        default:
            throw new Error(`Metric type ${type} not supported`);
    }

    return intrumentation.get(name);
}
