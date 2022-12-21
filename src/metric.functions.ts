import otel, { Meter, MetricAttributes } from "@opentelemetry/api";
import { MetricType } from "./metric.type";
import { CounterMetricService } from "./metrics/counter-metric.service";
import { HistogramMetricService } from "./metrics/histogram-metric.service";
import { MetricInterface } from "./metrics/metric.interface";
import { ObservableGaugeMetriService } from "./metrics/observable-gauge-metric.service";

export const meter = otel.metrics.getMeter("opentelemetry-custom-metrics");
export const intrumentation = new Map();

export function addCounter(name: string, options?: MetricAttributes): MetricInterface {
  return addInstrumentation(MetricType.COUNTER, name, options);
}

export function addHistogram(name: string, options?: MetricAttributes): MetricInterface {
  return addInstrumentation(MetricType.HISTOGRAM, name, options);
}

export function addObservableGauge(name: string, options?: MetricAttributes): MetricInterface {
  return addInstrumentation(MetricType.OBSERVABLE_GAUGE, name, options);
}

export function observe(name: string, value: number): void {
  if (!this.intrumentation.has(name)) {
    throw new Error(`Instrumentation ${name} not found`);
  }

  intrumentation.get(name).observe(value);
}

function addInstrumentation(type: string, name: string, options?: MetricAttributes): MetricInterface {
  if (intrumentation.has(name)) {
    return intrumentation.get(name);
  }

  if (type === MetricType.COUNTER) {
    intrumentation.set(name, new CounterMetricService(meter, name, options));
  } else if (type === MetricType.HISTOGRAM) {
    intrumentation.set(name, new HistogramMetricService(meter, name, options));
  } else if (type === MetricType.OBSERVABLE_GAUGE) {
    intrumentation.set(name, new ObservableGaugeMetriService(meter, name, options));
  }

  if (!intrumentation.has(name)) {
    throw new Error(`Instrumentation ${name} not found`);
  }

  return intrumentation.get(name);
}
