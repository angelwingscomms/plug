import { client } from '$lib/util/redis';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { similar } from '$lib/util/user/similar';

export const GET: RequestHandler = async ({ params }) => {
	if (!(await client.exists(params.id))) throw error(404, `User with id ${params.id} not found`);
	return json(await similar(params.id));
};
