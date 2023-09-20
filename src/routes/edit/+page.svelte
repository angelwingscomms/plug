<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import { notify } from '$lib/util/notify';
	import { sanitize_object, sanitize_string } from '$lib/util/sanitize';
	import axios from 'axios';
	import { Button, InlineLoading, TextArea, TextInput } from 'carbon-components-svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { parse } from 'svelte/compiler';
	let name = $page.data.name,
		text = $page.data.text,
		edit_loading = false,
		delete_loading = false;

	const del = async () => {
		delete_loading = true;
		try {
			await axios.delete('/edit');
			notify('Account deleted');
			goto('/');
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
		edit_loading = true;
		let payload
		try {
			payload = sanitize_object({name, text})
			const html = await parse(payload.text as string)
			payload.html = sanitize_string(html)
		} catch (e) {
			if (e === 'timeout') {
				notify
			}
		}
		try {
			await axios.put(`/edit`, { name, text });
			notify('Saved');
		} catch (e: any) {
			console.error('save error', e);
			notify({
				kind: 'error',
				title: 'Save error',
				subtitle: e.response.data.message ? e.response.data.message : undefined
			});
		}
		edit_loading = false;
	};
</script>

<OnEnter on:enter={save} />

<TextInput bind:value={name} labelText="name" />
<TextArea bind:value={text} labelText="text" />
<Button icon={edit_loading ? InlineLoading : Edit} on:click={save}>Save</Button>
<Button icon={delete_loading ? InlineLoading : TrashCan} on:click={del}>Delete Account</Button>
