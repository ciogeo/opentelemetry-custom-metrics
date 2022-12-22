import { OnModuleInit } from "@nestjs/common";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { DecoratorMetadata } from "./decorator.metadata";
export declare class DecoratorExplorer implements OnModuleInit {
    private readonly discoveryService;
    private readonly metadataScanner;
    private readonly decoratorMetadata;
    constructor(discoveryService: DiscoveryService, metadataScanner: MetadataScanner, decoratorMetadata: DecoratorMetadata);
    onModuleInit(): void;
    explore(): void;
}
