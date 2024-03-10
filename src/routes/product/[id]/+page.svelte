<script lang="ts">
	import { Column, Link, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('d', data);
</script>

<Row>
	<Column max={432}>
		<div>
			<h3>{data.n}</h3>
			<p>Owner: <Link href="/user/{data.u}/p">{data.uf}</Link></p>
			<img src={data.i.Location} alt="hmm" />
			<pre>{data.a}</pre>
		</div>
	</Column>
</Row>

<style lang="sass">
    @use '@carbon/layout'
    div
        display: flex
        flex-direction: column
        row-gap: layout.$spacing-06
    img
        width: 100%
</style>
