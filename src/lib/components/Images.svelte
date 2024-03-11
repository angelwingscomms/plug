<script lang="ts">
	export let // edit: boolean,
		images: string[];
	// import { Button } from "carbon-components-svelte";
</script>

<div class="images">
	{#each images as src}
		<div class="image">
			<img class="img" {src} alt="to be sent as part of the message" />
			<!-- {#if edit}
                <Button on:click={() => remove_image(image.id)} icon={Close} iconDescription="Delete this image" />
            {/if} -->
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
        overflow: scroll
    .image
        display: flex
        flex-direction: column
        align-items: center
    .img
        height: 123px
</style>
