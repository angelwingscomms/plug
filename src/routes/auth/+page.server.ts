import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async({locals, url}) => {
    const session = await locals.getSession()
    if (session?.user) {
        redirect(302, '/') //TODO 302?
    }
    return {t: url.searchParams.get('t')}
}