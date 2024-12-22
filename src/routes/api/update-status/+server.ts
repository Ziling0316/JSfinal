import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const { id, status } = await request.json();
	if (id == null || status == null) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}
	try {
		await db.update(table.store).set({ status }).where(eq(table.store.id, id));
		return json({ message: '狀態更新成功' });
	} catch (error) {
		return json({ message: '狀態更新失敗', error }, { status: 500 });
	}
}
