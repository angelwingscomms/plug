import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './[email]/$types';
import { EscapedEmail } from '$lib/types';
import { get } from '$lib/util/user/get';

export const PUT: RequestHandler = async ({ request, locals }) => {
	try {
		const user = (await locals.getSession())?.user;
		if (!user) throw error(401);
		if (!user.email)
			throw handle_server_error(request.url, `user did not have email. user: ${user}`);
		const res = await get(new EscapedEmail(user.email));
		if (!res) throw error(404); //TODO 500?
		const arg = await request.json();
		for (const key of Object.keys(arg)) {
			client.json.set(res.id, `$.${key}`, arg[key]);
		}
		return new Response(null, { status: 200 });
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
