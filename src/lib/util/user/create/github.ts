import { user_id_prefix } from "$lib/constants";
import { escape_email } from "$lib/util/escape_email";
import { client } from "$lib/util/redis";
import type { CallbacksOptions } from "@auth/core/types";

const build_id = (id: string) => user_id_prefix.concat(id);

export const github = async (arg: Parameters<CallbacksOptions['signIn']>[0]) => {
    if (!arg.profile?.id || !arg.profile?.email) return
    const id = build_id(arg.profile.id)
    if (await client.exists(id)) return
    client.json.set(id, '$', {
        login: arg.profile.login,
        email: escape_email(arg.profile.email),
        provider: arg.account?.provider
    })
}