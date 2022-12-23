import { MetricOptions } from '@opentelemetry/api';
import { addCounter } from '../metric.functions';

export function AccessMetric(name?: string, options?: MetricOptions): MethodDecorator {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const className = target.constructor.name;
        const handlerName = propertyKey;
        const originalMethod = descriptor.value;

        const wrappedMethod = function PropertyDescriptor(...args: any[]) {
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

            return originalMethod.apply(this, args);
        };

        descriptor.value = wrappedMethod;

        Reflect.getMetadataKeys(originalMethod).forEach((metadataKey) => {
            Reflect.defineMetadata(metadataKey, Reflect.getMetadata(metadataKey, originalMethod), wrappedMethod);
        });

        return descriptor;
    };
}
