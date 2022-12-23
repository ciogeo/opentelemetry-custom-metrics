"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpDownCounterMetric = void 0;
class UpDownCounterMetric {
    constructor(meter, name, options) {
        this.counter = meter.createUpDownCounter(name, options);
    }
    observe(value) {
        this.counter.add(value);
    }
}
exports.UpDownCounterMetric = UpDownCounterMetric;
//# sourceMappingURL=up-down-counter.metric.js.map