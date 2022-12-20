import { Injectable } from '@nestjs/common';
import otel, { Meter } from "@opentelemetry/api";
import { CounterMetricService } from "./counter-metric.service";
import { GaugeMetriService } from "./gauge-metric.service";
import { HistogramMetricService } from "./histogram-metric.service";
import { MetricInterface } from "./metric.interface";
import { MetricType } from "./metric.type";

@Injectable()
export class Metrics {
  protected meter: Meter;
  protected intrumentation = new Map();

  constructor() {
    this.meter = otel.metrics.getMeter("opentelemetry-custom-metrics");
  }

  public addInstrumentation(type: string, name: string): MetricInterface {
    if (type === MetricType.COUNTER) {
      this.intrumentation.set(name, new CounterMetricService(this.meter, name));
    } else if (type === MetricType.HISTOGRAM) {
      this.intrumentation.set(
        name,
        new HistogramMetricService(this.meter, name)
      );
    } else if (type === MetricType.GAUGE) {
      this.intrumentation.set(name, new GaugeMetriService(this.meter, name));
    }

    if (!this.intrumentation.has(name)) {
      throw new Error(`Instrumentation ${name} not found`);
    }

    return this.intrumentation.get(name);
  }

  public observe(name: string, value: number): void {
    if (!this.intrumentation.has(name)) {
      throw new Error(`Instrumentation ${name} not found`);
    }

    this.intrumentation.get(name).observe(value);
  }
}
