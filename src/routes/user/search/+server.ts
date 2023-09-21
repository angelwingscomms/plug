import { user_index as index, items_per_page } from '$lib/constants';
import { handle_server_error } from '$lib/util/handle_server_error';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { float32_buffer } from '$lib/util/float32_buffer';
import { xenova } from '$lib/util/embedding/xenova';
import { client } from '$lib/util/redis';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { page, query: text } = await request.json();
		const res = await client.ft.search(index, `*=>[KNN ${page * items_per_page} @v $B]`, {
			PARAMS: { B: float32_buffer(await xenova(text)) },
			LIMIT: { from: page > 1 ? (page - 1) * items_per_page : 0, size: items_per_page },
			RETURN: ['name'],
			DIALECT: 3
		});
		return json(res);
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
