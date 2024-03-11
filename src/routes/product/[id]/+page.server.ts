import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handle_server_error } from '$lib/util/handle_server_error';

export const load: PageServerLoad = async ({ request, params }) => {
	try {
		const product = (await client.json.get(params.id, { path: ['n', 'a', 'i', 'ii', 'u'] })) as {
			n: string;
			a: string;
			i: string;
			ii: string[];
			u: string;
		};
		if (!product) throw error(400, `product with id "${params.id}" not found`)
		const username = (await client.json.get(product.u, { path: 'u' })) as string;
		return { ...product, uf: username };
	} catch (e) {
		throw handle_server_error(request, e)
	}
};
