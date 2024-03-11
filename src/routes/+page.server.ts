import { message_id_prefix, message_index } from '$lib/constants';
import type { ProductListing } from '$lib/types/product';
// import { embed_buffer } from '$lib/util/embedding/embed';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q') || '';
	// const B = await embed_buffer(q);
	// const tags: string[] = [];
	console.debug(await client.keys(`${message_id_prefix}*`));
	const res = await search<ProductListing>({
		// query: `@k:"p"`,// @tags: { ${tags.map((t) => t.replaceAll('|', '\\|')).join(' | ')}}`,
		index: message_index,
		count: true
		// options: { RETURN: ['n', 'i', 'p'] },
		// B
	});
	console.debug('--rt', res.total);
	return { q, ...res };
};
