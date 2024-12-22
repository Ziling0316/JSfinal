import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return;
	} else if (event.locals.user.role == 'Guest') {
		return redirect(302, '/guest');
	} else if (event.locals.user.role == 'Boss') {
		return redirect(302, '/boss');
	}
};
