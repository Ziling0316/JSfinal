import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	passwordHash: text('password_hash').notNull(),
	phone: text('phone').notNull(),
	role: text('role').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const store = sqliteTable('store', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	store_name: text('store_name').notNull(),
	status: text('status').notNull(),
	url: text('url').notNull(),
	boss_name: text('boss_name').notNull(),
	boss_phone: text('boss_phone').notNull()
});

export const menu = sqliteTable('menu', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	store_id: integer('store_id')
		.notNull()
		.references(() => store.id),
	item: text('item').notNull(),
	price: integer('price').notNull()
});

export const order = sqliteTable('order', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	store_id: integer('store_id')
		.notNull()
		.references(() => store.id),
	store_name: text('store_name').notNull(),
	main_person: text('main_person').notNull(),
	main_person_phone: text('main_person_phone').notNull(),
	status: text('status').notNull(),
	time: integer('time', { mode: 'timestamp' }).notNull()
});

export const group_order = sqliteTable('group_order', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	order_id: integer('order_id')
		.notNull()
		.references(() => order.id),
	name: text('name').notNull(),
	item: text('item').notNull(),
	price: integer('price').notNull(),
	time: integer('time', { mode: 'timestamp' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Store = typeof store.$inferSelect;
export type Menu = typeof menu.$inferSelect;
export type Order = typeof order.$inferSelect;
export type GroupOrder = typeof group_order.$inferSelect;
