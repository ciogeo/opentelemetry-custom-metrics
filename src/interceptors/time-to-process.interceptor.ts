import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricInterface } from '../metric.interface';
import { MetricService } from '../metric.service';
import { MetricType } from '../metric.type';

@Injectable()
export class TimeToProcessMetricInterceptor implements NestInterceptor {
    protected timeToProcessHistogram: MetricInterface;
    protected timeToProcessGauge: MetricInterface;

    constructor(private readonly metricService: MetricService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const className = context.getClass().name;
        const handlerName = context.getHandler().name;

        this.timeToProcessHistogram = this.metricService.addInstrumentation(
            MetricType.HISTOGRAM,
            `${className}_${handlerName}_histogram`,
        );

        this.timeToProcessGauge = this.metricService.addInstrumentation(
            MetricType.GAUGE,
            `${className}_${handlerName}_gauge`,
        );

        const start = Date.now();
        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - start;

                this.timeToProcessHistogram.observe(duration);
                this.timeToProcessGauge.observe(duration);
            }),
        );
    }
}
