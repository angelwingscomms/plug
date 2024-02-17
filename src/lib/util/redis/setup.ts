import { client } from '.';
import { user_id_prefix, user_index } from '$lib/constants';
import { SchemaFieldTypes, VectorAlgorithms } from 'redis';

export const setup = async () => {
	try {
		// await client.ft.dropIndex(user_index)
		console.debug('-users-all', await client.ft.search(user_index, "*"));
		// console.debug('--all-keys', await client.keys("*"));
		// for (const i of await client.keys(user_id_prefix + "*")) {
		// 	await client.json.del(i);
		// }
		console.debug('-user-keys', await client.keys(user_id_prefix + "*"));
		await client.ft.create(
			user_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: 3072,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.u': {
					AS: 'u',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX: user_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error('redis setup error:', e);
	}
};
