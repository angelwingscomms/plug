<script lang="ts">
	import { Link, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import List from '$lib/components/item/List.svelte';

	export let data: PageData;
</script>

<List search={false}>
	<p>Similar items to <Link href="/i/{data.id}">{data.n}</Link></p>
</List>
