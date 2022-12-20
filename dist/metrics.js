"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
const common_1 = require("@nestjs/common");
const api_1 = require("@opentelemetry/api");
const counter_metric_service_1 = require("./counter-metric.service");
const gauge_metric_service_1 = require("./gauge-metric.service");
const histogram_metric_service_1 = require("./histogram-metric.service");
const metric_type_1 = require("./metric.type");
let Metrics = class Metrics {
    constructor() {
        this.intrumentation = new Map();
        this.meter = api_1.default.metrics.getMeter("opentelemetry-custom-metrics");
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
};
Metrics = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], Metrics);
exports.Metrics = Metrics;
//# sourceMappingURL=metrics.js.map