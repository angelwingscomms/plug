<script lang="ts">
	import { Button, Row, Column, Link, ButtonSet } from 'carbon-components-svelte';
	import type { Snapshot } from './$types';
	import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte';
	import Search from 'carbon-icons-svelte/lib/Search.svelte';
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
			<h1>find people just like you</h1>
			<p class="text">
				describe yourself expressly in your bio and immediately see profiles similar to yours
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
				<Button href="/user/{$page.data.user}/similar" icon={ArrowRight}
					>See similar profiles</Button
				><Button href="/edit" icon={Edit}>Edit your profile</Button>{:else}
				<Button kind='tertiary' icon={ArrowRight} href="/auth?n=1">create a profile</Button>
			{/if}
			<!-- <Button kind="tertiary" icon={Search} href="/user">user search</Button> -->
		</div>
	</Column>
</Row>

<style lang="sass">
	@use "@carbon/type"
	h1
		font-weight: 300
		margin-bottom: 3rem
	.text
		// @include type.type-style('body-02')
		font-size: 20px
	.all
		// text-align: center
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
