import { user_id_prefix } from '$lib/constants';
import { escape_email } from '$lib/util/escape_email';
import { client } from '$lib/util/redis';
import type { SignInArg } from '.';

const build_id = (id: string) => user_id_prefix.concat(id);

export const github = async (arg: SignInArg) => {
	const id = build_id(arg.profile?.id as string);
	if (await client.exists(id)) {
		await client.json.set(id, '$.login', arg.profile?.login as string);
		await client.json.set(id, '$.name', arg.profile?.name as string);
		await client.json.set(id, '$.email', escape_email(arg.profile?.email as string));
		await client.json.set(id, '$.provider', arg.account?.provider as string);
	} else
		await client.json.set(id, '$', {
			login: (arg.profile?.login as string) ?? null,
			name: arg.profile?.name ?? null,
			email: escape_email(arg.profile?.email ?? ''),
			provider: arg.account?.provider ?? null
		});
};
