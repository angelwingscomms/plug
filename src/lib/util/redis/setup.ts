import { SchemaFieldTypes, VectorAlgorithms } from 'redis';
import { client } from '.';
import { user_id_prefix } from '$lib/constants';
// import { unescape_email } from '../unescape_email';
// import { EscapedEmail } from '$lib/types';

export const setup = async () => {
	try {
		// const ur = (await client.json.get('user_test_key')).email;
		// console.log('ss', unescape_email(ur))
		// await client.ft.dropIndex('users')
		// console.log(
		// 	'rera',
		// 	await client.json.set('user_test_key', '$', {
		// 		email: new EscapedEmail('-ed_ge,3769@gmail.com').value
		// 	})
		// );
		// const escaped_email = new EscapedEmail('-ed_ge,3769@gmail.com')
		// console.log('ee', escaped_email.value)
		// console.log('sds', await client.ft.search(user_index, `@email:${escaped_email.value}`))
		await client.ft.create(
			'users',
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.HNSW,
					TYPE: 'FLOAT32',
					DIM: 1536,
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
		// if (e.message !== 'Index already exists') {
			console.error('redis setup error:', e)
		// 	process.exit(1)
		// }
	}
};
