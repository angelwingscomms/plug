import { embed_endpoint } from '$lib/constants';
import { Buffer } from 'node:buffer';

export const remote = async (body: string): Promise<number[]> => {
	const res = await fetch(embed_endpoint, {
		body,
		method: 'POST'
	});
	return await res.json();
};

export const remote_buffer = async (body: string): Promise<Buffer> => {
	const res = await fetch(embed_endpoint, {
		headers: { b: '.' },
		body,
		method: 'POST'
	});
	return Buffer.from(await res.arrayBuffer());
};
