"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricService = void 0;
const common_1 = require("@nestjs/common");
const metric_functions_1 = require("./metric.functions");
let MetricService = class MetricService {
    addCounter(name, options) {
        return metric_functions_1.addCounter(name, options);
    }
    addHistogram(name, options) {
        return metric_functions_1.addHistogram(name, options);
    }
    addObservableCounter(name, options) {
        return metric_functions_1.addObservableCounter(name, options);
    }
    addObservableGauge(name, options) {
        return metric_functions_1.addObservableGauge(name, options);
    }
    addUpDownCounter(name, options) {
        return metric_functions_1.addUpDownCounter(name, options);
    }
    addObservableUpDownCounter(name, options) {
        return metric_functions_1.addObservableUpDownCounter(name, options);
    }
    observe(name, value) {
        metric_functions_1.observe(name, value);
    }
};
MetricService = __decorate([
    common_1.Injectable()
], MetricService);
exports.MetricService = MetricService;
//# sourceMappingURL=metric.service.js.map