import { message_id_prefix } from '$lib/constants';
import { message_channel } from '$lib/util/ably';
import { message_name } from '$lib/util/chat/message_name';
import { handle_server_error } from '$lib/util/handle_server_error';
import { set } from '$lib/util/m/unseen/set';
import { unset } from '$lib/util/m/unseen/unset';
import { client } from '$lib/util/redis';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request }) => {
	const { u, t } = await request.json();
	await unset(u, t);
	return new Response();
};

export const POST: RequestHandler = async ({ request, params, locals }) => {
	try {
		const m = await request.json();
		const message = {
			...m,
			u: locals.user,
			t: params.id
		};
		const id = `${message_id_prefix}${await client.incr('last_free_message_id')}`;
		await client.json.set(id, '$', message);
		await set(locals.user, params.id);
		message_channel.publish(message_name(params.id, locals.user), {
			id,
			value: {
				...message,
				uf: (await client.json.get(locals.user, { path: 'u' })) as string
				// cl: (await client.json.get(locals.user, { path: 'cl' })) as string
			}
		});
		return new Response();
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
