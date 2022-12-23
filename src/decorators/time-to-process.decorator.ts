import { MetricOptions } from '@opentelemetry/api';
import { addHistogram, addObservableGauge } from '../metric.functions';

export function TimeToProcessMetric(name?: string, options?: MetricOptions): MethodDecorator {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const className = target.constructor.name;
        const handlerName = propertyKey;
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const start = Date.now();
            const result = await originalMethod.apply(this, args);
            const duration = Date.now() - start;

            if (!name) {
                name = `${className}_${handlerName}_time`;
            }

            if (!options) {
                options = {
                    description: `Time to process ${className}.${handlerName}`,
                };
            }

            const timeToProcessHistogram = addHistogram(`${name}_histogram`, options);
            timeToProcessHistogram.observe(duration);

            const timeToProcessGauge = addObservableGauge(`${name}_gauge`, options);
            timeToProcessGauge.observe(duration);

            return result;
        };

        return descriptor;
    };
}
