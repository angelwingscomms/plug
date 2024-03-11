import {
	error
	// type NumericRange
} from '@sveltejs/kit';

// interface CustomError {
// 	status: NumericRange<400, 599>;
// 	message: string;
// }

export const handle_server_error = (
	request: Request,
	e: unknown,
	message?: string,
	error_message?: string
) => {
	if (!(e.status && String(e.status).startsWith('3'))) {
		console.error('--server-error');
		console.error(message ?? '', e ?? '', request.url);
	}
	return e.status ? e : error(500, error_message);
};
