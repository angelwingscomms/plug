import { message_index } from '$lib/constants';
import { type Message } from '$lib/types/message';
import { client } from '$lib/util/redis';
import { search } from '$lib/util/redis/search';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!(await client.exists(params.id))) throw error(404, 'User not found');
	const res = await search<Message>({
		index: message_index,
		query: `@f:"${locals.user}" @t:"${params.id}"`,
		options: {
			RETURN: ['f', 't', 'd', 'c'],
			SORTBY: { BY: 'd', DIRECTION: 'DESC' }
		}
	});
	return { id: params.id, m: res.documents.sort((a, b) => a.value.d - b.value.d) };
};
