import { db } from '$lib/server/db';
import { hash, verify } from '@node-rs/argon2';
import * as table from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import {
	isValidRole,
	isValidUsername,
	isValidPassword,
	RepeatUsername,
	generateUserId,
	isValidPhone
} from '../component/function';

export const actions: Actions = {
	register: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const phone = data.get('phone');
		const role = data.get('role');
		if (!isValidUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (await RepeatUsername(username)) {
			return fail(400, { message: 'Repeat username' });
		}
		if (!isValidPassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}
		if (!isValidPhone(phone)) {
			return fail(400, { message: 'Invalid phone number' });
		}
		if (!isValidRole(role)) {
			return fail(400, { message: 'Invalid role' });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({
				id: userId,
				username: username,
				passwordHash: passwordHash,
				phone: phone,
				role: role
			});

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'An error has occurred' });
		}
		const existingUser = (
			await db.select().from(table.user).where(eq(table.user.username, username))
		).at(0);
		if (!existingUser) {
			return fail(400, { message: 'An error has occurred' });
		}
		if (existingUser.role === 'Guest') {
			return redirect(302, '/guest');
		} else if (existingUser.role === 'Boss') {
			return redirect(302, '/boss');
		}
	}
};
