import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/search';

export const POST = (async ({ request }) => {
	return json(
		search(await request.json()).toArray()
	);
}) satisfies RequestHandler;
