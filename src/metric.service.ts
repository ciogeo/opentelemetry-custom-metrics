import { Injectable } from "@nestjs/common";
import otel, { Meter, MetricAttributes } from "@opentelemetry/api";
import { MetricInterface } from "./metrics/metric.interface";
import { addCounter, addHistogram, addObservableGauge, observe } from "./metric.functions";

@Injectable()
export class MetricService {
  protected meter: Meter;
  protected intrumentation = new Map();

  constructor() {
    this.meter = otel.metrics.getMeter("opentelemetry-custom-metrics");
  }

  public addCounter(name: string, options?: MetricAttributes): MetricInterface {
    return addCounter(name, options);
  }

  public addHistogram(name: string, options?: MetricAttributes): MetricInterface {
    return addHistogram(name, options);
  }

  public addObservableGauge(name: string, options?: MetricAttributes): MetricInterface {
    return addObservableGauge(name, options);
  }

  public observe(name: string, value: number): void {
    return observe(name, value);
  }
}
