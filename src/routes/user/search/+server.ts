import * as tf from "@tensorflow/tfjs"
import { user_index as index } from '$lib/constants';
import { handle_server_error } from '$lib/util/handle_server_error';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/redis/search';
import { remote } from '$lib/util/embedding/remote';
import { xenova } from "$lib/util/embedding/xenova";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { page, text } = await request.json();
		const embedding = await xenova(text)
		const B = Buffer.from(embedding)
		const res = await search({
			index,
			page,
			B,
			options: { RETURN: ['name', 'b'] }
		});
		res.documents = res.documents.map(d => {
			d.value.similarity = (1 - tf.losses.cosineDistance(embedding, d.value.dist, 0).dataSync()[0])
			delete d.value.dist
			return d
		})
		return json(res);
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
