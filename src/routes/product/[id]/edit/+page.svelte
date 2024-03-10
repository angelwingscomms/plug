<script lang="ts">
	import Edit from '$lib/components/product/Edit.svelte';
	import { type PageData } from './$types';
	export let data: PageData;
</script>

<Edit p={data.p} />
