"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistogramMetric = void 0;
class HistogramMetric {
    constructor(meter, name, options) {
        this.histogram = meter.createHistogram(name, options);
    }
    observe(value) {
        this.histogram.record(value);
    }
}
exports.HistogramMetric = HistogramMetric;
//# sourceMappingURL=histogram.metric.js.map