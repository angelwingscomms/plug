import type { PageServerLoad } from './$types';
import { client } from '$lib/util/redis';
import { handle_server_error } from '$lib/util/handle_server_error';

export const load: PageServerLoad = async ({ locals, request }) => {
	try {
		const session = locals.user;
		if (!session?.user?.id) return {}
		const { '$.name': name_, '$.text': text_ } = await client.json.get(session?.user?.id ?? '', {
			path: ['$.name', '$.text']
		});
		return { name: name_[0], text: text_[0] };
	} catch (e) {
		handle_server_error(request, e);
	}
};
