<script lang="ts">
	import type { PostSearchDocument } from '$lib/types';
	import { Loading, Pagination } from 'carbon-components-svelte';
	import Results from './Results.svelte';
	import { items_per_page } from '$lib/constants';

	export let page: number = 1,
		totalItems: number,
		results: PostSearchDocument[];

	let loading = false;
</script>

{#if loading}
	<Loading />
{:else}
	<Results {results} />
{/if}

{#if totalItems > items_per_page}
	<Pagination on:update pageSizeInputDisabled pageSize={7} {totalItems} {page} />
{/if}
