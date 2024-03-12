import { message_id_prefix, message_index } from '$lib/constants';
import type { ItemListing } from '$lib/types/item';
// import { embed_buffer } from '$lib/util/embedding/embed';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const q = url.searchParams.get('q') || '';
	// const B = await embed_buffer(q);
	// const tags: string[] = [];
	const res = await search<ItemListing>({
		query: `@k:"p"`,// @tags: { ${tags.map((t) => t.replaceAll('|', '\\|')).join(' | ')}}`,
		index: message_index,
		options: { RETURN: ['n', 'i', 'p', 'u'] },
		// B
	});
	return { q, d: res.documents };
};
