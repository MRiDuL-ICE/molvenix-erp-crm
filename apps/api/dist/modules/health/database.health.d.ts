import { HealthIndicatorService } from '@nestjs/terminus';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../drizzle/schema/index.js';
export declare class DatabaseHealthIndicator {
    private readonly indicator;
    private readonly db;
    constructor(indicator: HealthIndicatorService, db: PostgresJsDatabase<typeof schema>);
    isHealthy(key?: string): Promise<import("@nestjs/terminus").HealthIndicatorResult<string, "up", {
        responseTime: number;
    }> | import("@nestjs/terminus").HealthIndicatorResult<string, "down", {
        message: string;
    }>>;
}
