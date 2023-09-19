import { error } from '@sveltejs/kit';

export const handle_server_error = (m: string, e: unknown, status=500) => {
	console.error(m, e);
	return error(status);
};
