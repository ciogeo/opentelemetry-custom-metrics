# Opentelemetry Custom Metrics for NestJS

## Install

```
npm i opentelemetry-custom-metrics --save
``` 

Other required dependencies:
```
@opentelemetry/api
@opentelemetry/sdk-node
@opentelemetry/exporter-prometheus
```

## Usage

### Create otelSDK.ts file

```
import * as process from 'process';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';

const otelSDK = new NodeSDK({
    metricReader: new PrometheusExporter({
        port: 9090,
    }),
    contextManager: new AsyncLocalStorageContextManager(),
});

export default otelSDK;

process.on('SIGTERM', () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log('SDK shut down successfully'),
            (err) => console.log('Error shutting down SDK', err),
        )
        .finally(() => process.exit(0));
});
```

### Add otelSDK to your main.ts

```
import otelSDK from './otelSDK';

async function bootstrap() {
    await otelSDK.start();
    ...
```

### Import OpenTelemetryCustomMetricsModule in your app.module.ts

```
import { OpenTelemetryCustomMetricsModule } from 'opentelemetry-custom-metrics';

@Module({
    imports: [
        OpenTelemetryCustomMetricsModule.forRootAsync(),
...
```

### Add decorators to your methods

app.controller.ts
```
import { AccessMetric, TimeToProcessMetric } from 'opentelemetry-custom-metrics';
```

```
@AccessMetric
@TimeToProcessMetric
public async handle(): Promise<void> {
```

### Available decorators:

AccessMetric - counts the number of times a method is called  
TimeToProcessMetric - exposes a gauge and a histogram with the time it took to process the method (time spent on async calls is not included)  

### Add your own custom metrics

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

Go to http://localhost:9090/metrics to see the metrics