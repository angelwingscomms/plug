<script lang="ts">
	import { Button, Row, Column, Link, ButtonSet } from 'carbon-components-svelte';
	import Search from '$lib/components/Search/Search.svelte';
	import type { Snapshot } from './$types';
	import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import type { SearchDocument } from '$lib/types';
	import { page } from '$app/stores';

	let documents: SearchDocument<{ u: string; s: number }>[], text: string, searched: boolean;

	export const snapshot: Snapshot = {
		capture: () => ({ documents, text, searched }),
		restore: (v) => ({ documents, text, searched } = v)
	};
</script>

<Row>
	<Column>
		<div class="all">
			<h1>find people similar to you</h1>
			<p class="text">
				AI that understands your profile is used so you can describe different aspects of
				yourself in your profile and people can find you easily with similar words or descriptions
			</p>
			<!-- <p>
				Example: "A web developer that goes by the name Gregory McCane that lives in Seattle, US and
				owns a white dog and loves to go skiing every weekend and listening to jazz music"
			</p> -->
			<!-- <p>
				You may edit your profile with a description of yourself with a lot of detail to allow
				people find you easily
			</p> -->
			{#if $page.data.user}
			<Button href="/edit" icon={Edit}>Edit profile</Button>{:else}
				<Button icon={ArrowRight} href="/auth?n=1">Create a profile</Button>
			{/if}

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
	@use "@carbon/type"
	.text
		@include type.type-style('body-compact-02')
	.all
		// text-align: center
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
