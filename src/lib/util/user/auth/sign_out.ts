import { invalidateAll } from "$app/navigation"
import axios from "axios"

export const sign_out = () => {
    axios.post('/auth/sign_out')
    invalidateAll()
}