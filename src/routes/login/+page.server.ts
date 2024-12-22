import { db } from '$lib/server/db';
import { hash, verify } from '@node-rs/argon2';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { isValidUsername, isValidPassword, RepeatUsername } from '../component/function';

export const actions: Actions = {
	login: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username');
		const password = data.get('password');
		if (!isValidUsername(username)) {
			return fail(400, { message: 'Invalid username' });
		}
		if (!isValidPassword(password)) {
			return fail(400, { message: 'Invalid password' });
		}
		const result = await db.select().from(table.user).where(eq(table.user.username, username));
		const existingUser = result.at(0);
		if (!existingUser) {
			return fail(400, { message: 'The username is not found' });
		}
		// if (!RepeatUsername(username)) {
		// 	return fail(400, { message: 'Incorrect username' });
		// }
		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		if (existingUser.role === 'Guest') {
			return redirect(302, '/guest');
		} else if (existingUser.role === 'Boss') {
			return redirect(302, '/boss');
		}
	}
};
