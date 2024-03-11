<script lang="ts">
	export let edit: boolean = false,
		images: { id: number; src: string }[],
		alt: string,
		x_icon_description = 'remove this image';
	import { Button } from 'carbon-components-svelte';
	import { Close } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ 'x-click': number }>();
</script>

<div class="images cute-scroll cute-scroll-no-vertical">
	{#each images as { id, src }, index}
		<div class="image">
			<img class="img" {src} {alt} />
			{#if edit}
				<Button
					on:click={() => dispatch('x-click', id)}
					icon={Close}
					iconDescription={x_icon_description}
				/>
			{/if}
			<slot {id} {index} />
		</div>
	{/each}
</div>

<style lang="sass">
    @use '@carbon/layout'
    .images
        display: flex
        flex-direction: row
        column-gap: layout.$spacing-06
        width: 100%
        overflow-y: scroll
    .image
        display: flex
        flex-direction: column
        align-items: center
    .img
        height: 123px
</style>
