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
exports.DecoratorMetadata = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("./constants");
let DecoratorMetadata = class DecoratorMetadata {
    constructor(reflector) {
        this.reflector = reflector;
    }
    isAccessDecorator(target) {
        if (!target) {
            return false;
        }
        console.log('isAccessDecorator');
        console.log(this.reflector.get(constants_1.OPENTELEMETRY_CUSTOM_METRICS_ACCESS_METRIC, target));
        return !!this.reflector.get(constants_1.OPENTELEMETRY_CUSTOM_METRICS_ACCESS_METRIC, target);
    }
    getAccessDecoratorMetadata(target) {
        return this.reflector.get(constants_1.OPENTELEMETRY_CUSTOM_METRICS_ACCESS_METRIC, target);
    }
};
DecoratorMetadata = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], DecoratorMetadata);
exports.DecoratorMetadata = DecoratorMetadata;
//# sourceMappingURL=decorator.metadata.js.map