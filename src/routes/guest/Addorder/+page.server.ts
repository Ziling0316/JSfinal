import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { isValidUsername, isValidItem } from '../../component/function';
var order_id = 1;
export const load: PageServerLoad = async (event) => {
	order_id = Number(event.url.searchParams.get('order_id'));

	const store_id = await db
		.select()
		.from(table.order)
		.where(eq(table.order.id, Number(order_id)));
	const menu = await db
		.select()
		.from(table.menu)
		.where(eq(table.menu.store_id, store_id[0].store_id))
		.all();
	// console.log(order_id);
	// const menu = await db.select().from(table.menu).all();
	return { menu: menu };
};
export const actions: Actions = {
	AddForm: async (event) => {
		const data = await event.request.formData();
		const name = data.get('name');
		const item = data.get('item');
		if (!isValidUsername(name)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!isValidItem(item)) {
			return fail(400, { message: 'Invalid item' });
		}
		// if (!isValidTime(timestamp)) {
		//     return fail(400, { message: 'Time difference must be greater than 5 minutes' });
		// }
		try {
			const price = (await db.select().from(table.menu).where(eq(table.menu.item, item))).at(
				0
			)?.price;
			if (!price) {
				return fail(400, { message: 'Item not found' });
			}
			await db.insert(table.group_order).values({
				order_id: order_id,
				name: name,
				item: item,
				price: price,
				time: new Date()
			});
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'An error has occurred' });
		}
		return 200;
	},
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event); //刪除session
		return redirect(302, '/');
	}
};
