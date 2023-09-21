import { SchemaFieldTypes, VectorAlgorithms } from 'redis';
import { client } from '.';
import { user_id_prefix } from '$lib/constants';

export const setup = async () => {
	try {
		await client.ft.create(
			'users',
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.HNSW,
					TYPE: 'FLOAT32',
					DIM: 768,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.email': {
					AS: 'email',
					type: SchemaFieldTypes.TEXT
				},
				'$.name': {
					AS: 'name',
					type: SchemaFieldTypes.TEXT
				},
				'$.text': {
					AS: 'text',
					type: SchemaFieldTypes.TEXT
				},
				'$.id': {
					AS: 'id',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX: user_id_prefix
			}
		);
	} catch (e) {
		if (e.message !== 'Index already exists') {
			console.error('redis setup error:', e);
		}
	}
};
