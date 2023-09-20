import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ request, locals }) => {
	try {
		const user = (await locals.getSession())?.user;
		if (!user) throw redirect(303, '/auth');
		if (!(await client.exists(user.id))) {
			handle_server_error(
				request.url,
				{message:`did not - but expected to - find user with id: ${user.id}`,
				status:404}
			);
		}
		await client.del(user.id)
		return new Response()
	}
	catch (e: any) {
		throw handle_server_error(`${request.method} ${request.url}`, e)
	}
}

export const PUT: RequestHandler = async ({ request, locals }) => {
	try {
		const user = (await locals.getSession())?.user;
		if (!user) throw redirect(303, '/auth');
		if (!await client.exists(user.id)) {
			handle_server_error(request.url, {message: `did not - but expected to - find user with id: ${user.id}`, status: 404})
		}
		const arg = await request.json();
		for (const key of Object.keys(arg)) {
			client.json.set(user.id, `$.${key}`, arg[key]);
		}
		return new Response(null, { status: 200 });
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
