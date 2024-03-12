import { message_index } from '$lib/constants';
import { embed_buffer } from '$lib/util/embedding/embed';
import { handle_server_error } from '$lib/util/handle_server_error';
import { resolve_tags } from '$lib/util/item/resolve_tags';
import { search } from '$lib/util/redis/search';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { SearchOptions } from 'redis';

export const GET: RequestHandler = async ({ request, url }) => {
	try {
		const q = url.searchParams.get('q');
		const s = url.searchParams.get('s');
		const p = url.searchParams.get('p');
		const e = url.searchParams.get('e');
		const u = url.searchParams.get('u');
		const B = await embed_buffer(q);
		let query = '@k:"p"';
		if (u) query += ` @u:"${u}"`;
		if (e)
			query += `@tags: { ${(await resolve_tags(q)).map((t) => t.replaceAll('|', '\\|')).join(' | ')}}`;
		const options: SearchOptions = { RETURN: ['n', 'i', 'p'] };
		if (s) {
			if (s == 'sl') options.SORTBY = { BY: 'p', DIRECTION: 'ASC' };
			if (s == 'sh') options.SORTBY = { BY: 'p', DIRECTION: 'DESC' };
		}
		const page = p ? (isNaN(Number(p)) ? 0 : Number(p)) : 0;
		const res = await search({
			query,
			index: message_index,
			page,
			options
			B
		});
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};