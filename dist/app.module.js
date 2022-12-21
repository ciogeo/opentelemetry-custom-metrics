"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetryCustomMetricsModule = void 0;
const metric_service_1 = require("./metric.service");
class OpenTelemetryCustomMetricsModule {
    static async forRoot() {
        return {
            global: true,
            module: OpenTelemetryCustomMetricsModule,
            imports: [],
            providers: [metric_service_1.MetricService],
            exports: [metric_service_1.MetricService],
        };
    }
    static async forRootAsync() {
        return {
            global: true,
            module: OpenTelemetryCustomMetricsModule,
            imports: [],
            providers: [metric_service_1.MetricService],
            exports: [metric_service_1.MetricService],
        };
    }
}
exports.OpenTelemetryCustomMetricsModule = OpenTelemetryCustomMetricsModule;
//# sourceMappingURL=app.module.js.map