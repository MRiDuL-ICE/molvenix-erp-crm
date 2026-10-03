import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './auth.js';

export const appModule = pgEnum('app_module', [
  'stock',
  'development',
  'commercial',
  'dashboard',
]);
export const scopeType = pgEnum('scope_type', ['own', 'team', 'region', 'all']);

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(), // super_admin, manager, staff, viewer
  description: text('description'),
});

export const permissions = pgTable('permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(), // e.g. stock:view
  module: appModule('module').notNull(),
  description: text('description'),
});

export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    permissionId: uuid('permission_id')
      .notNull()
      .references(() => permissions.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })],
);

export const userRoleScopes = pgTable(
  'user_role_scopes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    module: appModule('module').notNull(),
    scope: scopeType('scope').notNull().default('own'),
  },
  (t) => [unique().on(t.userId, t.module)],
);
