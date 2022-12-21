"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessMetric = void 0;
const metric_functions_1 = require("../metric.functions");
function AccessMetric() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const result = originalMethod.apply(this, args);
            const className = target.constructor.name;
            const handlerName = propertyKey;
            const accessCounter = metric_functions_1.addCounter(`${className}_${handlerName}_counter`, {
                description: `Number of times ${className}.${handlerName} was called`,
            });
            accessCounter.observe(1);
            return result;
        };
        return descriptor;
    };
}
exports.AccessMetric = AccessMetric;
//# sourceMappingURL=access.decorator.js.map