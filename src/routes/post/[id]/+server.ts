import type { RequestHandler } from './$types';
import { del } from '$lib/util/redis/del';
import { update } from '$lib/util/redis/update';
import { get_root_id } from '$lib/util/redis/post/get_root_id';
import { exists } from '$lib/util/redis/exists';
import { is_user } from '$lib/util/redis/post/users/is_user';
import type { PostEdit } from '$lib/types/post';
import { error } from '@sveltejs/kit';
import { posts_index_name } from '$lib/constants';
import { create } from '$lib/util/redis/create';
import { EscapedEmail } from '$lib/types';
import { unauthorized_user_error } from '$lib/util/errors/unauthorized_user_error';
import { allowed } from '$lib/util/redis/post/allowed';
import { requires_payment } from '$lib/util/redis/post/requires_payment';
import { get } from '$lib/util/redis/get';

export const GET: RequestHandler = async ({ params, url, locals }) => {
	if (await requires_payment(params.id)) {
		const session = await locals.getSession();
		if (!session?.user?.email) throw error(402);
		if (!allowed(new EscapedEmail(session.user.email), params.id)) throw error(402);
	}
	let paths = [];
	try {
		paths = JSON.parse(url.searchParams.get('paths') || '');
	} catch {
		throw error(400, 'search parameter `url` was not valid JSON');
	}
	if (!Array.isArray(paths)) throw error(400, 'search parameter `paths` was not a JSON array');
	return get(params.id, paths)
};

export const PUT: RequestHandler = async ({ request, locals, params }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) {
		throw error(401, 'You are not logged in');
	}
	const { id } = params;
	if (
		!(await exists(id).catch((e) => {
			throw error(500, e);
		}))
	) {
		throw error(404, `${id} does not exist`);
	}
	const root_id = await get_root_id(id).catch((e) => {
		throw error(500, e);
	});
	if (!root_id) {
		throw error(404, `Encountered an error getting the root post of post ${id}. It was not found`);
	}
	const { data } = await request.json();
	if (
		!(await is_user(id, new EscapedEmail(session.user.email)).catch((e) => {
			throw error(500, e);
		}))
	) {
		throw error(401, unauthorized_user_error(session.user.email));
	}
	await update({ id: root_id, data }).catch((e) => {
		throw error(500, e);
	});
	const edit_create_data: PostEdit = {
		edit: { to: root_id, current: true },
		name: data.name,
		body: data.body,
		alias: data.alias,
		alias_plural: data.alias_plural,
		replies_description: data.replies_description,
		replied_description: data.replied_description
	};
	await create({
		index: posts_index_name,
		data: edit_create_data
	}).catch((e) => {
		throw error(500, e);
	});
	return new Response('done', { status: 200 });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user?.email) throw error(401, 'You are not logged in');
	const { id } = params;
	if (!(await is_user(id, new EscapedEmail(session.user.email))))
		throw error(401, unauthorized_user_error(session.user.email));
	await del(id);
	return new Response(null, { status: 204 });
};
