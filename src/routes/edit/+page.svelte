<script lang="ts">
	import { page } from '$app/stores';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import { notify } from '$lib/util/notify';
	import axios from 'axios';
	import { Button, TextArea, TextInput } from 'carbon-components-svelte';
	let name = $page.data.name, text = $page.data.text;

	const save = async () => {
		try {
			await axios.put(`/edit/${$page.data.session?.user?.email}`, { name, text });
			notify('Saved');
		} catch (e: any) {
			console.error('save error', e);
			notify({ kind: 'error', title: 'Save error' });
		}
	};
</script>

<OnEnter on:enter={save} />

<TextInput bind:value={name} labelText="name" />
<TextArea bind:value={text} labelText="Description" />
<Button on:click={save}>Save</Button>
