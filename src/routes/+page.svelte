<script lang="ts">
	import List from '$lib/components/item/List.svelte';
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import { Button } from 'carbon-components-svelte';
	import type { PageData } from './$types';
</script>

<p class="say">Simple Shopping. Connect with buyers and sellers with ease. Discover unique items</p>
<Button href="/i/add" icon={Add}>Add an item</Button>

<p class="say">chat with sellers</p>
<Button href="/i/add" icon={Add}>find sellers</Button>

<p class="say">Connect in communities</p>
<Button href="/m" icon={Add}>see communities</Button>

<List />