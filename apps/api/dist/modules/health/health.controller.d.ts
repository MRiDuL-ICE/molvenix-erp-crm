import { HealthCheckService } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from './database.health.js';
export declare class HealthController {
    private readonly health;
    private readonly database;
    constructor(health: HealthCheckService, database: DatabaseHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & (import("@nestjs/terminus").HealthIndicatorResult<string, "up", {
        responseTime: number;
    }> | import("@nestjs/terminus").HealthIndicatorResult<string, "down", {
        message: string;
    }>), Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & (import("@nestjs/terminus").HealthIndicatorResult<string, "up", {
        responseTime: number;
    }> | import("@nestjs/terminus").HealthIndicatorResult<string, "down", {
        message: string;
    }>)> | undefined, Partial<import("@nestjs/terminus").HealthIndicatorResult<string, import("@nestjs/terminus").HealthIndicatorStatus, Record<string, any>> & (import("@nestjs/terminus").HealthIndicatorResult<string, "up", {
        responseTime: number;
    }> | import("@nestjs/terminus").HealthIndicatorResult<string, "down", {
        message: string;
    }>)> | undefined>>;
}
