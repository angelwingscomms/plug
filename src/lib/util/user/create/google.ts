import { client } from '$lib/util/redis';
import type { CallbacksOptions } from '@auth/core/types';
import { email as check_email_exists } from '$lib/util/user/exists/email';
import { EscapedEmail } from '$lib/types';
import { user_id_prefix } from '$lib/constants';

export const google = async (arg: Parameters<CallbacksOptions['signIn']>[0]) => {
	if (!arg.profile?.email) return;
	const email = new EscapedEmail(arg.profile.email);
	if (await check_email_exists(email)) return;
	const id = user_id_prefix.concat((await client.incr('last_user_id')).toString());
	client.json.set(id, '$', {
		email: email.value,
		name: arg.profile?.name ?? ''
	});
};
