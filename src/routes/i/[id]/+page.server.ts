import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handle_server_error } from '$lib/util/handle_server_error';

export const load: PageServerLoad = async ({ request, params }) => {
	try {
		const item = (await client.json.get(params.id, {
			path: ['n', 'h', 'i', 'ii', 'u', 'p']
		})) as {
			n: string;
			h: string;
			i: string;
			ii: string[];
			p: number;
			u: string;
		};
		if (!item) throw error(400, `item with id "${params.id}" not found`);
		return item;
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
