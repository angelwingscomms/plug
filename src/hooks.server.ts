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
import { unescape_email } from '$lib/util/unescape_email';

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
				google(arg);
				return true;
			},
			async session(arg) {
				console.log('da', arg);
				// return arg.session
				if (!arg.session.user?.email) return arg.session;
				const res = await client.ft.search(
					'users',
					`@email:${escape_email(arg.session.user.email)}`
				);
				if (!res.total) return arg.session
				const user_res = res.documents[0];
				console.log('ur', user_res);
				return {
					user: {
						id: user_res.id ? String(user_res.id) : undefined,
						name: user_res.value.name ? String(user_res.value.name) : undefined,
						email: user_res.value.email ? unescape_email(String(user_res.value.name)) : undefined
					},
					expires: new Date('9999-12-31').toISOString()
				};
			}
		},
		secret: AUTH_SECRET
	}),
	authorization
);
