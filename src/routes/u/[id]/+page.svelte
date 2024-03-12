<script lang="ts">
	import { Column, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import User from '$lib/components/User/User.svelte';
	export let data: PageData;
</script>

<Row>
	<Column>
		<User s={data.s} ch={data.ch} u={data.u} h={data.h} id={data.i} />
	</Column>
</Row>