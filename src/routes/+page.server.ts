import { message_index } from '$lib/constants';
import type { ProductListing } from '$lib/types/product';
import { embed_buffer } from '$lib/util/embedding/embed';
import { search } from '$lib/util/redis/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q') || '';
	const B = await embed_buffer(q);
	const res = await search<ProductListing>({
		// query: `@k:"p" @tags: { ${tags.map((t) => t.replaceAll('|', '\\|')).join(' | ')}}`,
		index: message_index,
		options: { RETURN: ['n', 'i', 'p'] },
		B
	});
	console.debug('--rt', res.total)
	return { q, ...res };
};
