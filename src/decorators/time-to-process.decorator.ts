import {
  addCounter,
  addHistogram,
  addObservableGauge,
} from "../metric.functions";

export function TimeToProcessMetric(): MethodDecorator {
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
      const start = Date.now();
      const result = await originalMethod.apply(descriptorThis, args);
      const duration = Date.now() - start;

      const timeToProcessHistogram = addHistogram(
        `${className}_${handlerName}_histogram`,
        {
          description: `Time to process ${className}.${handlerName}`,
        }
      );
      timeToProcessHistogram.observe(duration);

      const timeToProcessGauge = addObservableGauge(
        `${className}_${handlerName}_gauge`,
        {
          description: `Time to process ${className}.${handlerName}`,
        }
      );
      timeToProcessGauge.observe(duration);

      return result;
    };

    return descriptor;
  };
}
