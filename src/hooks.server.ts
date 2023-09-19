import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';
import { protected_routes } from '$lib/constants';
import type { Provider } from '@auth/core/providers';
import { google } from '$lib/util/user/create/google';
import { client } from '$lib/util/redis';
import { escape_email } from '$lib/util/escape_email';

const authorization: Handle = async ({ event, resolve }) => {
	if (protected_routes.includes(event.url.pathname)) {
		if (!(await event.locals.getSession())) {
			throw redirect(303, '/auth');
		}
	}
	return resolve(event);
};

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			Google({
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
				authorization: {
					params: {
						prompt: 'consent',
						access_type: 'offline',
						response_type: 'code'
					}
				}
			}) as Provider
		],
		callbacks: {
			async signIn(arg) {
				google(arg)
				return true;
			},
			// async session(arg) {
			// 	console.log(arg)
			// 	if (!arg.session.user?.email) return arg.session.user
			// 	const res = await client.ft.search('users', `@email:${escape_email(arg.session.user?.email)}`)
			// 	const user_res = res.documents[0]
			// 	console.log(user_res)
			// 	return { id: user_res.id, name:  user_res.value.name, email: user_res.value.email}

			// }
		},
		secret: AUTH_SECRET
	}),
	authorization
);
