import type { PageServerLoad } from './$types';
import { client } from '$lib/util/redis';
import { handle_server_error } from '$lib/util/handle_server_error';

export const load: PageServerLoad = async ({ locals, request }) => {
	try {
		if (!locals.user) return {};
		const { '$.u': u, '$.t': t } = (await client.json.get(locals.user ?? '', {
			path: ['$.u', '$.t']
		})) as { '$.u': string; '$.t': string };
		return { u: u[0], t: t[0] };
	} catch (e) {
		handle_server_error(request, e);
	}
};
