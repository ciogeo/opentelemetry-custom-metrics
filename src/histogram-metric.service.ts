import { Histogram, Meter } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";

export class HistogramMetricService implements MetricInterface {
  protected histogram: Histogram;

  constructor(meter: Meter, name: string) {
    this.histogram = meter.createHistogram(name);
  }

  public observe(value: number): void {
    this.histogram.record(value);
  }
}
