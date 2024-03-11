import { client } from '$lib/util/redis';
import { error, redirect } from '@sveltejs/kit';
import IBM from 'ibm-cos-sdk';
import type { Actions, PageServerLoad } from './$types';
import { IBMCOS_APIKEY, IBMCOS_ENDPOINT, IBMCOS_SERVICE_INSTANCE_ID } from '$env/static/private';
import { handle_server_error } from '$lib/util/handle_server_error';
import type { Product } from '$lib/types/product';
import { embed } from '$lib/util/embedding/embed';
import { tagflow } from '$lib/util/product/tagflow';

export const load: PageServerLoad = async ({ params }) => {
	const p = (await client.json.get(params.id, { path: ['n', 'p', 'i', 'ii', 'a'] })) as Product;
	if (!p) throw error(404, `product with id "${params.id}" not found`);
	return { p };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		try {
			if (!(await client.exists(params.id)))
				throw error(404, `product with id "${params.id}" not found`);
			const data = await request.formData();
			const n = String(data.get('n') || '');
			const a = String(data.get('a') || '');
			const p = String(data.get('p') || '');
			// const c = String(data.get('c') || '');
			const i = data.get('i') as File;
			console.debug('--i', i)
			const ii = data.getAll('ii') as File[];
			console.debug('--ii', ii)

			const cos = new IBM.S3({
				endpoint: IBMCOS_ENDPOINT,
				apiKeyId: IBMCOS_APIKEY,
				serviceInstanceId: IBMCOS_SERVICE_INSTANCE_ID
			});

			const uploaded_images: string[] = [];

			const uploaded_display_image = i.size
				? await cos
						.upload({
							Bucket: 'unimart',
							Key: String(await client.incr('last_ibm_cos_object_id')),
							Body: Buffer.from(await (i as File).arrayBuffer())
						})
						.promise()
				: undefined;

			for (let i = ii.length - 1; i > -1; i--) {
				if (!ii[i].size) continue
				const res = await cos
					.upload({
						Bucket: 'unimart',
						Key: String(await client.incr('last_ibm_cos_object_id')),
						Body: Buffer.from(await (ii[i] as File).arrayBuffer())
					})
					.promise();
				uploaded_images.push(res.Location);
			}
			await tagflow(params.id, a)
			const v = await embed(JSON.stringify({ name: n, about: a, price: `${p}` }));
			await client.json.set(params.id, '$.n', n);
			if (uploaded_display_image)
				await client.json.set(params.id, '$.i', uploaded_display_image.Location);
			if (uploaded_images.length) await client.json.set(params.id, '$.i', uploaded_images);
			await client.json.set(params.id, '$.a', a);
			await client.json.set(params.id, '$.p', p);
			await client.json.set(params.id, '$.v', v);
			throw redirect(302, `/product/${params.id}`);
		} catch (e) {
			throw handle_server_error(request, e);
		}
	}
};
