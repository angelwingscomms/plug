import { message_index } from '$lib/constants';
import { embed_buffer } from '$lib/util/embedding/embed';
import { handle_server_error } from '$lib/util/handle_server_error';
// import { resolve_tags } from '$lib/util/product/resolve_tags';
import { search } from '$lib/util/redis/search';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, url }) => {
	try {
		const q = url.searchParams.get('q') || '';
		// const tags = await resolve_tags(q)
		const B = await embed_buffer(q);
		const res = await search({
			query: `@k:"p"`, // @tags: { ${tags.map((t) => t.replaceAll('|', '\\|')).join(' | ')}}`,
			index: message_index,
			options: { RETURN: ['n', 'i', 'p'] },
			B
		});
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
