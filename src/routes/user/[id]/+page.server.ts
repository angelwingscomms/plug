import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/util/redis';

export const load: PageServerLoad = async ({ params }) => {
	const user = await client.json.get(params.id)
	console.log(user)
	if (!user) throw error(404, `User with id ${params.id} was not found`)
	return {
		text: user.text,
		html: user.html,
		name: user.name,
		id: user.id
	};
};
