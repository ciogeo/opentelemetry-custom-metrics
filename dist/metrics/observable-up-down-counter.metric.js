"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableUpDownCounterMetric = void 0;
class ObservableUpDownCounterMetric {
    constructor(meter, name, options) {
        this.counter = meter.createObservableUpDownCounter(name, options);
    }
    observe(value) {
        this.counter.addCallback((observableResult) => {
            observableResult.observe(value);
        });
    }
}
exports.ObservableUpDownCounterMetric = ObservableUpDownCounterMetric;
//# sourceMappingURL=observable-up-down-counter.metric.js.map