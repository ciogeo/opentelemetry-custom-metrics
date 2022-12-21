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
exports.AccessMetricInterceptor = void 0;
const common_1 = require("@nestjs/common");
const metric_service_1 = require("../metric.service");
const metric_type_1 = require("../metric.type");
let AccessMetricInterceptor = class AccessMetricInterceptor {
    constructor(metricService) {
        this.metricService = metricService;
    }
    intercept(context, next) {
        const className = context.getClass().name;
        const handlerName = context.getHandler().name;
        this.accessCounter = this.metricService.addInstrumentation(metric_type_1.MetricType.COUNTER, `${className}_${handlerName}_counter`);
        this.accessCounter.observe(1);
        return next.handle();
    }
};
AccessMetricInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [metric_service_1.MetricService])
], AccessMetricInterceptor);
exports.AccessMetricInterceptor = AccessMetricInterceptor;
//# sourceMappingURL=access.interceptor.js.map