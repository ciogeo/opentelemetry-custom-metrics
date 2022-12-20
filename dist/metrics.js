"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
const api_1 = require("@opentelemetry/api");
const counter_metric_service_1 = require("./counter-metric.service");
const gauge_metric_service_1 = require("./gauge-metric.service");
const histogram_metric_service_1 = require("./histogram-metric.service");
const metric_type_1 = require("./metric.type");
class Metrics {
    constructor() {
        this.intrumentation = new Map();
        this.meter = api_1.default.metrics.getMeter("notification-service");
    }
    addInstrumentation(type, name) {
        if (type === metric_type_1.MetricType.COUNTER) {
            this.intrumentation.set(name, new counter_metric_service_1.CounterMetricService(this.meter, name));
        }
        else if (type === metric_type_1.MetricType.HISTOGRAM) {
            this.intrumentation.set(name, new histogram_metric_service_1.HistogramMetricService(this.meter, name));
        }
        else if (type === metric_type_1.MetricType.GAUGE) {
            this.intrumentation.set(name, new gauge_metric_service_1.GaugeMetriService(this.meter, name));
        }
        if (!this.intrumentation.has(name)) {
            throw new Error(`Instrumentation ${name} not found`);
        }
        return this.intrumentation.get(name);
    }
    observe(name, value) {
        if (!this.intrumentation.has(name)) {
            throw new Error(`Instrumentation ${name} not found`);
        }
        this.intrumentation.get(name).observe(value);
    }
}
exports.Metrics = Metrics;
//# sourceMappingURL=metrics.js.map