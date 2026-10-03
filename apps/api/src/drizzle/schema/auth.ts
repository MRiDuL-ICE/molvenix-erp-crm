import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { roles } from './permissions.js';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(), // store lowercased
  passwordHash: text('password_hash'), // null for OTP-only users
  fullName: text('full_name').notNull(),
  roleId: uuid('role_id')
    .notNull()
    .references(() => roles.id),
  isActive: boolean('is_active').notNull().default(true),
  onboardingCompleted: boolean('onboarding_completed').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
