import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	try {
		return { user: await event.locals.user };
	} catch {
		return { user: '' };
	}
};
