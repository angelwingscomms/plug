import { client } from '.';
import { message_id_prefix, message_index, user_id_prefix, user_index } from '$lib/constants';
import { SchemaFieldTypes, VectorAlgorithms } from 'redis';

export const setup = async () => {
	try {
		// await client.ft.dropIndex(user_index)
		// console.info('index dropped')
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
				},
				'$.p': {
					AS: 'p',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX: user_id_prefix,
				NOHL: true
			}
		);

		await client.ft.create(
			message_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: 3072,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.f': {
					AS: 'f',
					type: SchemaFieldTypes.TEXT
				},
				'$.t': {
					AS: 't',
					type: SchemaFieldTypes.TEXT
				},
				'$.d': {
					AS: 'd',
					type: SchemaFieldTypes.NUMERIC
				}
			},
			{
				ON: 'JSON',
				PREFIX: message_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error('redis setup error:', e);
	}
};
