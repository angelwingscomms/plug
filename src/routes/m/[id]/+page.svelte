<script lang="ts">
	import Chat from '$lib/components/chat/Chat.svelte';
	import { Button, Modal, truncate, Truncate } from 'carbon-components-svelte';
	import TextLongParagraph from 'carbon-icons-svelte/lib/TextLongParagraph.svelte';
	import type { PageData, Snapshot } from './$types';
	export let data: PageData;

	let name = data.id || '',
		show_details = false,
		text = '';

	export const snapshot: Snapshot = {
		capture: () => ({ text }),
		restore: (v) => ({ text } = v)
	};
</script>

<Modal passiveModal modalHeading="message details" hasScrollingContent bind:open={show_details}>
	<div class="c">
		<p>author: {data.username}</p>
		{@html data.h}
	</div>
</Modal>

<p class="f">replies to</p>
<div class="t">
	<p use:truncate>{@html data.h}</p>
	<Button
		size="small"
		on:click={() => (show_details = true)}
		iconDescription="view more"
		icon={TextLongParagraph}
	/>
</div>

<Chat bind:text route="/m/{data.id}" {name} />

<style lang="sass">
	@use "@carbon/type"
	.c
		display: flex
		flex-direction: column
		row-gap: 1rem
	.t
		display: flex
		flex-direction: row
		column-gap: 1rem
		width: fit-content
		margin-bottom: 1rem

	.f
		@include type.type-style('label-01')
</style>
