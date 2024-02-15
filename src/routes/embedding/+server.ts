import { embedding } from '$lib/util/embedding/oai';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	return embedding(await request.text())
		.then((e) => json(e))
		.catch(() => {
			throw error(500, 'We experienced an error processing that request');
		});
}) satisfies RequestHandler;
