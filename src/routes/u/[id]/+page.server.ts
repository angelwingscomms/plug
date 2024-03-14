import { losses } from '@tensorflow/tfjs';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/util/redis';
import type { V } from '$lib/types';
import type { User } from '$lib/types/user';
import { handle_server_error } from '$lib/util/handle_server_error';

export const load: PageServerLoad = async ({ params, request, locals }) => {
	try {
		if (!(await client.exists(params.id)))
			throw error(404, `User with id ${params.id} was not found`);
		const user = (await client.json.get(params.id, {
			path: ['h', 'u', 'v', 'c', 'x', 'ch']
		})) as User & {s: number, v: V};
		if (user.x) delete user.h;
		const auth_user_embedding = (await client.json.get(locals.user ?? '', { path: 'v' })) as V;
		if (auth_user_embedding) {
			user.s = Number(
				((1 - losses.cosineDistance(auth_user_embedding, user.v, 0).dataSync()[0]) * 100).toPrecision(
					2
				)
			);
		}
		return { i: params.id, ...user };
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
