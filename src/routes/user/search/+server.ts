import * as tf from "@tensorflow/tfjs"
import { user_index as index } from '$lib/constants';
import { handle_server_error } from '$lib/util/handle_server_error';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/redis/search';
import { remote } from "$lib/util/embedding/remote";
import { client } from "$lib/util/redis";
import { embed } from "$lib/util/embedding/embed";
				
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { page, text } = await request.json();
		const query_embedding = await embed(text)
		const B = (await embed(text, true)) as Buffer
		const res = await search({
			index,
			page,
			B,
			options: { RETURN: ['name', 'v'] }
		});
		res.documents = res.documents.map(d => {
			d.value.similarity = ((1 - tf.losses.cosineDistance(query_embedding, d.value.v, 0).dataSync()[0]) * 100).toPrecision(2)
			delete d.value.v
			return d
		})
		return json(res);
	} catch (e) {
		throw handle_server_error(request.url, e);
	}
};
