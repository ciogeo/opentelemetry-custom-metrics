import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MetricInterface } from '../metric.interface';
import { MetricService } from '../metric.service';
export declare class AccessMetricInterceptor implements NestInterceptor {
    private readonly metricService;
    protected accessCounter: MetricInterface;
    constructor(metricService: MetricService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
