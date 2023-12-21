import * as tf from "@tensorflow/tfjs"
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/util/redis';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!(await client.exists(params.id)))
		throw error(404, `User with id ${params.id} was not found`);
	const { '$.html': html_, '$.name': name_, '$.v': v_ } = await client.json.get(params.id, {
		path: ['$.html', '$.name', '$.v']
	});
	const session = await locals.getSession()
    const auth_user_embedding = await client.json.get(session?.user?.id ?? '', {path: 'v'});
	let similarity: number | undefined = undefined
	if (auth_user_embedding) {
		similarity = Number(((1 - tf.losses.cosineDistance(auth_user_embedding, v_[0], 0).dataSync()[0]) * 100).toPrecision(2))
	}
	return { id: params.id, html: html_[0], name: name_[0], similarity };
};
