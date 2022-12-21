import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MetricInterface } from '../metric.interface';
import { MetricService } from '../metric.service';
import { MetricType } from '../metric.type';

@Injectable()
export class AccessMetricInterceptor implements NestInterceptor {
    protected accessCounter: MetricInterface;

    constructor(private readonly metricService: MetricService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const className = context.getClass().name;
        const handlerName = context.getHandler().name;

        this.accessCounter = this.metricService.addInstrumentation(
            MetricType.COUNTER,
            `${className}_${handlerName}_counter`,
        );

        this.accessCounter.observe(1);
        return next.handle();
    }
}
