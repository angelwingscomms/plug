<script>
	import { Loading } from 'carbon-components-svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { onMount } from 'svelte';
	onMount(() => signIn('google'));
</script>

<Loading />
