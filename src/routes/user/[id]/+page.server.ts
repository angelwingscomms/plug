import { losses } from '@tensorflow/tfjs';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/util/redis';
import type { V } from '$lib/types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!(await client.exists(params.id)))
		throw error(404, `User with id ${params.id} was not found`);
	const {
		'$.h': h,
		'$.u': u,
		'$.x': x,
		'$.ch': ch,
		'$.v': v_
	} = (await client.json.get(params.id, {
		path: ['$.h', '$.u', '$.v', '$.c', '$.x', '$.ch']
	})) as { '$.h'?: string[]; '$.u': string[]; '$.ch': string[]; '$.x': number[]; '$.v': V[] };
	const auth_user_embedding = (await client.json.get(locals.user ?? '', { path: 'v' })) as V;
	let s: number | undefined = undefined;
	if (auth_user_embedding) {
		s = Number(
			((1 - losses.cosineDistance(auth_user_embedding, v_[0], 0).dataSync()[0]) * 100).toPrecision(
				2
			)
		);
	}
	return { id: params.id, ...(!x[0] && h && { h: h[0] }), ch: ch[0], u: u[0], s };
};
