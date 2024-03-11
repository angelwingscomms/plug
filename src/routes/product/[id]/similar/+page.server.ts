import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { similar } from '$lib/util/user/similar';
import type { V } from '$lib/types';
import { search } from '$lib/util/redis/search';
import { message_index } from '$lib/constants';
import { float32_buffer } from '$lib/util/float32_buffer';

export const load: PageServerLoad = async ({ params }) => {
	if (!(await client.exists(params.id)))
		throw error(404, `product with id "${params.id}" not found`);
	const { v, u } = (await client.json.get(params.id, {
		path: ['v', 'u']
	})) as {
		v: V;
		u: string;
	};
	const embedding = (await client.json.get(params.id, { path: 'v' })) as V;
	return {
		u,
		id: id,
		d: (
			await search<{ u: string; s: number; v: V }>({
				//TODO - actually add similarity
				index: message_index,
				page: 1,
				B: float32_buffer(v),
				options: { RETURN: ['n', 'p',] },
				// query: `@u:-"${u}"`
			})
		)
        // .documents.map((d) => {
		// 	d.value.s = Number(
		// 		((1 - losses.cosineDistance(embedding, d.value.v, 0).dataSync()[0]) * 100).toPrecision(2)
		// 	);
		// 	return d;
		// })
	};
};
