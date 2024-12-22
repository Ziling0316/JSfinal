import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/');
	}
	const stores = await db
		.select()
		.from(table.store)
		.where(eq(table.store.boss_name, event.locals.user.username))
		.all();
	return { stores: stores };
};
