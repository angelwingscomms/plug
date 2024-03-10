import { message_index } from '$lib/constants';
import { remote_buffer } from '$lib/util/embedding/remote';
import { search } from '$lib/util/redis/search';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const input = url.searchParams.get('q') || '';
		const B = await remote_buffer(input);
		const res = await search({ query: '@k:"p"', index: message_index, options: { RETURN: ['n', 'i', 'p'] }, B });
		return json(res);
	} catch (e) {
		console.error(e);
		throw error(500);
	}
};
