import { user_index } from '$lib/constants';
import { float32_buffer } from '../float32_buffer';
import { search } from '../redis/search';
import { client } from '$lib/util/redis';

export const similar = async (id: string) => {
	const {
		'$.v': v_,
		'$.u': u_,
		'$.e': e_
	} = (await client.json.get(id, {
		path: ['$.v', '$.u', '$.e']
	})) as {
		'$.v': number[][];
		'$.u': string[];
		'$.e': string[];
	};
	return {
		u: u_[0],
		id: id,
		d: (
			await search<{ u: string, s: number }>({ //TODO - actually add similarity
				index: user_index, 
				page: 1,
				B: float32_buffer(v_[0]),
				options: { RETURN: ['u'] },
				query: `@e:-"${e_[0]}"`
			})
		).documents
	};
};
