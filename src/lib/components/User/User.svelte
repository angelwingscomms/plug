<script lang="ts">
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	export let name: string, html: string | undefined, id: string, contact: string;
</script>

<div class="all">
	<ButtonSet stacked>
		<Button kind="ghost" size="small" href="{$page.url.pathname}/similar">Similar users</Button>
		{#if $page.data.user === id}
			<Button kind="ghost" size="small" href="/edit">Edit your profile</Button>
		{/if}
	</ButtonSet>
	<p>{name}</p>

	{#if contact}
		<h4>Contact</h4>
		<p class="contact">{@html contact}</p>
	{/if}

	{#if html}
		<p>About user</p>
		<p>{@html html}</p>
	{/if}
</div>

<style lang="sass">
	@use "@carbon/layout"
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
	.contact
		margin-left: layout.$spacing-04
</style>
