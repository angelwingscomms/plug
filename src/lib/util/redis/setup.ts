import { posts_index_name } from '$lib/constants';
import { SchemaFieldTypes, VectorAlgorithms } from 'redis';
import { client } from '.';

export const setup = async () => {
	try {
		await client.ft.info(posts_index_name); // TODO-more-reliable
	} catch (e) {
		if (e.message === 'Unknown Index name') {
			try {
				// await client.ft.dropIndex(posts_index_name);
				await client.ft.create(
					posts_index_name,
					{
						'$.v': {
							AS: 'v',
							type: SchemaFieldTypes.VECTOR,
							ALGORITHM: VectorAlgorithms.HNSW,
							TYPE: 'FLOAT32',
							DIM: 1536,
							DISTANCE_METRIC: 'COSINE'
						},
						'$.name': {
							AS: 'name',
							type: SchemaFieldTypes.TEXT
						},
						'$.payment.required': {
							AS: 'payment_required',
							type: SchemaFieldTypes.TAG,
							SORTABLE: true
						},
						'$.requires_payment': {
							AS: 'requires_payment',
							type: SchemaFieldTypes.TAG,
							SORTABLE: true
						},
						'$.replies': {
							AS: 'replies.*',
							type: SchemaFieldTypes.TAG,
							SEPARATOR: ';'
						},
						'$.replied': {
							AS: 'replied.*',
							type: SchemaFieldTypes.TAG,
							SEPARATOR: ';'
						},
						'$.id': {
							AS: 'id',
							type: SchemaFieldTypes.TEXT
						},
						'$.created': {
							AS: 'created',
							type: SchemaFieldTypes.NUMERIC
						},
						'$.updated': {
							AS: 'updated',
							type: SchemaFieldTypes.NUMERIC
						},
						'$.users': {
							AS: 'users',
							type: SchemaFieldTypes.TAG,
							SEPARATOR: ';'
						},
						'$.is_root': {
							AS: 'is_root',
							type: SchemaFieldTypes.TAG,
							SORTABLE: true
						},
						'$.edit.to': {
							AS: 'edit_to',
							type: SchemaFieldTypes.TEXT
						},
						'$.creator': {
							AS: 'creator',
							type: SchemaFieldTypes.TEXT
						},
						'$.allow_replies': {
							AS: 'allow_replies',
							type: SchemaFieldTypes.TAG,
							SORTABLE: true
						},
						'$.allow_user_replies': {
							AS: 'allow_user_replies',
							type: SchemaFieldTypes.TAG,
							SORTABLE: true
						},
						'$.allow_self_replies': {
							AS: 'allow_self_replies',
							type: SchemaFieldTypes.TAG,
							SORTABLE: true
						},
						'$.private': {
							AS: 'private',
							type: SchemaFieldTypes.TAG,
							SORTABLE: true
						}
					},
					{
						ON: 'JSON',
						PREFIX: posts_index_name
					}
				);
			} catch (e) {
				console.error(e);
				process.exit(1);
			}
		}
	}
};
