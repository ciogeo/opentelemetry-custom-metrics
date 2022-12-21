"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeToProcessMetric = void 0;
const metric_functions_1 = require("../metric.functions");
function TimeToProcessMetric() {
    return function (target, propertyKey, descriptor) {
        const className = target.constructor.name;
        const handlerName = propertyKey;
        const originalMethod = descriptor.value;
        descriptor.value = new Proxy(originalMethod, {
            apply: function (target, thisArg, args) {
                const start = Date.now();
                const result = target.apply(thisArg, args);
                const duration = Date.now() - start;
                const timeToProcessHistogram = metric_functions_1.addHistogram(`${className}_${handlerName}_histogram`, {
                    description: `Time to process ${className}.${handlerName}`,
                });
                timeToProcessHistogram.observe(duration);
                const timeToProcessGauge = metric_functions_1.addObservableGauge(`${className}_${handlerName}_gauge`, {
                    description: `Time to process ${className}.${handlerName}`,
                });
                timeToProcessGauge.observe(duration);
                return result;
            },
        });
        return descriptor;
    };
}
exports.TimeToProcessMetric = TimeToProcessMetric;
//# sourceMappingURL=time-to-process.decorator.js.map