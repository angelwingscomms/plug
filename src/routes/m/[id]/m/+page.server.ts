import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message_index } from '$lib/constants';
import { AggregateGroupByReducers, AggregateSteps } from 'redis';

export const load: PageServerLoad = async ({ params, locals, request }) => {
	if (!(await client.exists(params.id))) throw error(404, `user with id "${params.id}" not found`);

	const res = await client.ft.aggregate(message_index, `@t:"${params.id}"`, {
		STEPS: [
			{
				type: AggregateSteps.GROUPBY,
				properties: '@u',
				REDUCE: { type: AggregateGroupByReducers.MAX, AS: 'd', property: '@d' }
			}
		]
	});
};
