import { client } from '.';
// import fs from 'fs';
import {
	embedding_dimension,
	message_id_prefix,
	message_index,
	tag_id_prefix,
	tag_index,
	user_id_prefix,
	user_index
} from '$lib/constants';
import { SchemaFieldTypes, VectorAlgorithms } from 'redis';
// import { search } from './search';

export const setup = async () => {
	console.debug('--setup');

	// pre-setup
	try {
		console.info('after pre-setup');
	} catch (e) {
		console.error('pre-setup error', e);
	}

	// bid
	// create message_index
	try {
		await client.ft.create(
			message_index,
			{
				// '$.v': {
				// 	AS: 'v',
				// 	type: SchemaFieldTypes.VECTOR,
				// 	ALGORITHM: VectorAlgorithms.FLAT,
				// 	TYPE: 'FLOAT32',
				// 	DIM: embedding_dimension,
				// 	DISTANCE_METRIC: 'COSINE'
				// },
				// '$.t': {
				// 	AS: 't',
				// 	type: SchemaFieldTypes.TEXT
				// },
				// '$.k': {
				// 	AS: 'k',
				// 	type: SchemaFieldTypes.TEXT
				// },
				// '$.n': {
				// 	AS: 'n',
				// 	type: SchemaFieldTypes.TEXT
				// },
				'$.i': {
					AS: 'i',
					type: SchemaFieldTypes.TEXT
				},
				'$.p': {
					AS: 'p',
					type: SchemaFieldTypes.TEXT
				},
				'$.d': {
					AS: 'd',
					type: SchemaFieldTypes.NUMERIC,
					SORTABLE: true,
					NOINDEX: true
				},
				// '$.c': {
				// 	AS: 'c',
				// 	type: SchemaFieldTypes.TEXT,
				// 	NOINDEX: true
				// },
				// '$.h': {
				// 	AS: 'h',
				// 	type: SchemaFieldTypes.TEXT,
				// 	NOINDEX: true
				// },
				// '$.s': {
				// 	AS: 's',
				// 	type: SchemaFieldTypes.NUMERIC,
				// 	SORTABLE: true,
				// 	NOINDEX: true
				// },
				'$.u': {
					AS: 'u',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX: message_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error(`redis create ${message_index} error:`, e);
	}

	// create message_index
	try {
		await client.ft.create(
			message_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: embedding_dimension,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.t': {
					AS: 't',
					type: SchemaFieldTypes.TEXT
				},
				'$.k': {
					AS: 'k',
					type: SchemaFieldTypes.TEXT
				},
				'$.n': {
					AS: 'n',
					type: SchemaFieldTypes.TEXT
				},
				'$.i': {
					AS: 'i',
					type: SchemaFieldTypes.TEXT
				},
				'$.p': {
					AS: 'p',
					type: SchemaFieldTypes.TEXT
				},
				'$.d': {
					AS: 'd',
					type: SchemaFieldTypes.NUMERIC,
					SORTABLE: true,
					NOINDEX: true
				},
				'$.c': {
					AS: 'c',
					type: SchemaFieldTypes.TEXT,
					NOINDEX: true
				},
				'$.h': {
					AS: 'h',
					type: SchemaFieldTypes.TEXT,
					NOINDEX: true
				},
				'$.s': {
					AS: 's',
					type: SchemaFieldTypes.NUMERIC,
					SORTABLE: true,
					NOINDEX: true
				},
				'$.u': {
					AS: 'u',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX: message_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error(`redis create ${message_index} error:`, e);
	}

	// create tag_index
	try {
		await client.ft.create(
			tag_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: embedding_dimension,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.t': {
					AS: 't',
					type: SchemaFieldTypes.TEXT
				}
			},
			{
				ON: 'JSON',
				PREFIX: tag_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error(`redis create ${tag_index} error:`, e);
	}

	// create user_index
	try {
		await client.ft.create(
			user_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: embedding_dimension,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.u': {
					AS: 'u',
					type: SchemaFieldTypes.TEXT
				},
				'$.p': {
					AS: 'p',
					type: SchemaFieldTypes.TEXT
				},
				'$.cl': {
					AS: 'cl',
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
		console.error(`redis create ${user_index} error:`, e);
	}
};
