import { embed } from '../embedding/embed';

export const embed_user = (arg: object): Promise<number[]> =>
	embed(JSON.stringify(arg)) as Promise<number[]>;
