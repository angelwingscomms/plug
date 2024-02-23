import { message_index } from '$lib/constants';
import { type Message } from '$lib/types/message';
import { search } from '$lib/util/redis/search';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const res = await search<Message>({
		index: message_index,
		query: `@f:"${locals.user}" @t:"${params.id}"`,
		options: {
			SORTBY: { BY: 'd', DIRECTION: 'DESC' }
		}
	});
	return { id: params.id, m: res.documents };
};
