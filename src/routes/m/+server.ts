import { message_id_prefix } from '$lib/constants';
import { message_channel } from '$lib/util/ably';
// import { message_name } from '$lib/util/chat/message_name';
import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const m = await request.json();
		const message = {
			...m,
			f: locals.user,
			t: 'all'
		};
		const id = `${message_id_prefix}${await client.incr('last_free_message_id')}`;
		await client.json.set(id, '$', message);
		const event = {
			id,
			value: {
				...message,
				uf: (await client.json.get(m.value.f, { path: 'u' })) as string,
				cl: (await client.json.get(m.value.f, { path: 'cl' })) as string
			}
		};
		message_channel.publish(locals.user, event);
		message_channel.publish('all', event);
		// message_channel.publish(message_name(locals.user, locals.user), { id, value: { ...message } });
		return new Response();
	} catch (e) {
		throw handle_server_error(`POST /m error: ${e}`, request);
	}
};
