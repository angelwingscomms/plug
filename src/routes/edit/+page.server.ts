import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { client } from "$lib/util/redis";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.getSession()
    console.log('es', session)
    if(!session?.user?.id) throw redirect(303, '/auth')
    const user = await client.json.get(session.user.id)
    if (!user) throw error(404);
    return user
}