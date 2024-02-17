<script lang="ts">
	import { TextInput, PasswordInput, Button, ButtonSet } from 'carbon-components-svelte';
	import { notify } from '$lib/util';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	let n = true,
		email_invalid = false,
		username = '',
		password = '',
		email = '';

	const go = async () => {
		if (n && !email) {
			email_invalid = true;
			return;
		}
		try {
			const res = await axios.post('/auth', { ...(n && { e: email }), u: username, p: password });
			if (res.status !== 200) notify(res.data);
			goto(n ? '/edit' : '/');
		} catch {
			notify({ kind: 'error', title: 'An error occured' });
		}
	};
</script>

{#if n}
	<TextInput
		invalid={email_invalid}
		on:input={() => email_invalid = false}
		invalidText="Email required"
		required
		bind:value={email}
		labelText="email"
	/>
{/if}
<div class="all">
	<TextInput bind:value={username} labelText="username" />
	<PasswordInput bind:value={password} labelText="password" />
	<ButtonSet stacked>
		<Button on:click={go}>go</Button>
		<Button kind="ghost" on:click={() => (n = !n)}>{n ? 'existing user' : 'new User'}</Button>
	</ButtonSet>
</div>

<style lang="sass">
	@use "@carbon/layout"

	.all
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-06
</style>
