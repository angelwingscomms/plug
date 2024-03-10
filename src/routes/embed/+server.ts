import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { embed } from "$lib/util/embedding/embed";

export const POST: RequestHandler = async({request}) => {
    const text = await request.text()
    const res = await embed(text)
    console.debug(res)
    return json(res)
    // return json(res)
}