import { client } from '$lib/util/redis';

export const unset = async (u: string, t: string) => {
	const e = (await client.json.arrIndex('um', `$.${t}`, u)) as number;
	if (e && e > -1) await client.json.arrPop('um', `$.${t}`, e);
};
