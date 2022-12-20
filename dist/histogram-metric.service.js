"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistogramMetricService = void 0;
class HistogramMetricService {
    constructor(meter, name) {
        this.histogram = meter.createHistogram(name);
    }
    observe(value) {
        this.histogram.record(value);
    }
}
exports.HistogramMetricService = HistogramMetricService;
//# sourceMappingURL=histogram-metric.service.js.map