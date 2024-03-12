<script lang="ts">
	import List from '$lib/components/item/List.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<List q={data.q} documents={data.d} params={{ u: data.u }}>
	<h3>Items by {data.uf}</h3>
</List>
