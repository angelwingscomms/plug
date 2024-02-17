import { client } from '$lib/util/redis';
import { embed_user } from '../embed_user';

const build_id = async () => `user_id_prefix${await client.incr('last_user_id')}`;

export const eup = async ({ u, e, p }: { u: string; p: string; e: string }) => {
	const id = await build_id()
	const v = await embed_user({ username: u, email: e });
	await client.json.set(id, '$', { u, e, p, v });
	return id
};
