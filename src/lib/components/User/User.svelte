<script lang="ts">
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import ArrowRight from 'carbon-icons-svelte/lib/ArrowRight.svelte';
	export let s: number | undefined, u: string, h: string | undefined, id: string, ch: string;
	let self = $page.data.user === id;
</script>

<div class="all">
	<ButtonSet stacked>
		{#if $page.data.user === id}
			<Button icon={Edit} href="/edit">edit your profile</Button>
		{/if}
		<Button href="{$page.url.pathname}/p">Items by {u}</Button>
	</ButtonSet>

	<h3 class="shift">{u}</h3>
	{#if s && $page.data.user !== id}
		<div class="section">
			<p class="top">This profile is {s}% similar to yours</p>
		</div>
	{/if}

	<Button href="/u/{id}/c">Chat with {u}</Button>

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

	<ButtonSet stacked>
		<Button size="small" icon={ArrowRight} href="{$page.url.pathname}/similar"
			>users similar to {$page.data.user === id ? 'you' : u}</Button
		>
	</ButtonSet>
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
