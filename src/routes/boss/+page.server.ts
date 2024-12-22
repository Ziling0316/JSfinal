import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import { isValidStore, isValidStatus, isValidURL } from '../component/function';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq, and, or } from 'drizzle-orm';
function handleStatus() {
	console.log('handleStatus');
}
export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	}
	const myStore = await db
		.select()
		.from(table.store)
		.where(eq(table.store.boss_name, event.locals.user.username))
		.all();

	let orders = [];
	for (let i = 0; i < myStore.length; i++) {
		orders.push(
			await db
				.select()
				.from(table.order)
				.where(
					and(
						or(eq(table.order.status, '結單'), eq(table.order.status, '訂單已完成')),
						eq(table.order.store_name, myStore[i].store_name)
					)
				)
		);
	}
	for (let i = 0; i < orders.length; i++) {
		if (orders[i].length === 0) {
			orders.splice(i, 1);
			i--;
		}
	}
	return { orders: orders.flat() };
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event); //刪除session

		return redirect(302, '/');
	},
	changeStatus: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');
		if (!id) {
			return fail(400, { message: 'Invalid id' });
		}
		try {
			await db
				.update(table.order)
				.set({ status: '訂單已完成' })
				.where(eq(table.order.id, Number(id)));
		} catch (e) {
			// console.error(e);
			return fail(500, { message: 'An error has occurred' });
		}
		// console.log(id);
	},
	addShop: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		const boss = (
			await db.select().from(table.user).where(eq(table.user.id, event.locals.session.userId))
		).at(0);
		if (!boss) {
			return fail(401);
		}
		const formData = await event.request.formData();
		const store_name = formData.get('store_name');
		const status = formData.get('status');
		const url = formData.get('url');
		if (!isValidStore(store_name)) {
			return fail(400, { message: 'Invalid store name' });
		}
		if (!isValidStatus(status)) {
			return fail(400, { message: 'Invalid status' });
		}
		if (!isValidURL(url)) {
			return fail(400, { message: 'Invalid URL' });
		}
		try {
			await db.insert(table.store).values({
				store_name: store_name,
				status: status,
				url: url,
				boss_name: boss.username,
				boss_phone: boss.phone
			});
		} catch (e) {
			// console.error(e);
			return fail(500, { message: 'An error has occurred' });
		}
		//
		// 	.execute();
		return 200;
	}
};
