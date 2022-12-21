import { Counter, Meter, MetricAttributes } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";

export class CounterMetricService implements MetricInterface {
  protected counter: Counter;

  constructor(meter: Meter, name: string, options?: MetricAttributes) {
    this.counter = meter.createCounter(name, options);
  }

  public observe(value: number): void {
    this.counter.add(value);
  }
}
