<script lang="ts">
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	export let s: number, 
	name: string, html: string | undefined, id: string, contact: string;
</script>

<div class="all">
	<ButtonSet stacked>
		<Button kind="ghost" size="small" href="{$page.url.pathname}/similar">Similar users</Button>
		{#if $page.data.user === id}
			<Button kind="ghost" size="small" href="/edit">Edit your profile</Button>
		{/if}
	</ButtonSet>

	<div>
		<p class="top">Username:</p>
		<span class="shift">{name}</span>
	</div>
	<div class="section">
		<p class="top">Similarity to your profile:</p>
		<p class="shift">{s}%</p>
	</div>

	{#if contact}
		<div class="section">
			<p class="top">Contact</p>
			<p class="shift">{@html contact}</p>
		</div>
	{/if}

	{#if html}
		<div class="section">
			<p class="top">About user</p>
			<p>{@html html}</p>
		</div>
	{/if}
</div>

<style lang="sass">
	@use "@carbon/layout"
	@use "@carbon/type"
	.section
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-01
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
	.top
		@include type.type-style('productive-heading-01')
	.shift
		margin-left: layout.$spacing-04
</style>
