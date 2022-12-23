"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableCounterMetric = void 0;
class ObservableCounterMetric {
    constructor(meter, name, options) {
        this.counter = meter.createObservableCounter(name, options);
    }
    observe(value) {
        this.counter.addCallback((observableResult) => {
            observableResult.observe(value);
        });
    }
}
exports.ObservableCounterMetric = ObservableCounterMetric;
//# sourceMappingURL=observable-counter.metric.js.map