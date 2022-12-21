import { Meter, MetricAttributes, Observable } from "@opentelemetry/api";
import { MetricInterface } from "./metric.interface";

export class ObservableGaugeMetriService implements MetricInterface {
  protected gauge: Observable;

  constructor(meter: Meter, name: string, options?: MetricAttributes) {
    this.gauge = meter.createObservableGauge(name, options);
  }

  public observe(value: number): void {
    this.gauge.addCallback((observableResult) => {
      observableResult.observe(value);
    });
  }
}
