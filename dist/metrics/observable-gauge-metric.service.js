"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObservableGaugeMetriService = void 0;
class ObservableGaugeMetriService {
    constructor(meter, name, options) {
        this.gauge = meter.createObservableGauge(name, options);
    }
    observe(value) {
        this.gauge.addCallback((observableResult) => {
            observableResult.observe(value);
        });
    }
}
exports.ObservableGaugeMetriService = ObservableGaugeMetriService;
//# sourceMappingURL=observable-gauge-metric.service.js.map