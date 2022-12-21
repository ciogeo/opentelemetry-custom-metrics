import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MetricInterface } from '../metric.interface';
export declare class AccessMetricInterceptor implements NestInterceptor {
    protected accessCounter: MetricInterface;
    constructor(name: string);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
