<script lang="ts">
	import type { SearchDocument } from '$lib/types';
	import { Button, ButtonSet, Loading, Pagination } from 'carbon-components-svelte';
	import { items_per_page } from '$lib/constants';

	export let route: string,
		page: number = 1,
		documents: SearchDocument[],
		total = documents.length;

	let loading = false;
</script>

{#if loading}
	<Loading />
{:else}
	<ButtonSet stacked>
		{#each documents as document}
			<Button kind="ghost" href="/{route}/{document.id}"><div class="similarity">{document.value.similarity}%</div> {document.value.name ?? ''}</Button>
		{/each}
	</ButtonSet>
{/if}

{#if total > items_per_page}
	<Pagination on:update pageSizeInputDisabled pageSize={7} totalItems={total} {page} />
{/if}

<style lang="sass">
	@use "@carbon/colors"
	.similarity
		color: white
		background-color: colors.$blue-60
</style>