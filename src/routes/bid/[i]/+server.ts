import type { Bid } from '$lib/types/bid';
import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { handle_server_error } from '$lib/util/handle_server_error';

export const PUT: RequestHandler = async ({ params, request, locals }) => {
try{	const bid_user = await client.json.get(params.i, { path: ['u'] });
	if (!bid_user) throw error(404, `bid with id "${params.i}" not found`); //TODO-test
	if (bid_user !== locals.user)
		throw error(400, `authenticated user "${locals.user}" does not own bid "${params.i}"`);
	const bid_params = (await request.json()) as Pick<Bid, 'd' | 'p'>;
	await client.json.set(params.i, '$.d', bid_params.d);
	await client.json.set(params.i, '$.p', bid_params.p);
	return new Response();}catch (e) {
		throw handle_server_error(request, e);
	}
};

export const DELETE: RequestHandler = async ({ params, locals, request }) => {
	try {
		const bid_user = await client.json.get(params.i, { path: ['u'] });
		if (!bid_user) throw error(404, `bid with id "${params.i}" not found`); //TODO-test
		if (bid_user !== locals.user)
			throw error(400, `authenticated user "${locals.user}" does not own bid "${params.i}"`);
		await client.json.del(params.i);
		return new Response();
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
