import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export async function PUT({ request }: RequestEvent) {
	const { number, items } = await request.json();
	if (!number || !items || !Array.isArray(items)) {
		return json({ message: 'Invalid input' }, { status: 400 });
	}
	// console.log(items);
	for (let i = 0; i < items.length; i++) {
		if (!ValidateItem(items[i])) {
			return json({ message: `Invalid item [${i + 1}]` }, { status: 400 });
		}
	}
	try {
		for (let i = 0; i < items.length; i++) {
			if (!number) {
				return json({ message: `Invalid store number` }, { status: 400 });
			}
			await db
				.update(table.menu)
				.set({ store_id: number, item: items[i].name, price: items[i].price })
				.execute();
		}
		return json({ message: `更新成功` });
	} catch (error) {
		return json({ message: '更新失敗', error }, { status: 500 });
	}
}
function ValidateItem(item: any) {
	return (
		typeof item.name === 'string' &&
		item.name.length >= 1 &&
		typeof item.price === 'number' &&
		item.price >= 0
	);
}
