"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observe = exports.addObservableUpDownCounter = exports.addUpDownCounter = exports.addObservableGauge = exports.addObservableCounter = exports.addHistogram = exports.addCounter = void 0;
const api_1 = require("@opentelemetry/api");
const constants_1 = require("./constants");
const metric_type_1 = require("./metric.type");
const counter_metric_1 = require("./metrics/counter.metric");
const histogram_metric_1 = require("./metrics/histogram.metric");
const observable_counter_metric_1 = require("./metrics/observable-counter.metric");
const observable_gauge_metric_1 = require("./metrics/observable-gauge.metric");
const observable_up_down_counter_metric_1 = require("./metrics/observable-up-down-counter.metric");
const up_down_counter_metric_1 = require("./metrics/up-down-counter.metric");
const intrumentation = new Map();
function addCounter(name, options) {
    return addInstrumentation(metric_type_1.MetricType.COUNTER, name, options);
}
exports.addCounter = addCounter;
function addHistogram(name, options) {
    return addInstrumentation(metric_type_1.MetricType.HISTOGRAM, name, options);
}
exports.addHistogram = addHistogram;
function addObservableCounter(name, options) {
    return addInstrumentation(metric_type_1.MetricType.OBSERVABLE_COUNTER, name, options);
}
exports.addObservableCounter = addObservableCounter;
function addObservableGauge(name, options) {
    return addInstrumentation(metric_type_1.MetricType.OBSERVABLE_GAUGE, name, options);
}
exports.addObservableGauge = addObservableGauge;
function addUpDownCounter(name, options) {
    return addInstrumentation(metric_type_1.MetricType.UP_DOWN_COUNTER, name, options);
}
exports.addUpDownCounter = addUpDownCounter;
function addObservableUpDownCounter(name, options) {
    return addInstrumentation(metric_type_1.MetricType.OBSERVABLE_UP_DOWN_COUNTER, name, options);
}
exports.addObservableUpDownCounter = addObservableUpDownCounter;
function observe(name, value) {
    if (!this.intrumentation.has(name)) {
        throw new Error(`Instrumentation ${name} not found`);
    }
    intrumentation.get(name).observe(value);
}
exports.observe = observe;
function addInstrumentation(type, name, options) {
    if (intrumentation.has(name)) {
        return intrumentation.get(name);
    }
    const meter = api_1.default.metrics.getMeterProvider().getMeter(constants_1.OPENTELEMETRY_CUSTOM_METRICS);
    switch (type) {
        case metric_type_1.MetricType.COUNTER:
            intrumentation.set(name, new counter_metric_1.CounterMetric(meter, name, options));
            break;
        case metric_type_1.MetricType.HISTOGRAM:
            intrumentation.set(name, new histogram_metric_1.HistogramMetric(meter, name, options));
            break;
        case metric_type_1.MetricType.OBSERVABLE_COUNTER:
            intrumentation.set(name, new observable_counter_metric_1.ObservableCounterMetric(meter, name, options));
            break;
        case metric_type_1.MetricType.OBSERVABLE_GAUGE:
            intrumentation.set(name, new observable_gauge_metric_1.ObservableGaugeMetric(meter, name, options));
            break;
        case metric_type_1.MetricType.UP_DOWN_COUNTER:
            intrumentation.set(name, new up_down_counter_metric_1.UpDownCounterMetric(meter, name, options));
            break;
        case metric_type_1.MetricType.OBSERVABLE_UP_DOWN_COUNTER:
            intrumentation.set(name, new observable_up_down_counter_metric_1.ObservableUpDownCounterMetric(meter, name, options));
            break;
        default:
            throw new Error(`Metric type ${type} not supported`);
    }
    return intrumentation.get(name);
}
//# sourceMappingURL=metric.functions.js.map