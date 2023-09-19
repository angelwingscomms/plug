<script lang="ts">
	import { TextInput, Button, Row, Loading, Modal } from 'carbon-components-svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import type { SearchDocument } from '$lib/types';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import { onMount } from 'svelte';
	import type { Filters as _Filters } from '$lib/types/filter';
	import SearchPagination from '../Search/SearchPagination.svelte';

	export let select = false,
		totalItems: number = 0;
	let loading = false,
		results: SearchDocument<{ name: string }>[] = [],
		search: string,
		searched = false,
		page: number = 1;

	$: get(page);

	onMount(() => search_input_ref.focus());

	let search_input_ref: HTMLInputElement;
	const get = async (page: number) => {
		if (!search) return;
		searched = true;
		loading = true;
		try {
			const r = await axios.post('/user/search', { query: search, page });
			({ total: totalItems, documents: results } = r.data);
		} catch (e: any) {
			notify({ title: `User search error`, subtitle: e.response.data, kind: 'error' });
		}

		loading = false;
	};
</script>

<OnEnter on:enter={() => get(page)} />

<!-- {#if show_filters}
	<Modal passiveModal>
		<Filters />
	</Modal>
{/if} -->

<Row noGutter>
	<TextInput bind:ref={search_input_ref} bind:value={search} />
	<Button size="field" on:click={() => get(page)} iconDescription="Search" icon={Search} />
</Row>

{#if loading}
	<Loading />
{:else if results.length > 0}
	<SearchPagination
		on:select-click
		{select}
		{totalItems}
		on:update={({ detail }) => {
			get(detail.page);
		}}
		{results}
		{page}
	/>
{:else}
	<div class="none">
		<!-- <Button kind="ghost" size="xl" on:click={() => search_input_ref.focus()}> -->
		{searched && !results.length
			? `There don't seem to be any results for your search`
			: 'Search all users'}
		<!-- </Button> -->
	</div>
{/if}

<style lang="sass">
	.none
		display: flex
		align-items: center
		justify-content: center
</style>
