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
		const user = (await locals.getSession())?.user;
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
		const user = (await locals.getSession())?.user;
		if (!user) throw redirect(303, '/auth');
		if (!(await client.exists(user.id))) {
			handle_server_error(request.url, {
				message: `did not - but expected to - find user with id: ${user.id}`,
				status: 404
			});
		}
		let { n,t,h } = await request.json();
		n = sanitize_string(n)
		t = sanitize_string(t)
		h = sanitize_string(h)
		client.json.set(user.id, '$.name', n)
		client.json.set(user.id, '$.text', t);
		client.json.set(user.id, '$.html', h);
		client.json.set(user.id, '$.v', await embed_user({name: n, text: t}));
		return new Response();
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
