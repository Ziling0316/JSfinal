import { encodeBase32LowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

export function isValidTime(time: Date) {
	var difference = time.getTime() - Date.now();
	console.log(Date.now() + 5 * 1000 * 60);
	var minutesDifference = Math.floor(difference / 1000 / 60);
	console.log(minutesDifference);
	if (minutesDifference >= 5) {
		return true;
	}
	return false;
}

export function isValidStore(store: unknown): store is string {
	return typeof store === 'string' && store.length > 0;
}

export function isValidItem(item: unknown): item is string {
	return typeof item === 'string' && item.length > 0;
}

export function isValidPhone(phone: unknown): phone is string {
	return typeof phone === 'string' && phone.length === 10 && /^[0-9]{10}$/.test(phone);
}

export function isValidRole(role: unknown): role is string {
	return typeof role === 'string' && (role === 'Guest' || role === 'Boss');
}
export function isValidUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length > 0 &&
		/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(username)
	);
}
export async function RepeatUsername(username: string) {
	const res = await db.select().from(table.user).where(eq(table.user.username, username));
	if (res.at(0)) {
		return true;
	} else {
		return false;
	}
}
export function isValidPassword(password: unknown): password is string {
	return typeof password === 'string' && password.length > 0;
}
export function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
export function isValidStatus(status: unknown): status is string {
	return typeof status === 'string' && (status === '休息中' || status === '營業中');
}
export function isValidURL(url: unknown): url is string {
	return (
		typeof url === 'string' &&
		url.length >= 1 &&
		/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url)
	);
}
