"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observe = exports.addObservableGauge = exports.addHistogram = exports.addCounter = exports.intrumentation = exports.meter = void 0;
const api_1 = require("@opentelemetry/api");
const metric_type_1 = require("./metric.type");
const counter_metric_service_1 = require("./metrics/counter-metric.service");
const histogram_metric_service_1 = require("./metrics/histogram-metric.service");
const observable_gauge_metric_service_1 = require("./metrics/observable-gauge-metric.service");
exports.meter = api_1.default.metrics.getMeter("opentelemetry-custom-metrics");
exports.intrumentation = new Map();
function addCounter(name, options) {
    return addInstrumentation(metric_type_1.MetricType.COUNTER, name, options);
}
exports.addCounter = addCounter;
function addHistogram(name, options) {
    return addInstrumentation(metric_type_1.MetricType.HISTOGRAM, name, options);
}
exports.addHistogram = addHistogram;
function addObservableGauge(name, options) {
    return addInstrumentation(metric_type_1.MetricType.OBSERVABLE_GAUGE, name, options);
}
exports.addObservableGauge = addObservableGauge;
function observe(name, value) {
    if (!this.intrumentation.has(name)) {
        throw new Error(`Instrumentation ${name} not found`);
    }
    exports.intrumentation.get(name).observe(value);
}
exports.observe = observe;
function addInstrumentation(type, name, options) {
    if (exports.intrumentation.has(name)) {
        return exports.intrumentation.get(name);
    }
    if (type === metric_type_1.MetricType.COUNTER) {
        exports.intrumentation.set(name, new counter_metric_service_1.CounterMetricService(exports.meter, name, options));
    }
    else if (type === metric_type_1.MetricType.HISTOGRAM) {
        exports.intrumentation.set(name, new histogram_metric_service_1.HistogramMetricService(exports.meter, name, options));
    }
    else if (type === metric_type_1.MetricType.OBSERVABLE_GAUGE) {
        exports.intrumentation.set(name, new observable_gauge_metric_service_1.ObservableGaugeMetriService(exports.meter, name, options));
    }
    if (!exports.intrumentation.has(name)) {
        throw new Error(`Instrumentation ${name} not found`);
    }
    return exports.intrumentation.get(name);
}
//# sourceMappingURL=metric.functions.js.map