import { get } from '$lib/util/redis/get.js';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { reply } from '$lib/util/redis/post/replies/reply';
import { EscapedEmail, type RedisKey } from '$lib/types';
import { is_user } from '$lib/util/redis/post/users/is_user';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const ids: RedisKey[] = await request.json();
	const target = params.id;
	const session = await locals.getSession();
	if (!session?.user?.email) throw redirect(302, '/auth');

	if (
		!(await get<{ allow_replies: number }>(target, ['$.allow_replies']).then(
			(r) => r.allow_replies
		))
	)
		if (!is_user(target, new EscapedEmail(session.user.email)))
			throw error(
				401,
				`You may not reply to specified target post ${target}, for it does not allow replies,and you do not own it, neither are you a contributor`
			);

	for (const post of ids) {
		if (!(await is_user(target, new EscapedEmail(session.user.email))))
			throw error(
				401,
				`You may not reply with this post, for you do not own it, neither are you a contributor`
			);

		await reply({ post, target });
	}
	return new Response(null, { status: 202 });
};
