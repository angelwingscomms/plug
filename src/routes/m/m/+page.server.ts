import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// import { message_index } from '$lib/constants';
// import { AggregateGroupByReducers, AggregateSteps } from 'redis';
import { handle_server_error } from '$lib/util/handle_server_error';

export const load: PageServerLoad = async ({ request, locals }) => {
	try {
		if (!(await client.exists(locals.user)))
			throw error(404, `user with id "${locals.user}" not found`);

		// const res = await client.ft.aggregate(message_index, `@t:"${locals.user}"`, {
		// 	STEPS: [
		// 		// { type: AggregateSteps.FILTER, expression: 'exists(@u)' },
		// 		// { type: AggregateSteps.FILTER, expression: 'exists(@d)' },
		// 		{
		// 			type: AggregateSteps.GROUPBY,
		// 			properties: '@u',
		// 			REDUCE: { type: AggregateGroupByReducers.MAX, AS: 'd', property: '@d' }
		// 		},
		// 		{
		// 			type: AggregateSteps.SORTBY,
		// 			BY: { DIRECTION: 'DESC', BY: '@d' },
		// 			MAX: 36
		// 		}
		// 	]
		// });
		const res = (await client.json.get('um', { path: locals.user })) as string[];
		return { um: res };
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
