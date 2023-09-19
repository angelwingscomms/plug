import type { EscapedEmail } from "$lib/types";
import { client } from "../redis";

export const get = async (email: EscapedEmail) => {
	const res = await client.ft.search('users', `@email:${email.value}`);
	if (!res.total) return;
	return {
		name: res.documents[0].value.name,
		text: res.documents[0].value.text
	};
}