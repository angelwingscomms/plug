import { message_index } from '$lib/constants';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handle_server_error } from '$lib/util/handle_server_error';
import type { ProductListing } from '$lib/types/item';
import { embed_buffer } from '$lib/util/embedding/embed';

export const load: PageServerLoad = async ({ params, request, url }) => {
	try {
		if (!(await client.exists(params.id)))
			throw error(404, `User with id "${params.id}" not found`);
		const q = url.searchParams.get('q');
		const res = await search<ProductListing>({
			index: message_index,
			query: `@u:"${params.id}"`,
			// ...(q && { B: await embed_buffer(q) }),
			options: {
				RETURN: ['n', 'i', 'p', 'u'],
				SORTBY: { BY: 'd', DIRECTION: 'DESC' }
			}
		});
		return {
			q,
			uf: await client.json.get(params.id, { path: 'u' }),
			id: params.id,
			...res
		};
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
