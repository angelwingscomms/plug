import { client } from '$lib/util/redis';
import { oai } from '$lib/util/embedding/oai';
import { ids_hash } from '$lib/constants';
import { dev } from '$app/environment';

const build_id = (index: string, id: number) => `${index}_${id}`;

export const add_embedding = async (data: object) => {
	return { v: await oai(JSON.stringify(data)), ...data };
};

export const create = async ({ index, data }: { index: string; data: object }) => {
	const id = await client.hIncrBy(ids_hash, index, 1);
	const item_id = build_id(index, id);
	const set: { [index: string]: any; expires?: boolean } = await add_embedding({
		...data,
		id: item_id,
		created: Date.now()
	});
	if (dev) set.expires = true;
	await client.json.set(item_id, '$', set);
	return item_id;
};
