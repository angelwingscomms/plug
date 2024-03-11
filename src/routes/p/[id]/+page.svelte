<script lang="ts">
	import { Column, Link, Row } from 'carbon-components-svelte';
	import Images from '$lib/components/Images.svelte';
	import { page } from '$app/stores';
	export let data;
</script>

<Row>
	<Column max={432}>
		<div>
			{#if data.u === data.user}
				<Link href="{$page.url.pathname}/edit">Edit this item</Link>
			{/if}
			<h3>{data.n}</h3>
			<p>seller: <Link href="/user/{data.u}">{data.uf}</Link></p>
			<Images alt="product" images={data.ii.map((src, id) => ({ id, src }))} />
			<p>GH₵ {data.p}</p>
			<div>{@html data.h}</div>
		</div>
	</Column>
</Row>

<style lang="sass">
    @use '@carbon/layout'
    div
        display: flex
        flex-direction: column
        row-gap: layout.$spacing-06
</style>
