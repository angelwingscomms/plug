import { message_index } from '$lib/constants';
import { type Message } from '$lib/types/message';
import { search } from '$lib/util/redis/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await search<Message>({
		index: message_index,
		query: `@t: "all"`,
		options: {
			RETURN: ['f', 'd', 'h'],
			SORTBY: { BY: 'd', DIRECTION: 'DESC' }
		}
	});
	return { m: res.documents.sort((a, b) => b.value.d - a.value.d) };
};
