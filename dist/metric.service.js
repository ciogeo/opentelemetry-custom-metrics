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
exports.MetricService = void 0;
const common_1 = require("@nestjs/common");
const api_1 = require("@opentelemetry/api");
const metric_functions_1 = require("./metric.functions");
let MetricService = class MetricService {
    constructor() {
        this.intrumentation = new Map();
        this.meter = api_1.default.metrics.getMeter("opentelemetry-custom-metrics");
    }
    addCounter(name, options) {
        return metric_functions_1.addCounter(name, options);
    }
    addHistogram(name, options) {
        return metric_functions_1.addHistogram(name, options);
    }
    addObservableGauge(name, options) {
        return metric_functions_1.addObservableGauge(name, options);
    }
    observe(name, value) {
        return metric_functions_1.observe(name, value);
    }
};
MetricService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MetricService);
exports.MetricService = MetricService;
//# sourceMappingURL=metric.service.js.map