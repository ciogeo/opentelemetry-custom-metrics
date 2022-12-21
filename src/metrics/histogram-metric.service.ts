import { Histogram, Meter, MetricAttributes } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";

export class HistogramMetricService implements MetricInterface {
  protected histogram: Histogram;

  constructor(meter: Meter, name: string, options?: MetricAttributes) {
    this.histogram = meter.createHistogram(name, options);
  }

  public observe(value: number): void {
    this.histogram.record(value);
  }
}
