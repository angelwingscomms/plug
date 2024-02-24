import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const n = !!url.searchParams.get('n');
	const t = url.searchParams.get('t');
	return { n, t };
};
