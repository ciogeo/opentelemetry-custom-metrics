import { Type } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { MetricOptions } from "./decorators";
export declare class DecoratorMetadata {
    private readonly reflector;
    constructor(reflector: Reflector);
    isAccessDecorator(target: Type<any> | Function): boolean;
    getAccessDecoratorMetadata(target: Type<any> | Function): MetricOptions | undefined;
}
