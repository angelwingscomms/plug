import type { PageServerLoad } from "./product/search/$types"

export const load: PageServerLoad = ({ url }) => {
    const q = url.searchParams.get('q')
    return { q }
}