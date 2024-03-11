import { client } from '.';
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
		await client.ft.dropIndex(message_index)
		// await client.ft.dropIndex(user_index)
		// const res = await search({ index: message_index, query: `@t:"all"` });
		// console.info('rrsd', res.total)
		// res.documents.forEach((d) => {
		// 	client.json.set(d.id, '$.t', 't');
		// });
				// for (const i of await client.keys(`${user_id_prefix}*`)) {
		// 	const v = await client.json.get(i, { path: 'v' });
		// 	await client.json.set(i, '$.v3072', v);
		// // }
		// for (const i of await client.keys(`a_*`)) {
		// 	// console.info('-i', i)
		// 	await client.json.del(i);
		// 	// const m = await client.json.get(i);
		// 	// await client.json.set(`${message_id_prefix}${i.split('free_message_')[1]}`, '$', m);
		// 	// // await client.json.set(i, '$.v', await );
		// }
		// await client.ft.dropIndex(message_index)
		// await client.ft.dropIndex(user_index)
		// console.info('done');
		// console.log('update done, indices dropped');
		console.info('after pre-setup')
	} catch (e) {
		console.error('pre-setup error', e);
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
				'$.f': {
					AS: 'f',
					type: SchemaFieldTypes.TEXT
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
				'$.u': {
					AS: 'u',
					type: SchemaFieldTypes.TEXT
				},
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
		console.error(`redis create ${message_index} error:`, e);
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
