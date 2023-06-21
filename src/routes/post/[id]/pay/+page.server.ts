import { get } from '$lib/util/redis/get';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { allowed } from '$lib/util/redis/post/allowed';
import { exists } from '$lib/util/redis/exists';
import { EscapedEmail } from '$lib/types';

const redirect_to_post = (id: string) => {
	throw redirect(302, `/post/${id}/`);
};

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!exists(params.id)) throw error(404, `${params.id} not found`);
	const { required, name, once, cost, duration, replies_description } = await get<{
		required: boolean;
		name: string;
		once: boolean;
		cost: number;
		duration: number;
		replies_description: string;
	}>(params.id, [
		`$.payment.required`,
		`$.name`,
		`$.payment.once`,
		`$.payment.cost`,
		`$.replies_description`
	]);
	if (!required) redirect_to_post(params.id);
	const session = await locals.getSession();
	if (!session?.user?.email) return {};
	if (await allowed(new EscapedEmail(session.user.email), params.id)) redirect_to_post(params.id);
	return { id: params.id, name, once, cost, self, duration, replies_description };
};
