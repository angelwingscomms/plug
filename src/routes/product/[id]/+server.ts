import { client } from "$lib/util/redis"
import { error, json, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async({params}) => {
    try {
        return json(await client.json.get(params.id as string))
    } catch (e) {
        console.error(e)
        throw error(500)
    }
}

export const DELETE: RequestHandler = async({params}) => {
    try {
        await client.json.del(params.id as string)
        return new Response()
    } catch (e) {
        console.error(e)
        throw error(500)
    }
}

// export const PUT: RequestHandler = async({request}) => {
//     try{
//         const args = await request.json()
//         for (let k of Object.entries(args)) {
//             await client.json.set(id, `$.{k}`, v)
//         }
//         return new Response()
//     } catch {
//         console.error(e)
//         throw error(500)
//     }
// }