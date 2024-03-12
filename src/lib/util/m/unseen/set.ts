import { client } from '$lib/util/redis';
import { unset } from './unset';

export const set = async (u: string, t: string) => {
	if (!(await client.json.get('um'))) client.json.set('um', '$', {});
	const r = (await client.json.get('um')) as Record<string, string[]>;
	if (!Array.isArray(r[t])) client.json.set('um', `$.${t}`, []);
	unset(u, t);
	await client.json.arrAppend('um', `$.${t}`, u);
};
