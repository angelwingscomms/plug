import { losses } from '@tensorflow/tfjs';
import { user_index } from '$lib/constants';
import { float32_buffer } from '../float32_buffer';
import { search } from '../redis/search';
import { client } from '$lib/util/redis';
import type { V } from '$lib/types';

export const similar = async (id: string) => {
	const {
		'$.v': v_,
		'$.u': u_,
	} = (await client.json.get(id, {
		path: ['$.v', '$.u']
	})) as {
		'$.v': number[][];
		'$.u': string[];
	};
	const embedding = (await client.json.get(id, { path: 'v' })) as V;
	return {
		u: u_[0],
		id: id,
		d: (
			await search<{ u: string; s: number }>({
				//TODO - actually add similarity
				index: user_index,
				page: 1,
				B: float32_buffer(v_[0]),
				options: { RETURN: ['u'] },
				query: `@u:-"${u_[0]}"`
			})
		).documents.map((d) => {
			d.value.s = Number(
				((1 - losses.cosineDistance(embedding, v_[0], 0).dataSync()[0]) * 100).toPrecision(2)
			);
			return d;
		})
	};
};
