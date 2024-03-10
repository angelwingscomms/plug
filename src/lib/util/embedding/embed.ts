import { remote } from './remote';

export const embed = (t: string) => remote(t);

export const embed_to_buffer = async (t: string): Promise<Buffer> =>
	Buffer.from(new Float32Array(await remote(t)).buffer);
