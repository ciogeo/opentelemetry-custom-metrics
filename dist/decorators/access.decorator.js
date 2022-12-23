"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessMetric = void 0;
const metric_functions_1 = require("../metric.functions");
function AccessMetric(name, options) {
    return function (target, propertyKey, descriptor) {
        const className = target.constructor.name;
        const handlerName = propertyKey;
        const originalMethod = descriptor.value;
        const wrappedMethod = function PropertyDescriptor(...args) {
            if (!name) {
                name = `${className}_${handlerName}_access_counter`;
            }
            if (!options) {
                options = {
                    description: `Number of times ${className}.${handlerName} was called`,
                };
            }
            const accessCounter = metric_functions_1.addCounter(`${name}`, options);
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
exports.AccessMetric = AccessMetric;
//# sourceMappingURL=access.decorator.js.map