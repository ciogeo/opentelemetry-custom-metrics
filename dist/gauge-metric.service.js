"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaugeMetriService = void 0;
class GaugeMetriService {
    constructor(meter, name) {
        this.gauge = meter.createObservableGauge(name);
    }
    observe(value) {
        this.gauge.addCallback((observableResult) => {
            observableResult.observe(value);
        });
    }
}
exports.GaugeMetriService = GaugeMetriService;
//# sourceMappingURL=gauge-metric.service.js.map