import { Attributes, Context } from '@opentelemetry/api';

export interface MetricInterface {
    observe(value: number, attributes?: Attributes, context?: Context): void;
}
