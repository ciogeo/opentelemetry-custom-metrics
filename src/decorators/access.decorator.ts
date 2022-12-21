import { addCounter } from "../metric.functions";

export const AccessMetric = (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        const className = target.constructor.name;
        const handlerName = propertyKey;

        const accessCounter = addCounter(
            `${className}_${handlerName}_counter`,
            {
                description: `Number of times ${className}.${handlerName} was called`,
            }
        );
        accessCounter.observe(1);

        return result;
    };
    
    return descriptor;
};
