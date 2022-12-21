"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistogramMetricService = void 0;
class HistogramMetricService {
    constructor(meter, name, options) {
        this.histogram = meter.createHistogram(name, options);
    }
    observe(value) {
        this.histogram.record(value);
    }
}
exports.HistogramMetricService = HistogramMetricService;
//# sourceMappingURL=histogram-metric.service.js.map