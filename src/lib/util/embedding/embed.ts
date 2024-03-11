import { oai } from './oai';
// import { remote } from './remote';

export const embed = (t: string) => oai(t);

export const embed_buffer = async (t: string): Promise<Buffer> =>
	Buffer.from(new Float32Array(await oai(t)).buffer);
