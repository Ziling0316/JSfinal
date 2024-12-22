import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { gte, sql, lt, and, eq } from 'drizzle-orm';
export const load: PageServerLoad = async (event) => {
	const order = await db
		.select()
		.from(table.order)

		.all();
	// console.log(order.length);
	for (let i = 0; i < order.length; i++) {
		if (order[i].time < new Date()) {
			await db.update(table.order).set({ status: '結單' }).where(eq(table.order.id, order[i].id));
		}
	}
	return { order: order };
};
