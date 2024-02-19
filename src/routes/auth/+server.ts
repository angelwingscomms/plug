import { user_index } from '$lib/constants/index.js';
import { handle_server_error } from '$lib/util/handle_server_error.js';
import { client } from '$lib/util/redis/index.js';
import { eup } from '$lib/util/user/create/eup.js';
import { hash, verify } from 'argon2';
import { code } from '$lib/util/user/auth/check';
import { search } from '$lib/util/redis/search';
import type { Cookies } from '@sveltejs/kit';
   
const login = ({ cookies, locals, id }: { cookies: Cookies; locals: App.Locals; id: string }) => {
	cookies.set('code', `${code(id)}`, { path: '/' });
	locals.user = id;
};

// const hash_password = (p: string) => hash(p, { secret: Buffer.from(SECRET) });

export const POST = async ({ cookies, request, locals }) => {
	try {
		const { e, u, p } = await request.json();
		if (e) {
			const res = await client.ft.search(user_index, `@u:"${u}"`, {
				LIMIT: { from: 0, size: 1 }
			});
			if (res.total) return new Response('user already exists');
			const password_hash = await hash(p);
			const id = await eup({ e, u, p: password_hash });
			login({ cookies, locals, id });
			return new Response();
		} else {
			const res = await search<{ u: string; p: string }>({
				index: user_index,
				query: `@u:"${u}"`,
				page: 0,
				options: { LIMIT: { from: 0, size: 1 }, RETURN: ['u', 'p'] }
			});
			if (!res.total) return new Response('user not found');
			const user = res.documents[0];
			if (!(await verify(user.value.p, p))) {
				return new Response('wrong password');
			}
			login({ cookies, locals, id: user.id });
			return new Response();
		}
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
