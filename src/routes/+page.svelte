<script lang="ts">
	import List from '$lib/components/item/List.svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import { Button } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<List q={data.q} documents={data.d}>
	<h3>Simple Shopping. Connect with buyers and sellers with ease. Discover unique items</h3>
	<Button href="/i/add" icon={Add}>Add an item</Button>
</List>
