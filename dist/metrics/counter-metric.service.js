"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterMetricService = void 0;
class CounterMetricService {
    constructor(meter, name, options) {
        this.counter = meter.createCounter(name, options);
    }
    observe(value) {
        this.counter.add(value);
    }
}
exports.CounterMetricService = CounterMetricService;
//# sourceMappingURL=counter-metric.service.js.map