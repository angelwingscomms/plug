import { remote } from "./remote"
import { xenova } from "./xenova"

export const embed = async (v: string, b?: boolean) => {
    // return await remote(v, b)
    const r = await xenova(v)
    if (b) {
        return Buffer.from(r.buffer)
    } return r
}