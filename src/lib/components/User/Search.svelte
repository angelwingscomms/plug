<script lang="ts">
	import { TextInput, Button, Row, Loading, Modal, InlineLoading } from 'carbon-components-svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
	import type { SearchDocument } from '$lib/types';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import { onMount } from 'svelte';
	import type { Filters as _Filters } from '$lib/types/filter';
	import SearchPagination from '../Search/SearchPagination.svelte';

	export let select = false,
		searched = false,
		totalItems: number = 0;
	let loading = false,
		results: SearchDocument<{ name: string }>[] = [],
		search: string,
		page: number = 1;

	$: get(page);

	onMount(() => search_input_ref.focus());

	let search_input_ref: HTMLInputElement;
	const get = async (page: number) => {
		searched = true;
		if (!search) return;
		searched = true;
		loading = true;
		try {
			const r = await axios.post('/user/search', { query: search, page });
			({ total: totalItems, documents: results } = r.data);
		} catch (e: any) {
			notify({
				title: `User search error`,
				subtitle: e.response.data.message ?? undefined,
				kind: 'error'
			});
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

<div class="input">
	<TextInput bind:ref={search_input_ref} bind:value={search} />
	<Button size="field" on:click={() => get(page)} iconDescription="Search" icon={Search} />
</div>

{#if loading}
	<div class="line line-space">
		<p>Searching</p>
			<InlineLoading />
	</div>
{/if}

{#if searched && results.length < 0}
	<div class="line">
		<!-- <Button kind="ghost" size="xl" on:click={() => search_input_ref.focus()}> -->
		{searched && !results.length
			? `There don't seem to be any results for your search`
			: 'Search all users'}
		<!-- </Button> -->
	</div>
{:else}
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
{/if}

<style lang="sass">
	@use '@carbon/layout'
	.input
		display: flex
		flex-direction: row
	.line-space
		column-gap: layout.$spacing-04
	.line
		display: flex
		align-items: center
		justify-content: center
</style>
