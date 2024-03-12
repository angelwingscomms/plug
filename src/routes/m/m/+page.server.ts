import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message_index } from '$lib/constants';
import { AggregateGroupByReducers, AggregateSteps } from 'redis';
import { handle_server_error } from '$lib/util/handle_server_error';

export const load: PageServerLoad = async ({ request, locals }) => {
	try {
		if (!(await client.exists(locals.id)))
			throw error(404, `user with id "${locals.id}" not found`);

		const res = await client.ft.aggregate(message_index, `@t:"${locals.id}"`, {
			STEPS: [
				{
					type: AggregateSteps.GROUPBY,
					properties: '@u',
					REDUCE: { type: AggregateGroupByReducers.MAX, AS: 'd', property: '@d' }
				},
				{
					type: AggregateSteps.SORTBY,
					BY: { DIRECTION: 'DESC', BY: '@d' },
					MAX: 36
				}
			]
		});
		console.info('--a-res', res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
