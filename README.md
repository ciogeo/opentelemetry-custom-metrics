# Opentelemetry Custom Metrics for NestJS

## Usage

### Add interceptors to your Controller methods

app.module.ts
```
import { OpenTelemetryCustomMetricsModule } from 'opentelemetry-custom-metrics';

@Module({
    imports: [
        OpenTelemetryCustomMetricsModule.forRootAsync(),
...
```

app.controller.ts
```
import { AccessMetricInterceptor, TimeToProcessMetricInterceptor } from 'opentelemetry-custom-metrics';
```

```
@UseInterceptors(AccessMetricInterceptor)
@UseInterceptors(TimeToProcessMetricInterceptor)
```

### Available interceptors:
AccessMetricInterceptor - counts the number of times a method is called
TimeToProcessMetricInterceptor - exposes a gauge and a histogram with the time it took to process the method

### Build your own custom metrics

```
import { MetricService, MetricType } from 'opentelemetry-custom-metrics';

constructor(private metricService: MetricService) {
    this.metricService.addInstrumentation(MetricType.COUNTER, 'my_counter');
    this.metricService.addInstrumentation(MetricType.HISTOGRAM, 'my_histogram');
    this.metricService.addInstrumentation(MetricType.GAUGE, 'my_gauge');
}

handle() {
    ...
    this.metricService.observe('my_counter', 1);
    this.metricService.observe('my_histogram', 10);
    this.metricService.observe('my_gauge', 10);
}
```