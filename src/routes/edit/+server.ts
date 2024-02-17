import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { xenova } from '$lib/util/embedding/xenova';
import { float32_buffer } from '$lib/util/float32_buffer';
import axios from 'axios';
import { embed_endpoint } from '$lib/constants';
import { remote } from '$lib/util/embedding/remote';
import { embed_user } from '$lib/util/user/embed_user';
import { sanitize_string } from '$lib/util/sanitize';

export const DELETE: RequestHandler = async ({ request, locals }) => {
	try {
		const user = locals.user;
		if (!user) throw redirect(303, '/auth');
		if (!(await client.exists(user.id))) {
			handle_server_error(request.url, {
				message: `did not - but expected to - find user with id: ${user.id}`,
				status: 404
			});
		}
		await client.del(user.id);
		return new Response();
	} catch (e: any) {
		throw handle_server_error(`${request.method} ${request.url}`, e);
	}
};

export const PUT: RequestHandler = async ({ request, locals }) => {
	try {
		const user = locals.user;
		if (!user) throw redirect(303, '/auth');
		if (!(await client.exists(user))) {
			handle_server_error(request.url, {
				message: `did not - but expected to - find user with id: ${user.id}`,
				status: 404
			});
		}
		let { c, t, h, u, e } = await request.json();
		u = sanitize_string(u);
		e = sanitize_string(e);
		c = sanitize_string(c);
		t = sanitize_string(t);
		h = sanitize_string(h);
		client.json.set(user.id, '$.u', u);
		client.json.set(user.id, '$.e', e);
		client.json.set(user.id, '$.c', c);
		client.json.set(user.id, '$.t', t);
		client.json.set(user.id, '$.h', h);
		client.json.set(
			user.id,
			'$.v',
			await embed_user({ username: u, user_description: t, contact: c, email: e })
		);
		return new Response();
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
