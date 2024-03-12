import { user_id_prefix } from '$lib/constants';
import { client } from '$lib/util/redis';

import { embed_user } from '../embed_user';

const build_id = async () => `${user_id_prefix}${await client.incr('last_user_id')}`;

export const eup = async ({ e, u, p }: { u: string; p: string; e: string }) => {
	const id = await build_id();
	const v = await embed_user({ username: u, email: e });
	await client.json.set(id, '$', { e, u, p, v, c: '', t: '', x: 0, h: '', cl: '', ch: '' });
	return id;
};
