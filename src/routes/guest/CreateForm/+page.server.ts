import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { isValidUsername, isValidStore, isValidTime, isValidPhone } from '../../component/function';
export const load: PageServerLoad = async (event) => {
	const store = await db.select().from(table.store).where(eq(table.store.status, '營業中')).all();
	return { store: store };
};

export const actions: Actions = {
	CreateForm: async (event) => {
		const data = await event.request.formData();
		const main_person = data.get('main_person');
		const store_name = data.get('store_name');
		const time = data.get('time');
		const phone = data.get('phone');
		if (!isValidUsername(main_person)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!isValidPhone(phone)) {
			return fail(400, { message: 'Invalid phone number' });
		}
		if (!isValidStore(store_name)) {
			return fail(400, { message: 'Invalid store name' });
		}
		var timestamp = new Date(new Date().toUTCString().split(':')[0].slice(0, -2) + time);
		if (!isValidTime(timestamp)) {
			return fail(400, { message: 'Time difference must be greater than 5 minutes' });
		}
		try {
			const store_id = await db
				.select()
				.from(table.store)
				.where(eq(table.store.store_name, store_name));
			if (store_id.length === 0) {
				return fail(400, { message: 'Store not found' });
			} else {
				await db.insert(table.order).values({
					store_id: store_id[0].id,
					store_name: store_name,
					main_person: main_person,
					main_person_phone: phone,
					status: '進行中',
					time: timestamp
				});
			}
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
