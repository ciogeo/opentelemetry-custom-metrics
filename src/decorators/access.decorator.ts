import { MetricOptions } from '@opentelemetry/api';
import { addCounter } from '../metric.functions';

export function AccessMetric(name?: string, options?: MetricOptions): MethodDecorator {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const className = target.constructor.name;
        const handlerName = propertyKey;
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const result = await originalMethod.apply(this, args);

            if (!name) {
                name = `${className}_${handlerName}_access_counter`;
            }

            if (!options) {
                options = {
                    description: `Number of times ${className}.${handlerName} was called`,
                };
            }

            const accessCounter = addCounter(`${name}`, options);
            accessCounter.observe(1);

            return result;
        };

        return descriptor;
    };
}
