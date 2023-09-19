import { user_index } from '$lib/constants';
// import { embedding } from '$lib/util/embedding';
import { handle_server_error } from '$lib/util/handle_server_error';
import { search } from '$lib/util/redis/search';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { page, query } = await request.json();
		return json(
			await search({index: user_index, query, RETURN: ['name', 'email'], page})
			// await client.ft.search(user_index, query, {
			// 	RETURN: ['name', 'email'],
			// 	DIALECT: 3,
			// 	LIMIT: { from: page > 1 ? (page - 1) * items_per_page : 0, size: items_per_page },
			// })
		);
		// return json(await search({ index: 'users', search: await embedding(query), page }));
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
