import { message_id_prefix } from '$lib/constants';
import { message_channel } from '$lib/util/ably';
import { message_name } from '$lib/util/chat/message_name';
import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	try {
		const m = await request.json();
		const message = {
			...m,
			f: locals.user,
			t: params.id
		};
		const id = await client.incr('last_free_message_id');
		await client.json.set(`${message_id_prefix}${id}`, '$', message);
		message_channel.publish(message_name(params.id, locals.user), { id, value: { message } });
		return new Response();
	} catch (e) {
		throw handle_server_error(`/chat/${params.id} error: ${e}`, request);
	}
};
