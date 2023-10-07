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
		FluidForm,
		InlineLoading,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { createEventDispatcher } from 'svelte';
	let name = $page.data.name,
		text = $page.data.text,
		text_invalid: boolean,
		text_invalid_text: string,
		edit_loading = false,
		delete_loading = false;

	const dispatch = createEventDispatcher<{ save: { name: string; html: string } }>();

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
			let payload = sanitize_object({ n: name, t: text });
			const html = await parse(payload.t as string);
			payload.h = sanitize_string(html);
			console.debug(payload);
			await axios.put(`/edit`, payload);
			dispatch('save', { name, html: payload.html });
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

<FluidForm>
	<TextInput hideLabel bind:value={name} />
	<TextArea
		rows={15}
		placeholder="So other users can easily find you. Describe yourself in detail, Your self, your personality, your hobbies, your experience, likes and dislikes, and so on. Use markdown if you want. Add your contacts so other users can reach you. Use country codes (starting with the plus sign) for phone numbers"
		invalid={text_invalid}
		invalidText={text_invalid_text}
		bind:value={text}
	/>
</FluidForm>
<ButtonSet stacked>
	<Button disabled={edit_loading} icon={edit_loading ? InlineLoading : Save} on:click={save}
		>Save</Button
	>
	<Button disabled={delete_loading} icon={delete_loading ? InlineLoading : TrashCan} on:click={del}
		>Delete Profile</Button
	>
</ButtonSet>
