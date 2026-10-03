import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';
import { sql } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DRIZZLE } from '../../drizzle/drizzle.module.js';
import * as schema from '../../drizzle/schema/index.js';

@Injectable()
export class DatabaseHealthIndicator {
  constructor(
    private readonly indicator: HealthIndicatorService,
    @Inject(DRIZZLE) private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async isHealthy(key = 'database') {
    const session = this.indicator.check(key);
    const started = Date.now();
    try {
      await this.db.execute(sql`select 1`);
      return session.up({ responseTime: Date.now() - started });
    } catch (err) {
      return session.down({ message: (err as Error).message });
    }
  }
}
