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
exports.DecoratorExplorer = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const decorator_metadata_1 = require("./decorator.metadata");
const metric_functions_1 = require("./metric.functions");
let DecoratorExplorer = class DecoratorExplorer {
    constructor(discoveryService, metadataScanner, decoratorMetadata) {
        this.discoveryService = discoveryService;
        this.metadataScanner = metadataScanner;
        this.decoratorMetadata = decoratorMetadata;
    }
    onModuleInit() {
        this.explore();
    }
    explore() {
        console.log("111111111");
        const providers = this.discoveryService
            .getControllers();
        console.log(providers);
        providers.forEach((wrapper) => {
            const { instance } = wrapper;
            console.log("222222222");
            this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (key) => {
                if (this.decoratorMetadata.isAccessDecorator(instance[key])) {
                    const metadata = this.decoratorMetadata.getAccessDecoratorMetadata(instance[key]);
                    console.log(instance[key]);
                    const className = instance.constructor.name;
                    const handlerName = key;
                    const accessCounter = metric_functions_1.addCounter(`${className}_${handlerName}_counter`, {
                        description: `Number of times ${className}.${handlerName} was called`,
                    });
                    accessCounter.observe(1);
                    console.log('observe');
                    return instance[key].apply(instance, []);
                }
            });
        });
    }
};
DecoratorExplorer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.MetadataScanner,
        decorator_metadata_1.DecoratorMetadata])
], DecoratorExplorer);
exports.DecoratorExplorer = DecoratorExplorer;
//# sourceMappingURL=decorator.explorer.js.map