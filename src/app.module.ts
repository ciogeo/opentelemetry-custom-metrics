import { DynamicModule } from "@nestjs/common";
import { MetricService } from "./metric.service";

export class OpenTelemetryCustomMetricsModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      global: true,
      module: OpenTelemetryCustomMetricsModule,
      imports: [],
      providers: [MetricService],
      exports: [MetricService],
    };
  }

  static async forRootAsync(): Promise<DynamicModule> {
    return {
      global: true,
      module: OpenTelemetryCustomMetricsModule,
      imports: [],
      providers: [MetricService],
      exports: [MetricService],
    };
  }
}
