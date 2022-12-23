import { Test, TestingModule } from '@nestjs/testing';
import { MetricService } from '../src/metric.service';
import { CounterMetric } from '../src/metrics/counter.metric';
import { HistogramMetric } from '../src/metrics/histogram.metric';
import { ObservableCounterMetric } from '../src/metrics/observable-counter.metric';
import { ObservableGaugeMetric } from '../src/metrics/observable-gauge.metric';
import { ObservableUpDownCounterMetric } from '../src/metrics/observable-up-down-counter.metric';
import { UpDownCounterMetric } from '../src/metrics/up-down-counter.metric';

describe('MetricService', () => {
    let metricService: MetricService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [MetricService],
        }).compile();

        metricService = app.get<MetricService>(MetricService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(metricService).toBeDefined();
    });

    describe('addCounter', () => {
        it('should add counter', () => {
            const returnedObj = metricService.addCounter('test-counter', { description: 'test' });

            expect(returnedObj).toBeInstanceOf(CounterMetric);
        });
    });

    describe('addHistogram', () => {
        it('should add histogram', () => {
            const returnedObj = metricService.addHistogram('test-histogram', { description: 'test' });

            expect(returnedObj).toBeInstanceOf(HistogramMetric);
        });
    });

    describe('addObservableCounter', () => {
        it('should add observable counter', () => {
            const returnedObj = metricService.addObservableCounter('test-observable-counter', { description: 'test' });

            expect(returnedObj).toBeInstanceOf(ObservableCounterMetric);
        });
    });

    describe('addObservableGauge', () => {
        it('should add observable gauge', () => {
            const returnedObj = metricService.addObservableGauge('test-observable-gauge', { description: 'test' });

            expect(returnedObj).toBeInstanceOf(ObservableGaugeMetric);
        });
    });

    describe('addUpDownCounter', () => {
        it('should add up down counter', () => {
            const returnedObj = metricService.addUpDownCounter('test-up-down-counter', { description: 'test' });

            expect(returnedObj).toBeInstanceOf(UpDownCounterMetric);
        });
    });

    describe('addObservableUpDownCounter', () => {
        it('should add observable up down counter', () => {
            const returnedObj = metricService.addObservableUpDownCounter('test-observable-up-down-counter', {
                description: 'test',
            });

            expect(returnedObj).toBeInstanceOf(ObservableUpDownCounterMetric);
        });
    });

    describe('observe', () => {
        it('should observe instruments', () => {
            metricService.addCounter('test-counter', { description: 'test' });
            metricService.addHistogram('test-histogram', { description: 'test' });
            metricService.addObservableCounter('test-observable-counter', {
                description: 'test',
            });
            metricService.addObservableGauge('test-observable-gauge', { description: 'test' });
            metricService.addUpDownCounter('test-up-down-counter', { description: 'test' });
            metricService.addObservableUpDownCounter('test-observable-up-down-counter', { description: 'test' });

            try {
                metricService.observe('test-counter', 1);
                metricService.observe('test-histogram', 1);
                metricService.observe('test-observable-counter', 1);
                metricService.observe('test-observable-gauge', 1);
                metricService.observe('test-up-down-counter', 1);
                metricService.observe('test-observable-up-down-counter', 1);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    });
});
