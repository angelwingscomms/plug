<script lang="ts">
	import { Column, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let u: string

	console.log('data', data)
</script>

<Row>
	<Column>
		<div class="all">
			<p>~ {data.name}</p>

			{#if data.html}
				<p>{@html data.html}</p>
			{/if}
		</div>
	</Column>
</Row>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
