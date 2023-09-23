<script lang="ts">
    import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import { Button, Row, Column } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import Search from '$lib/components/Search/Search.svelte';
</script>

<Row>
	<Column>
		<div class="all">
			<Search route="/feedback/search" placeholder="." />
		</div>
	</Column>
</Row>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>