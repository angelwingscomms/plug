import type { RedisKey } from '$lib/types';
import type { Edit } from '$lib/types/post';
import { get } from '$lib/util/redis/get';

export const get_root_id = async (id: string): Promise<RedisKey | null> =>
	get<{ edit: Edit }>(id, ['$.edit.to']).then((r) => (r.edit ? r.edit.to : id));
