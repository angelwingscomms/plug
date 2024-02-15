import { oai } from './oai';

export const embed = async (v: string, b?: boolean) => {
	const e = await oai(v);
	if (b) return Buffer.from(new Float32Array(e).buffer);
	return e;
};
