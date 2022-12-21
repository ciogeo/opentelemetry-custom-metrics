# Opentelemetry Custom Metrics for NestJS

## Usage

Add interceptors to your Controller methods

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