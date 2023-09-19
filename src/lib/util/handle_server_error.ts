import { error } from '@sveltejs/kit';

export const handle_server_error = (m: string, e: unknown) => {
	console.error(m, e);
	return error(500);
};
