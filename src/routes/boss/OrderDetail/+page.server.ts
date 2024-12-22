import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
// import { isValidStore, isValidStatus, isValidURL } from '../component/function';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq, and, or } from 'drizzle-orm';
export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	}
	const order_id = event.url.searchParams.get('order_id');
	const orders = await db
		.select()
		.from(table.group_order)
		.where(eq(table.group_order.order_id, Number(order_id)))
		.all();
	return { orders: orders };
};
