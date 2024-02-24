import { message_id_prefix } from '$lib/constants';
import { message_channel } from '$lib/util/ably';
import { message_name } from '$lib/util/chat/message_name';
import { embed } from '$lib/util/embedding/embed';
import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	try {
		const m = await request.json();
		const message = {
			...m,
			v: await embed(m.c),
			f: locals.user,
			t: params.id
		};
		const id = `${message_id_prefix}${await client.incr('last_free_message_id')}`;
		await client.json.set(id, '$', message);
		const event = {
			id,
			value: { ...message, uf: (await client.json.get(locals.user, { path: 'u' })) as string }
		};
		message_channel.publish(params.id, event);
		message_channel.publish(message_name(params.id, locals.user), event);
		return new Response();
	} catch (e) {
		throw handle_server_error(`/m/${params.id} error: ${e}`, request);
	}
};
