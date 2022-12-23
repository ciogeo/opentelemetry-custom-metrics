import { Injectable } from '@nestjs/common';
import { MetricOptions } from '@opentelemetry/api';
import { MetricInterface } from './metrics/metric.interface';
import {
    addCounter,
    addHistogram,
    addObservableCounter,
    addObservableGauge,
    addObservableUpDownCounter,
    addUpDownCounter,
    observe,
} from './metric.functions';

@Injectable()
export class MetricService {
    public addCounter(name: string, options?: MetricOptions): MetricInterface {
        return addCounter(name, options);
    }

    public addHistogram(name: string, options?: MetricOptions): MetricInterface {
        return addHistogram(name, options);
    }

    public addObservableCounter(name: string, options?: MetricOptions): MetricInterface {
        return addObservableCounter(name, options);
    }

    public addObservableGauge(name: string, options?: MetricOptions): MetricInterface {
        return addObservableGauge(name, options);
    }

    public addUpDownCounter(name: string, options?: MetricOptions): MetricInterface {
        return addUpDownCounter(name, options);
    }

    public addObservableUpDownCounter(name: string, options?: MetricOptions): MetricInterface {
        return addObservableUpDownCounter(name, options);
    }

    public observe(name: string, value: number): void {
        return observe(name, value);
    }
}
