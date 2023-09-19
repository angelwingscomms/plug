<script lang="ts">
	import { page } from '$app/stores';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import { notify } from '$lib/util/notify';
	import axios from 'axios';
	import { Button, InlineLoading, TextArea, TextInput } from 'carbon-components-svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	let name = $page.data.name, text = $page.data.text, loading = false;

	const save = async () => {
		loading = true
		try {
			await axios.put(`/edit`, { name, text });
			notify('Saved');
		} catch (e: any) {
			console.error('save error', e);
			notify({ kind: 'error', title: 'Save error' });
		}
		loading = false
	};
</script>

<OnEnter on:enter={save} />

<TextInput bind:value={name} labelText="name" />
<TextArea bind:value={text} labelText="text" />
<Button icon={loading ? InlineLoading : Edit} on:click={save}>Save</Button>
