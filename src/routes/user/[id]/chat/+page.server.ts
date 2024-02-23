import { search } from '$lib/util/redis/search';

export const load: PageServerLoad = async ({ params, locals }) => {
	const messages = await search({
		index: free_message,
		query: `@f:"${locals.user}" @t:"${params.id}"`,
        options: {
            SORTBY: 
        }
	});
};
