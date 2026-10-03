var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';
import { sql } from 'drizzle-orm';
import { DRIZZLE } from '../../drizzle/drizzle.module.js';
let DatabaseHealthIndicator = class DatabaseHealthIndicator {
    indicator;
    db;
    constructor(indicator, db) {
        this.indicator = indicator;
        this.db = db;
    }
    async isHealthy(key = 'database') {
        const session = this.indicator.check(key);
        const started = Date.now();
        try {
            await this.db.execute(sql `select 1`);
            return session.up({ responseTime: Date.now() - started });
        }
        catch (err) {
            return session.down({ message: err.message });
        }
    }
};
DatabaseHealthIndicator = __decorate([
    Injectable(),
    __param(1, Inject(DRIZZLE)),
    __metadata("design:paramtypes", [HealthIndicatorService, Function])
], DatabaseHealthIndicator);
export { DatabaseHealthIndicator };
//# sourceMappingURL=database.health.js.map