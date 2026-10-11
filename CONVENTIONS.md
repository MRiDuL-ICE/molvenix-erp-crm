# Project conventions
- pnpm monorepo: apps/api (NestJS 12, ESM), apps/web (Next.js 16), packages/shared
- Everything runs in Docker Compose. Never run node/pnpm on the host; use `docker compose exec app ...`
- API global prefix is /api/v1. Database is Postgres 16 via Drizzle ORM (no raw SQL except RLS context and analytics)
- ESM: relative imports need explicit extensions ('./file.js')
- API tests use Jest. Test files end in .spec.ts next to the code, e2e tests live in apps/api/test
- Test names read as sentences describing behavior. One behavior per test.
- Never mock the database in integration tests; use the real Postgres test database
- Do not add dependencies without saying so; do not touch package.json beyond the dependency requested
- Never store secrets in code; config comes from environment variables
