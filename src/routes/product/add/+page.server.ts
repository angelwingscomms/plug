import { client } from '$lib/util/redis';
import { redirect } from '@sveltejs/kit';
import IBM from 'ibm-cos-sdk';
import type { Actions } from './$types';
import { IBMCOS_APIKEY, IBMCOS_ENDPOINT, IBMCOS_SERVICE_INSTANCE_ID } from '$env/static/private';
import { message_id_prefix } from '$lib/constants';
import { handle_server_error } from '$lib/util/handle_server_error';
// import { tagflow } from '$lib/util/product/tagflow';
import { embed } from '$lib/util/embedding/embed';
import { sanitize_string } from '$lib/util/sanitize';
import { parse } from '$lib/util/markdown/parse/node';
import { to_html } from '$lib/util/markdown/parse';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const n = sanitize_string(String(data.get('n') || ''));
			const a = sanitize_string(String(data.get('a') || ''));
			// const c = String(data.get('c') || '');
			const p = sanitize_string( String(data.get('p') || ''));
			const i = data.get('i') as unknown as number;
			const ii = data.getAll('ii');

			const id = `${message_id_prefix}${await client.incr('last_free_message_id')}`;

			const cos = new IBM.S3({
				endpoint: IBMCOS_ENDPOINT,
				apiKeyId: IBMCOS_APIKEY,
				serviceInstanceId: IBMCOS_SERVICE_INSTANCE_ID
			});

			const uploaded_images: string[] = [];

			// const uploaded_display_image = await cos
			// 	.upload({
			// 		Bucket: 'unimart',
			// 		Key: String(await client.incr('last_ibm_cos_object_id')),
			// 		Body: Buffer.from(await (i as File).arrayBuffer())
			// 	})
			// 	.promise();

			for (let i = ii.length - 1; i > -1; i--) {
				console.log(i, ii[i]);
				const res = await cos
					.upload({
						Bucket: 'unimart',
						Key: String(await client.incr('last_ibm_cos_object_id')),
						Body: Buffer.from(await (ii[i] as File).arrayBuffer())
					})
					.promise();
				uploaded_images.push(res.Location);
			}

			const v = await embed(JSON.stringify({ name: n, about: a }));
			await client.json.set(id, '$', {
				u: locals.user,
				n,
				a,
				h: sanitize_string(await to_html(a)),
				v,
				ii: uploaded_images,
				i: uploaded_images[i],
				p,
				k: 'p'
			});

			// await tagflow(id, a)
			throw redirect(302, `/product/${id}`);
		} catch (e) {
			throw handle_server_error(request, e)
		}
	}
};
