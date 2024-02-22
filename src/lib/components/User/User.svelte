<script lang="ts">
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	export let s: number | undefined, u: string, h: string | undefined, id: string, ch: string;
</script>

<div class="all">
	<ButtonSet stacked>
		<Button kind="ghost" size="small" href="{$page.url.pathname}/similar"
			>Similar users to {u}</Button
		>
		{#if $page.data.user === id}
			<Button kind="ghost" size="small" href="/edit">Edit your profile</Button>
		{/if}
	</ButtonSet>

	<div>
		<p class="top">Username:</p>
		<span class="shift">{u}</span>
	</div>
	{#if s}
		<div class="section">
			<p class="top">Similarity to your profile:</p>
			<p class="shift">{s}%</p>
		</div>
	{/if}

	{#if ch}
		<div class="section">
			<p class="top">Contact</p>
			<p class="shift">{@html ch}</p>
		</div>
	{/if}

	{#if h}
		<div class="section">
			<p class="top">About user</p>
			<p>{@html h}</p>
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
