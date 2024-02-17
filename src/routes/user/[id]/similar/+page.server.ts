import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { similar } from '$lib/util/user/similar';

export const load: PageServerLoad = async ({ params }) => {
	if (!(await client.exists(params.id))) throw error(404, 'User not found');
	return await similar(params.id);
};
