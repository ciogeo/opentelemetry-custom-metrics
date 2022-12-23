"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterMetric = void 0;
class CounterMetric {
    constructor(meter, name, options) {
        this.counter = meter.createCounter(name, options);
    }
    observe(value) {
        this.counter.add(value);
    }
}
exports.CounterMetric = CounterMetric;
//# sourceMappingURL=counter.metric.js.map