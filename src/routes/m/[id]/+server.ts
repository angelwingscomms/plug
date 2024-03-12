import * as tf from '@tensorflow/tfjs';
import { message_id_prefix, message_index } from '$lib/constants';
import { message_channel } from '$lib/util/ably';
import { message_name } from '$lib/util/chat/message_name';
import { embed, embed_buffer } from '$lib/util/embedding/embed';
import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/redis/search';
import type { Message } from '$lib/types/message';
import type { V } from '$lib/types';

export const GET: RequestHandler = async ({ url, params, request }) => {
	try {
		if (!(await client.exists(params.id))) throw error(404, 'Message not found');
		let page = Number(url.searchParams.get('p'));
		if (isNaN(page)) page = 0;
		const q = url.searchParams.get('q') || '';
		const query_embedding = await embed(q);
		const B = await embed_buffer(q);
		const res = await search<Message & { s: string; v?: V }>({
			index: message_index,
			query: `@t:"${params.id}"`,
			B,
			page,
			options: {
				RETURN: ['u', 'd', 'h', 'v']
			}
		});
		res.documents = await Promise.all(
			res.documents.map(async (m) => {
				m.value.s = (
					(1 - tf.losses.cosineDistance(query_embedding, m.value.v || [], 0).dataSync()[0]) * //hacked v to be or empty array to satisfy type
					100
				).toPrecision(2);
				m.value.uf = ((await client.json.get(m.value.u, { path: 'u' })) as string) || '';
				// m.value.cl = ((await client.json.get(m.value.u, { path: 'cl' })) as string) || '';
				delete m.value.v;
				return m;
			})
		);
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};

export const POST: RequestHandler = async ({ request, params, locals }) => {
	try {
		const m = await request.json();
		const message = {
			...m,
			v: await embed(m.c),
			u: locals.user,
			t: params.id
		};
		const id = `${message_id_prefix}${await client.incr('last_free_message_id')}`;
		await client.json.set(id, '$', message);
		const event = {
			id,
			value: {
				...message,
				uf: (await client.json.get(locals.user, { path: 'u' })) as string,
				cl: (await client.json.get(locals.user, { path: 'cl' })) as string
			}
		};
		message_channel.publish("e", event);
		message_channel.publish(params.id, event);
		message_channel.publish(locals.user, event);
		message_channel.publish(message_name(params.id, locals.user), event);
		return new Response();
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
