import type { RequestHandler } from './$types';
import type { Bid } from '$lib/types/bid';
import { client } from '$lib/util/redis';
import { bid_id_prefix, bid_last_id } from '$lib/constants';
import { handle_server_error } from '$lib/util/handle_server_error';

export const POST: RequestHandler = async ({ params, request, locals }) => {
	try {
		const bid = (await request.json()) as Pick<Bid, 'd' | 'p'>;
		const id = `${bid_id_prefix}${await client.incr(bid_last_id)}`;
		await client.json.set(id, '$', {
			u: locals.user,
			d: bid.d,
			p: bid.p,
			i: params.id
		});
		return new Response(id);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
