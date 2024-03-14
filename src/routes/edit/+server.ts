import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { embed_user } from '$lib/util/user/embed_user';
import { sanitize_string } from '$lib/util/sanitize';

export const DELETE: RequestHandler = async ({ request, locals }) => {
	try {
		if (!locals.user) throw redirect(303, '/auth');
		if (!(await client.exists(locals.user)))
			throw error(404, `user with id "${locals.user}" was not found`);
		await client.del(locals.user);
		return new Response();
	} catch (e) {
		throw handle_server_error(request, e);
	}
};

export const PUT: RequestHandler = async ({ request, locals }) => {
	try {
		if (!(await client.exists(locals.user))) throw error(400, `user with id "${locals.user}" was not found`)
		let { c, t, h, u, e, x, ch, cl, l } = await request.json();
		const v = await embed_user({
			...(u && { username: u }),
			...(t && { user_description: t }),
			...(c && { contact_details: c })
		});
		u = sanitize_string(u);
		e = sanitize_string(e);
		c = sanitize_string(c);
		ch = sanitize_string(ch);
		cl = sanitize_string(cl);
		x = sanitize_string(x);
		l = sanitize_string(l);
		t = sanitize_string(t);
		h = sanitize_string(h);
		client.json.set(locals.user, '$.u', u);
		client.json.set(locals.user, '$.e', e);
		client.json.set(locals.user, '$.x', x);
		client.json.set(locals.user, '$.c', c);
		client.json.set(locals.user, '$.t', t);
		client.json.set(locals.user, '$.l', l);
		client.json.set(locals.user, '$.ch', ch);
		client.json.set(locals.user, '$.cl', cl);
		client.json.set(locals.user, '$.h', h);
		client.json.set(locals.user, '$.v', v);
		return new Response();
	} catch (e) {
		throw handle_server_error(request, e);
	}
};