import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MetricInterface } from '../metric.interface';
import { MetricService } from '../metric.service';
export declare class TimeToProcessMetricInterceptor implements NestInterceptor {
    private readonly metricService;
    protected timeToProcessHistogram: MetricInterface;
    protected timeToProcessGauge: MetricInterface;
    constructor(metricService: MetricService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
