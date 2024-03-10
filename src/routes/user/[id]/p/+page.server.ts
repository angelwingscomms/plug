import { message_index } from '$lib/constants';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handle_server_error } from '$lib/util/handle_server_error';
import { remote_buffer } from '$lib/util/embedding/remote';
import type { ProductListing } from '$lib/types/product';

export const load: PageServerLoad = async ({ params, request, url }) => {
	try {
		if (!(await client.exists(params.id))) throw error(404, `User with id "${params.id}" not found`);
		const q = url.searchParams.get('q');
		const res = await search<ProductListing>({
			index: message_index,
			query: `@u:"${params.id}"`,
			...(q && { B: remote_buffer(q) }),
			options: {
				RETURN: ['n', 'i', 'p'],
				SORTBY: { BY: 'd', DIRECTION: 'DESC' }
			}
		});
		return {
			q,
			uf: await client.json.get(params.id, { path: 'u' }),
			id: params.id,
			p: await Promise.all(
				res.documents
					// .sort((a, b) => b.value.d - a.value.d)
					.map(async (m) => {
						m.value.uf = ((await client.json.get(m.value.u, { path: 'u' })) as string) || '';
						// m.value.cl = ((await client.json.get(m.value.u, { path: 'cl' })) as string) || '';
						return m;
					})
			)
		};
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
