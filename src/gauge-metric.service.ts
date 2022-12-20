import { Meter, Observable } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";

export class GaugeMetriService implements MetricInterface {
  protected gauge: Observable;

  constructor(meter: Meter, name: string) {
    this.gauge = meter.createObservableGauge(name);
  }

  public observe(value: number): void {
    this.gauge.addCallback((observableResult) => {
      observableResult.observe(value);
    });
  }
}
