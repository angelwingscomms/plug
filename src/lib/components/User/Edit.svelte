<script lang="ts">
	import { page } from '$app/stores';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import { parse } from '$lib/util/markdown/parse/web';
	import { notify } from '$lib/util/notify';
	import { sanitize_object, sanitize_string } from '$lib/util/sanitize';
	import { signOut } from '@auth/sveltekit/client';
	import axios from 'axios';
	import {
		Button,
		ButtonSet,
		InlineLoading,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { createEventDispatcher } from 'svelte';
	let username = $page.data.u,
		contact = $page.data.c,
		email = $page.data.e,
		text = $page.data.t,
		text_invalid: boolean,
		text_invalid_text: string,
		edit_loading = false,
		delete_loading = false;

	const dispatch = createEventDispatcher<{ save: { username: string; html: string } }>();

	const del = async () => {
		if (delete_loading) return;
		delete_loading = true;
		try {
			await axios.delete('/edit');
			notify('Profile deleted');
			signOut();
		} catch (e: any) {
			console.error('delete error', e);
			notify({
				kind: 'error',
				title: 'Delete error',
				subtitle: e.response.data.message ? e.response.data.message : undefined
			});
		}
		delete_loading = false;
	};

	const save = async () => {
		if (edit_loading) return;
		edit_loading = true;
		try {
			let payload = sanitize_object({ c: contact, u: username, t: text, e: email });
			const html = await parse(payload.c as string);
			payload.h = sanitize_string(html);
			await axios.put(`/edit`, payload);
			dispatch('save', { username, html: payload.html });
			notify('Saved');
		} catch (e: any) {
			console.error('save error', e);
			if (e === 'timeout') {
				text_invalid_text = 'Use less text';
				text_invalid = true;
			} else {
				notify({
					kind: 'error',
					title: 'Save error',
					subtitle: e.response.data.message ? e.response.data.message : e.toString() || undefined
				});
			}
		}
		edit_loading = false;
	};
</script>

<OnEnter ctrl on:enter={save} />

<div class="input">
	<TextInput labelText="username" bind:value={username} />
	<TextInput labelText="email" bind:value={email} />
	<TextArea labelText="Contact details" bind:value={contact} rows={3} />
	<TextArea
		rows={15}
		labelText="Describe yourself as vividly as you like"
		placeholder="So other users can easily find you. Describe yourself in detail, your username, your country/state/town, your likes and dislikes your personality, your hobbies, your experience, likes and dislikes, and so on"
		invalid={text_invalid}
		invalidText={text_invalid_text}
		bind:value={text}
	/>
</div>
<ButtonSet stacked>
	<Button disabled={edit_loading} icon={edit_loading ? InlineLoading : Save} on:click={save}
		>Save</Button
	>
	<Button disabled={delete_loading} icon={delete_loading ? InlineLoading : TrashCan} on:click={del}
		>Delete Profile</Button
	>
</ButtonSet>

<style lang="sass">
	@use "@carbon/layout"
	.input
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-03
</style>
