# OpenTelemetry Custom Metrics for NestJS

## Description

[OpenTelemetry](https://opentelemetry.io/) module for [Nest](https://github.com/nestjs/nest).

## Install

```bash
npm i opentelemetry-custom-metrics @opentelemetry/sdk-node --save
``` 

Other required dependencies for Prometheus config:
```bash
@opentelemetry/exporter-prometheus
```

## Usage

### Create otelSDK.ts file

```ts
import * as process from 'process';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';

const otelSDK = new NodeSDK({
    metricReader: new PrometheusExporter({
        port: 8081,
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

```ts
import otelSDK from './otelSDK';

async function bootstrap() {
    await otelSDK.start();
    ...
```

### Import OpenTelemetryCustomMetricsModule in your app.module.ts

```ts
import { OpenTelemetryCustomMetricsModule } from 'opentelemetry-custom-metrics';

@Module({
    imports: [
        OpenTelemetryCustomMetricsModule.forRootAsync(),
...
```

### Add decorators to your methods

app.controller.ts
```ts
import { AccessMetric, TimeToProcessMetric } from 'opentelemetry-custom-metrics';
```

```ts
@AccessMetric()
@TimeToProcessMetric()
public async handle(): Promise<void> {
```

### Available decorators:

@AccessMetric() - counts the number of times a method is called  
@TimeToProcessMetric() - exposes a gauge and a histogram with the time it took to process the method (time spent on async calls is not included)  

### Add your own custom metrics

```ts
import { MetricService, MetricType } from 'opentelemetry-custom-metrics';

constructor(private metricService: MetricService) {
    this.metricService.addCounter('my_counter');
    this.metricService.addHistogram('my_histogram');
    this.metricService.addObservableCounter('my_observable_counter');
    this.metricService.addObservableGauge('my_observable_gauge');
    this.metricService.addUpDownCounter('my_up_down_counter');
    this.metricService.addObservableUpDownCounter('my_observable_up_down_counter');
}

handle() {
    ...
    this.metricService.observe('my_counter', 1);
    this.metricService.observe('my_histogram', 10);
    this.metricService.observe('my_observable_counter', 1);
    this.metricService.observe('my_observable_gauge', 10);
    this.metricService.observe('my_up_down_counter', 1);
    this.metricService.observe('my_observable_up_down_counter', 1);
}
```

Go to http://localhost:8081/metrics to see the metrics
