<script lang="ts">
	import type { SearchDocument } from '$lib/types';
	import {
		Button,
		ButtonSet,
		Loading,
		Pagination,
	} from 'carbon-components-svelte';
	import { items_per_page } from '$lib/constants';

	export let route: string,
		page: number = 1,
		f: string,
		documents: SearchDocument<{ s: number; } & any>[],
		total = documents.length;

	const headers = [
		{ key: 's', value: 'closeness' },
		{ key: 'u', value: 'username' }
	];
	let loading = false;
</script>

{#if loading}
	<Loading />
{:else}
	<!-- <DataTable {headers} rows={documents}>
		<svelte:fragment slot="cell" let:row let:cell>
			{#if cell.key === 'u'}
				<Link href="/{route}/{cell.value.id}">{cell.value.value.u}</Link>
			{:else}{cell.value.value.s}{/if}
		</svelte:fragment>
	</DataTable> -->
	<ButtonSet stacked>
		{#each documents as document}
			<Button kind="ghost" href="/{route}/{document.id}"
				><div class="s">{document.value.s}% match</div>
				{@html document.value[f] ?? ''}</Button
			>
		{/each}
	</ButtonSet>
{/if}

{#if total > items_per_page}
	<Pagination on:update pageSizeInputDisabled pageSize={7} totalItems={total} {page} />
{/if}

<style lang="sass">
	@use "@carbon/colors"
	.s
		color: colors.$blue-40
</style>
