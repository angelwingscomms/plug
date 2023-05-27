import type { Post } from '$lib/types';
import { collection } from '$lib/util/collection';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { not_owner } from '$lib/util/not_owner';

export const load = (async ({ params, locals }) => {
	const post = await collection.findOne<Post>({ id: params.id }).then((r) => {
		if (!r) throw error(404, `Post ${params.id} not found`);
		return r;
	});
	const session = await locals.getSession();
	if (!session || !session.user) {
		throw redirect(303, '/auth');
	}
	if (session.user.email !== post.user) {
		throw error(401, not_owner(params.id));
	}
	return {
		post
	};
}) satisfies PageServerLoad;
