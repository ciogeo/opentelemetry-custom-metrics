import { Counter, Meter } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";

export class CounterMetricService implements MetricInterface {
  protected counter: Counter;

  constructor(meter: Meter, name: string) {
    this.counter = meter.createCounter(name);
  }

  public observe(value: number): void {
    this.counter.add(value);
  }
}
