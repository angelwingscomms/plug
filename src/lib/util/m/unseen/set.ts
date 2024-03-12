import { client } from '$lib/util/redis';
import { unset } from './unset';

export const set = async (u: string, t: string) => {
	unset(u, t);
	const r = await client.json.get('um', { path: t });
	if (!Array.isArray(r)) client.json.set('um', `$.${t}`, []);
	await client.json.arrAppend('um', `$.${t}`, u);
};
