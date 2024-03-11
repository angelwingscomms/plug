<script lang="ts">
	import Product from '$lib/components/ProductListing.svelte';
	import axios from 'axios';
	import { Button, Column, InlineLoading, Row, TextInput } from 'carbon-components-svelte';
	import { Search } from 'carbon-icons-svelte';
	import { ArrowRight } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import type { SearchDocument } from '$lib/types';
	import type { ProductListing } from '$lib/types/product';

	export let data: PageData;

	let loading = false;

	onMount(async () => {
		if (data.q) {
			value = data.q;
			await search();
		}
	});

	let value = '',
		documents: SearchDocument<ProductListing>[] = data.documents;

	export const search = async () => {
		if (loading) return;
		loading = true;
		try {
			const { data } = await axios.get('/p', {
				params: { q: value }
			});
			console.info(data);
			({ documents } = data);
		} catch (e) {
			console.error(e);
		}
		loading = false;
	};
</script>

<OnEnter on:enter={search} />

<Row>
	<Column
		><div class="all">
			<h3>Simple Shopping. Connect with buyers and sellers with ease. Discover unique items</h3>
			<Button href="/p/add" icon={ArrowRight}>Add a product</Button>
			<div class="input">
				<TextInput hideLabel placeholder="Search all products" bind:value labelText="Search" />
				<Button size="field" on:click={search} icon={loading ? InlineLoading : Search} />
			</div>
			<div class="products">
				{#each documents as d}
					<Product id={d.id} p={d.value} />
				{/each}
			</div>
		</div>
	</Column>
</Row>

<style lang="sass">
	@use '@carbon/layout'
	h3
		padding: 1rem 0
	.all
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-03
	.products
		display: flex
		flex-direction: row
		flex-wrap: wrap
		column-gap: layout.$spacing-03
	.input
		display: flex
		flex-direction: row
		align-items: center
</style>
