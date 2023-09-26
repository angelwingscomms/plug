import { signIn } from '@auth/sveltekit/client';
import type { PageLoad } from './$types';
export const ssr = false;
export const csr = false;

export const load: PageLoad = () => {
	signIn('google');
};
