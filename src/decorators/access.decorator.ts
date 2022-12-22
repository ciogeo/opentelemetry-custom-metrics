import { addCounter } from "../metric.functions";

export function AccessMetric() {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const className = target.constructor.name;
    const handlerName = propertyKey;
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const descriptorThis = this;
      const result = await originalMethod.apply(descriptorThis, args);

      const accessCounter = addCounter(`${className}_${handlerName}_counter`, {
        description: `Number of times ${className}.${handlerName} was called`,
      });
      accessCounter.observe(1);

      return result;
    };

    return descriptor;
  };
}
