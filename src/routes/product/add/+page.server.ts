import { client } from '$lib/util/redis';
import { redirect } from '@sveltejs/kit';
import IBM from 'ibm-cos-sdk';
import type { Actions } from './$types';
import { IBMCOS_APIKEY, IBMCOS_ENDPOINT, IBMCOS_SERVICE_INSTANCE_ID } from '$env/static/private';
import { message_id_prefix } from '$lib/constants';
import { handle_server_error } from '$lib/util/handle_server_error';
import { tagflow } from '$lib/util/product/tagflow';
import { embed } from '$lib/util/embedding/embed';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		try {
			const data = await request.formData();
			const n = String(data.get('n') || '');
			const a = String(data.get('a') || '');
			// const c = String(data.get('c') || '');
			const p = String(data.get('p') || '');
			const i = data.get('i');
			const ii = data.getAll('ii');

			const id = `${message_id_prefix}${await client.incr('last_free_message_id')}`;

			const cos = new IBM.S3({
				endpoint: IBMCOS_ENDPOINT,
				apiKeyId: IBMCOS_APIKEY,
				serviceInstanceId: IBMCOS_SERVICE_INSTANCE_ID
			});

			const uploaded_images: object[] = [];

			const uploaded_display_image = await cos
				.upload({
					Bucket: 'unimart',
					Key: String(await client.incr('last_ibm_cos_object_id')),
					Body: Buffer.from(await (i as File).arrayBuffer())
				})
				.promise();

			for (let i = ii.length - 1; i > -1; i--) {
				console.log(i, ii[i]);
				const res = await cos
					.upload({
						Bucket: 'unimart',
						Key: String(await client.incr('last_ibm_cos_object_id')),
						Body: Buffer.from(await (ii[i] as File).arrayBuffer())
					})
					.promise();
				uploaded_images.push(res);
			}

			const v = await embed(JSON.stringify({ name: n, about: a }));
			console.info('--v.l', v.length)
			await client.json.set(id, '$', {
				u: locals.user,
				n,
				a,
				v,
				ii: uploaded_images.map(i => i.Location),
				i: uploaded_display_image.Location,
				p,
				k: 'p'
			});

			await tagflow(id, a)
			throw redirect(302, `/product/${id}`);
		} catch (e) {
			throw handle_server_error(request, e)
		}
	}
};
