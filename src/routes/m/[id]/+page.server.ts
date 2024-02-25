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
		const { h, f } = (await client.json.get(params.id, { path: ['f', 'h'] })) as {
			h: string;
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
		return {
			f,
			h,
			id: params.id,
			m: await Promise.all(
				res.documents
					.sort((a, b) => b.value.d - a.value.d)
					.map(async (m) => {
						m.value.uf = ((await client.json.get(m.value.f, { path: 'u' })) as string) || '';
						return m;
					})
			)
		};
	} catch (e) {
		handle_server_error(`${e}`, request);
	}
};
