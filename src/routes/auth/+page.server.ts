import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
    const t = url.searchParams.get('t');
	if (session?.user) {
		throw redirect(302, t ? t : '/');
	}
	return { t };
};
