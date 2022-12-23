"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeToProcessMetric = void 0;
const metric_functions_1 = require("../metric.functions");
function TimeToProcessMetric(name, options) {
    return function (target, propertyKey, descriptor) {
        const className = target.constructor.name;
        const handlerName = propertyKey;
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
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
            const timeToProcessHistogram = metric_functions_1.addHistogram(`${name}_histogram`, options);
            timeToProcessHistogram.observe(duration);
            const timeToProcessGauge = metric_functions_1.addObservableGauge(`${name}_gauge`, options);
            timeToProcessGauge.observe(duration);
            return result;
        };
        return descriptor;
    };
}
exports.TimeToProcessMetric = TimeToProcessMetric;
//# sourceMappingURL=time-to-process.decorator.js.map