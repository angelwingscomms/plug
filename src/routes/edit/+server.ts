import { handle_server_error } from "$lib/util/handle_server_error";
import { client } from "$lib/util/redis";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./[email]/$types";
import { EscapedEmail } from "$lib/types";

export const PUT: RequestHandler = async ({ params, request }) => {
    try {
        const res = await client.ft.search('users', `@email:${new EscapedEmail(params.email).value}`)
        console.log('res', res);
        if (!res.total) throw error(404)
        const arg = await request.json()
        for (const key of Object.keys(arg)) {
            client.json.set(res.documents[0].id, `$.${key}`, arg[key])
        }
        return new Response(null, {status: 200})
    } catch (e) {
        throw handle_server_error(request.url, e)
    }
}