<script lang="ts">
	import { Button, Row, Column, Link, ButtonSet } from 'carbon-components-svelte';
	import Search from '$lib/components/Search/Search.svelte';
	import type { Snapshot } from './$types';
	import type { SearchDocument } from '$lib/types';

	let documents: SearchDocument<{u: string}>[],
		text: string,
		searched: boolean;

	export const snapshot: Snapshot = {
		capture: () => ({ documents, text, searched }),
		restore: (v) => ({ documents, text, searched } = v)
	};
</script>

<Row>
	<Column>
		<div class="all">
			<ButtonSet stacked>
				<!-- <Button kind="ghost" href='/about'>About the site</Button> -->
				<Button kind="ghost" size="small" href="/edit">Edit your profile</Button>
			</ButtonSet>
			<p>Search for users with extreme detail</p>
			<p>Example: "A web developer that goes by the name Gregory McCane that lives in Seattle, US and owns a white dog and loves to go skiing every weekend and listening to jazz music"</p>
			<Search
				bind:searched
				bind:documents
				bind:text
				placeholder="Find users using a description or their contact"
				route="user"
			/>
		</div>
	</Column>
</Row>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
