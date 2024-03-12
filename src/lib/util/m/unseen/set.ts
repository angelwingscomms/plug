import { client } from '$lib/util/redis';
import { unset } from './unset';

export const set = async (u: string, t: string) => {
	unset(u, t);
	await client.json.arrAppend('um', `$.${t}`, u);
};
