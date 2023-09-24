import { client } from '.';
import { user_id_prefix } from '$lib/constants';

export const setup = async () => {
	try {
		// for (const k of await client.keys("user_*")) {
		// 	const res = await client.json.get(k, { path: '$.text' })
		// 	console.log(res, res[0])
		// 	const text = res[0] ? res[0] : ''
		// 	client.json.set(k, '$.v', float32_buffer(await xenova(text)))
		// }
		// await client.ft.dropIndex('users')
		// await client.ft.create(
		// 	'users',
		// 	{
		// 		'$.v': {
		// 			AS: 'v',
		// 			type: SchemaFieldTypes.VECTOR,
		// 			ALGORITHM: VectorAlgorithms.HNSW,
		// 			TYPE: 'FLOAT32',
		// 			DIM: 768,
		// 			DISTANCE_METRIC: 'COSINE'
		// 		},
		// 		'$.email': {
		// 			AS: 'email',
		// 			type: SchemaFieldTypes.TEXT
		// 		},
		// 		'$.name': {
		// 			AS: 'name',
		// 			type: SchemaFieldTypes.TEXT
		// 		},
		// 		'$.text': {
		// 			AS: 'text',
		// 			type: SchemaFieldTypes.TEXT
		// 		},
		// 		'$.id': {
		// 			AS: 'id',
		// 			type: SchemaFieldTypes.TEXT
		// 		}
		// 	},
		// 	{
		// 		ON: 'JSON',
		// 		PREFIX: user_id_prefix,
		// 		NOHL: true,
		// 		NOFREQS: true,
		// 		SKIPINITIALSCAN: false
		// 	}
		// );
		const res = await client.sendCommand([
			'FT.CREATE',
			'users',
			'ON',
			'JSON',
			'PREFIX',
			'1',
			user_id_prefix,
			'NOHL',
			'NOFREQS',
			'SCHEMA',
			'$.v',
			'AS',
			'v',
			'VECTOR',
			'FLAT',
			'6',
			'TYPE',
			'FLOAT32',
			'DIM',
			'768',
			'DISTANCE_METRIC',
			'COSINE',
			'$.email',
			'AS',
			'email',
			'TEXT',
			'$.name',
			'AS',
			'name',
			'TEXT',
			// 'NONINDEX'
		]);
		console.log('scr', res)
	} catch (e) {
		// if (e.message !== 'Index already exists') {
			console.error('redis setup error:', e);
		// }
	}
};
