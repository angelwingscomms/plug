import { losses } from '@tensorflow/tfjs';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/util/redis';
import type { V } from '$lib/types';
import type { User } from '$lib/types/user';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!(await client.exists(params.id)))
		throw error(404, `User with id ${params.id} was not found`);
	const user = (await client.json.get(params.id)) as User;
	if (user.x) delete user.h;
	// const auth_user_embedding = (await client.json.get(locals.user ?? '', { path: 'v' })) as V;
	// let s: number | undefined = undefined;
	// if (auth_user_embedding) {
	// 	s = Number(
	// 		((1 - losses.cosineDistance(auth_user_embedding, v_[0], 0).dataSync()[0]) * 100).toPrecision(
	// 			2
	// 		)
	// 	);
	// }
	return { id: params.id, user };
};
