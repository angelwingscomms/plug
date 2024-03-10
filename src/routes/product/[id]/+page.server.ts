import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const product = (await client.json.get(params.id, { path: ['n', 'a', 'i', 'ii', 'u'] })) as {
			n: string;
			a: string;
			i: {Location: string};
			u: string;
		};
		const username = (await client.json.get(product.u, { path: 'u' })) as string;
		return { ...product, u: product.u, uf: username };
	} catch (e) {
		console.error(e);
		throw error(500);
	}
};
