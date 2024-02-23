import { ABLY } from "$env/static/private"
import { Realtime } from "ably"

export const ably = new Realtime.Promise({key: ABLY})

export const message_channel = ably.channels.get("free_message")