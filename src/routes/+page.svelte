<script lang="ts">
	import { Button, Row, Column, Link, ButtonSet } from 'carbon-components-svelte';
	import Search from '$lib/components/Search/Search.svelte';
	import type { Snapshot } from './$types';
	import { onMount } from 'svelte';
	import type { SearchDocument } from '$lib/types';

	onMount(() => show_examples());
	let documents: SearchDocument[],
		text: string,
		searched: boolean,
		not_focused = true;

	export const snapshot: Snapshot = {
		capture: () => ({ documents, text, searched }),
		restore: (v) => ({ documents, text, searched } = v)
	};

	const example_queries = [
		'A girl that likes jazz, hockey and rock music. she also loves to play the piano and loves looksmaxxing memes',
		'Blonde 18 year old girl that stays in Seattle and likes to play football and hockey on the weekends'
	];

	const show_examples = () => {
		while (not_focused) {
			example_queries.forEach((e) => {
				text = '';
				for (let i = 0; i < e.length; i++) {
					text += e[i];
				}
			});
		}
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
