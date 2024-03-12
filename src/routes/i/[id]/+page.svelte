<script lang="ts">
	import { Column, Button, Row, ButtonSet } from 'carbon-components-svelte';
	import Images from '$lib/components/Images.svelte';
	import { page } from '$app/stores';
	export let data;
</script>

<Row>
	<Column>
		<div>
			<ButtonSet stacked>
				{#if data.u === data.user}
					<Button size="small" kind="tertiary" href="{$page.url.pathname}/edit"
						>edit this item</Button
					>
					<Button size="small" kind="tertiary" href="/u/{data.u}">goto seller's page</Button>
					<Button size="small" kind="tertiary" href="{$page.url.pathname}/similar"
						>see similar items</Button
					>
				{/if}
			</ButtonSet>
			<h3>{data.n}</h3>
			<p class="price">GH₵ {data.p}</p>
			<Images alt="item" images={data.ii.map((src, id) => ({ id, src }))} />
			<div>{@html data.h}</div>
		</div>
	</Column>
</Row>

<style lang="scss">
	@use '@carbon/layout';
	h3 {
		word-break: break-all;
		font-size: 24px;
	}
	.price {
		font-weight: 500;
	}
	div {
		max-width: 100%;
		display: flex;
		flex-direction: column;
		row-gap: layout.$spacing-04;
	}
</style>
