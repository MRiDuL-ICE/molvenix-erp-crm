# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
ENV PNPM_STORE_DIR=/pnpm/store
RUN corepack enable
WORKDIR /repo

# Install dependencies using only manifests, so this layer is cached
# until a package.json or the lockfile changes
FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages packages
RUN pnpm install --frozen-lockfile

# Dev target: source code is bind-mounted by docker-compose
FROM deps AS dev
ENV NODE_ENV=development
EXPOSE 3000 3001
CMD ["pnpm", "--parallel", "--filter", "./apps/*", "dev"]

# The prod target is added in the deployment phase