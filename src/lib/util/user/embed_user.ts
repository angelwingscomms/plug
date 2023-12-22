import { embed } from '../embedding/embed';

export const embed_user = (arg: { name?: string; text?: string }): Promise<number[]> =>
	embed(JSON.stringify(arg)) as Promise<number[]>;
