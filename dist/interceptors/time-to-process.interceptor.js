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
exports.TimeToProcessMetricInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const metric_service_1 = require("../metric.service");
const metric_type_1 = require("../metric.type");
let TimeToProcessMetricInterceptor = class TimeToProcessMetricInterceptor {
    constructor(metricService) {
        this.metricService = metricService;
    }
    intercept(context, next) {
        const className = context.getClass().name;
        const handlerName = context.getHandler().name;
        this.timeToProcessHistogram = this.metricService.addInstrumentation(metric_type_1.MetricType.HISTOGRAM, `${className}_${handlerName}_histogram`);
        this.timeToProcessGauge = this.metricService.addInstrumentation(metric_type_1.MetricType.GAUGE, `${className}_${handlerName}_gauge`);
        const start = Date.now();
        return next.handle().pipe(operators_1.tap(() => {
            const duration = Date.now() - start;
            this.timeToProcessHistogram.observe(duration);
            this.timeToProcessGauge.observe(duration);
        }));
    }
};
TimeToProcessMetricInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [metric_service_1.MetricService])
], TimeToProcessMetricInterceptor);
exports.TimeToProcessMetricInterceptor = TimeToProcessMetricInterceptor;
//# sourceMappingURL=time-to-process.interceptor.js.map