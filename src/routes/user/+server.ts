import * as tf from '@tensorflow/tfjs';
import { user_index } from '$lib/constants';
import { handle_server_error } from '$lib/util/handle_server_error';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { search } from '$lib/util/redis/search';
import { embed, embed_to_buffer } from '$lib/util/embedding/embed';
import type { V } from '$lib/types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		let p = Number(url.searchParams.get('p'));
		if (isNaN(p)) p = 0;
		const q = url.searchParams.get('q') || '';
		const query_embedding = await embed(q);
		const B = await embed_to_buffer(q);
		const res = await search<{ u: string; s: string; v: V }>({
			index: user_index,
			page: p,
			B,
			options: { RETURN: ['u', 'v'] }
		});
		res.documents = res.documents.map((d) => {
			d.value.s = (
				(1 - tf.losses.cosineDistance(query_embedding, d.value.v, 0).dataSync()[0]) *
				100
			).toPrecision(2);
			return d;
		});
		return json(res);
	} catch (e) {
		throw handle_server_error(url.pathname, e);
	}
};
