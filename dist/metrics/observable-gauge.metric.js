"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableGaugeMetric = void 0;
class ObservableGaugeMetric {
    constructor(meter, name, options) {
        this.gauge = meter.createObservableGauge(name, options);
    }
    observe(value) {
        this.gauge.addCallback((observableResult) => {
            observableResult.observe(value);
        });
    }
}
exports.ObservableGaugeMetric = ObservableGaugeMetric;
//# sourceMappingURL=observable-gauge.metric.js.map