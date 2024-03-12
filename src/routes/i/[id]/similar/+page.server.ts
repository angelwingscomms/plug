import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { V } from '$lib/types';
import { search } from '$lib/util/redis/search';
import { message_index } from '$lib/constants';
import { float32_buffer } from '$lib/util/float32_buffer';
import type { ItemListing } from '$lib/types/item';

export const load: PageServerLoad = async ({ params }) => {
	if (!(await client.exists(params.id)))
		throw error(404, `item with id "${params.id}" not found`);
	const { v, n } = (await client.json.get(params.id, {
		path: ['v', 'n']
	})) as {
		v: V;
		n: string;
	};
	// const embedding = (await client.json.get(params.id, { path: 'v' })) as V;
	return {
		n,
		id: params.id,
		d: (await search<ItemListing>({
			//TODO - actually add similarity
			index: message_index,
			page: 1,
			B: float32_buffer(v),
			options: { RETURN: ['n', 'p', 'i'] }
			// query: `@u:-"${u}"`
		})).documents
		// .documents.map((d) => {
		// 	d.value.s = Number(
		// 		((1 - losses.cosineDistance(embedding, d.value.v, 0).dataSync()[0]) * 100).toPrecision(2)
		// 	);
		// 	return d;
		// })
	};
};
