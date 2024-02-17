<script lang="ts">
	import { TextInput, PasswordInput, Button } from 'carbon-components-svelte';
	import { notify } from '$lib/util';
	import axios from 'axios';

	let n = true,
		username = '',
		password = '',
		email = '';

	const go = async () => {
		try {
			const res = await axios.post('/auth', { e: email, u: username, p: password });
			if (res.status !== 200) notify(res.data);
		} catch {
			notify({ kind: 'error', title: 'An error occured' });
		}
	};
</script>

{#if n}
	<TextInput required bind:value={email} labelText="email" helperText="for password recovery" />
{/if}
<TextInput bind:value={username} labelText="username" />
<PasswordInput bind:value={password} labelText="password" />
<Button on:click={go}>Go</Button>
<Button on:click={() => (n = !n)}>{n ? 'Login' : 'Register'}</Button>
