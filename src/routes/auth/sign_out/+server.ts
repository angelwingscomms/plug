import type { RequestHandler } from './$types';

export const POST: RequestHandler = ({ cookies, locals }) => {
	cookies.set('code', '', { path: '/' });
	locals.user = '';
    return new Response()
};
