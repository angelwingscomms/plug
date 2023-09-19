import { handle_server_error } from '$lib/util/handle_server_error';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try{console.log(`auth/google/callback: ${request.url} : ${await request.text()}`);
		return new Response();
	} catch (e) {
		throw handle_server_error('/auth/google', e)
	}
};
