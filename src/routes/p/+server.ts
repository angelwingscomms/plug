import { message_index } from '$lib/constants';
import { embed_buffer } from '$lib/util/embedding/embed';
import { handle_server_error } from '$lib/util/handle_server_error';
import { resolve_tags } from '$lib/util/item/resolve_tags';
import { search } from '$lib/util/redis/search';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, url }) => {
	try {
		const q = url.searchParams.get('q') || '';
		const e = url.searchParams.get('e');
		const B = await embed_buffer(q);
		let query = '@k:"p"';
		console.log('--e', e);
		if (e) {
			query += `@tags: { ${(await resolve_tags(q)).map((t) => t.replaceAll('|', '\\|')).join(' | ')}}`;
		}
		const res = await search({
			query,
			index: message_index,
			options: { RETURN: ['n', 'i', 'p'] },
			B
		});
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
