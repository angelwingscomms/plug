import { feedback_id_prefix } from '$lib/constants';
import { handle_server_error } from '$lib/util/handle_server_error';
import { client } from '$lib/util/redis';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { id, text } = await request.json();
		await client.json.set(
			feedback_id_prefix.concat((await client.incr('last_feedback_id')).toString()),
			'$',
			{
				id,
				text
			}
		);
		return new Response(null, { status: 201 });
	} catch (e) {
		throw handle_server_error(request, e);
	}
};