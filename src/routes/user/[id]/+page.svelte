<script lang="ts">
	import { Column, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import User from '$lib/components/User/User.svelte';
	export let data: PageData;
</script>

<Row>
	<Column>
		Similarity to your profile: {data.s}%
		<User contact={data.ch} name={data.u} html={data.h} id={data.id} />
	</Column>
</Row>