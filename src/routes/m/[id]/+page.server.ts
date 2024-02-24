import { message_index } from '$lib/constants';
import { type Message } from '$lib/types/message';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handle_server_error } from '$lib/util/handle_server_error';

export const load: PageServerLoad = async ({ params, request }) => {
	try {
		if (!(await client.exists(params.id))) throw error(404, 'Message not found');
		const { c, f } = (await client.json.get(params.id, { path: ['f', 'c'] })) as {
			c: string;
			f: string;
		};
		const res = await search<Message>({
			index: message_index,
			query: `@t:"${params.id}"`,
			options: {
				RETURN: ['f', 'd', 'h'],
				SORTBY: { BY: 'd', DIRECTION: 'DESC' }
			}
		});
		return { f, c, id: params.id, m: res.documents.sort((a, b) => b.value.d - a.value.d) };
	} catch (e) {
		handle_server_error(`${e}`, request);
	}
};
