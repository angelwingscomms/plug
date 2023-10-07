<script lang="ts">
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	export let name: string, html: string, id: string;
</script>

<div class="all">
	<ButtonSet stacked>
		<Button kind='ghost' size="small" href="{$page.url.pathname}/similar">Similar users</Button>
		{#if $page.data.session?.user?.id === id}
			<Button kind="ghost" size="small" href="/edit">Edit your profile</Button>
		{/if}
	</ButtonSet>
	<p>{name}</p>

	{#if html}
		<p>{@html html}</p>
	{/if}
</div>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
