import { EscapedEmail } from "$lib/types";
import { get } from "$lib/util/user/get";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.getSession()
    if(!session?.user?.email) throw redirect(302, '/auth')
    const user = await get(new EscapedEmail(session.user.email));
    if (!user) throw error(404);
    return {...user}
}