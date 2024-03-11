<script lang="ts">
	import {
		TextInput,
		PasswordInput,
		InlineLoading,
		Button,
		ButtonSet,
		InlineNotification
	} from 'carbon-components-svelte';
	import { Send } from 'carbon-icons-svelte';
	import { notify } from '$lib/util';
	import { invalidateAll } from '$app/navigation';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let n = data.n,
		email_invalid = false,
		error = '',
		loading = false,
		username = '',
		password = '',
		email = '';

	const send = async () => {
		if (n && !email) {
			email_invalid = true;
			return;
		}
		try {
			const res = await axios.post('/auth', { ...(n && { e: email }), u: username, p: password });
			if (res.data) {
				error = res.data;
				return;
			}
			await invalidateAll();
			goto(data.t ? data.t : n ? '/edit' : '/');
		} catch {
			notify({ kind: 'error', title: 'An error occured' });
		}
	};

	const go = async () => {
		loading = true;
		await send();
		loading = false;
	};
</script>

<div class="all">
	<h3>
		{data.t
			? n
				? 'Create an account to continue'
				: 'Sign in to continue'
			: n
				? 'Create an account'
				: 'Sign in'}
	</h3>
	{#if error}
		<InlineNotification kind="error" title={error} />
	{/if}

	{#if n}
		<TextInput
			invalid={email_invalid}
			on:input={() => {
				email_invalid = false;
				error = '';
			}}
			invalidText="Email required"
			required
			bind:value={email}
			labelText="email"
		/>
	{/if}
	<TextInput
		on:input={() => (error = '')}
		bind:value={username}
		labelText={n ? 'create a username' : 'username'}
	/>
	<PasswordInput
		on:input={() => (error = '')}
		bind:value={password}
		labelText={n ? 'create a password' : 'password'}
	/>
	<ButtonSet stacked>
		<Button icon={loading ? InlineLoading : Send} on:click={go}
			>{n ? 'create account' : 'sign in'}</Button
		>
		<Button kind="ghost" on:click={() => (n = !n)}
			>{n ? 'sign in to an existing account' : 'create a new account'}</Button
		>
	</ButtonSet>
</div>

<style lang="sass">
	@use "@carbon/layout"

	.all
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-06
</style>
