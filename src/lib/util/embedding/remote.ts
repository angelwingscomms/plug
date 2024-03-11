// import { Buffer } from 'node:buffer';

import { embed_endpoint } from "$lib/constants/server";

export const remote = async (text: string): Promise<number[]> => {
	const res = await fetch(embed_endpoint, {
		body: text,
		method: 'POST'
	});
	return await res.json();
};

export const remote_buffer = async (text: string): Promise<Buffer> => {
	return Buffer.from(new Float32Array(await remote(text)).buffer);
};

// export const remote_buffer = async (body: string): Promise<Buffer> => {
// 	const res = await fetch(embed_endpoint, {
// 		headers: { b: '.' },
// 		body,
// 		method: 'POST'
// 	});
// 	return Buffer.from(new Float32Array(res).buffer);
// };
