import { addHistogram, addObservableGauge } from "../metric.functions";

export function TimeToProcessMetric() {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const start = Date.now();

      const result = originalMethod.apply(this, args);

      const duration = Date.now() - start;

      const className = target.constructor.name;
      const handlerName = propertyKey;

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
