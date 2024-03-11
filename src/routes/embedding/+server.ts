import { oai } from '$lib/util/embedding/oai';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { handle_server_error } from '$lib/util/handle_server_error';

export const POST: RequestHandler = async ({ request }) => {
	try {
		return json(await oai(await request.text()));
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
