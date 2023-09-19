import { embedding } from '$lib/util/embedding';
import { handle_server_error } from '$lib/util/handle_server_error';
import { search } from '$lib/util/redis/search';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { page, query } = await request.json();
		return json(await search({ index: 'users', search: await embedding(query), page }));
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
