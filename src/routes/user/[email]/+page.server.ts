import { EscapedEmail } from '$lib/types';
import type { Text } from '$lib/types/filter';
import { escape_email } from '$lib/util/escape_email';
import { search } from '$lib/util/redis/post/search';
import { get } from '$lib/util/user/get';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = await get(new EscapedEmail(params.email))
	console.log(user)
	if (!user) throw error(404, `User with email ${params.email} was not found`)
	return {...user};
};
