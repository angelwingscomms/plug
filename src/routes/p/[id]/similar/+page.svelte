<script lang="ts">
	import Product from '$lib/components/ProductListing.svelte';
	import { Column, Link, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Row>
	<Column>
		<p>Similar products to <Link href="/p/{data.id}">{data.n}</Link></p>

		<br />

		<div class="products">
			{#each data.d as d}
				<Product id={d.id} p={d.value} />
			{/each}
		</div>
	</Column>
</Row>

<style lang="sass">
	@use '@carbon/layout'
	.products
		display: flex
		flex-direction: row
		flex-wrap: wrap
		column-gap: layout.$spacing-06
</style>
