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
import { AccessMetric, TimeToProcessMetric } from 'opentelemetry-custom-metrics';
```

```
@AccessMetric
@TimeToProcessMetric
```

### Available decorators:
AccessMetric - counts the number of times a method is called
TimeToProcessMetric - exposes a gauge and a histogram with the time it took to process the method

### Build your own custom metrics

```
import { MetricService, MetricType } from 'opentelemetry-custom-metrics';

constructor(private metricService: MetricService) {
    this.metricService.addCounter('my_counter');
    this.metricService.addHistogram('my_histogram');
    this.metricService.addObservableGauge('my_gauge');
}

handle() {
    ...
    this.metricService.observe('my_counter', 1);
    this.metricService.observe('my_histogram', 10);
    this.metricService.observe('my_gauge', 10);
}
```