<script lang="ts">
	import type {
		PostSearchDocument
		// RedisKey
	} from '$lib/types';
	import {
		Button,
		//  Button,
		Link
	} from 'carbon-components-svelte';
	import Checkbox from 'carbon-icons-svelte/lib/Checkbox.svelte';
	import CheckboxChecked from 'carbon-icons-svelte/lib/CheckboxChecked.svelte';
	// import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	// import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	// import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	// import { client_delete } from '$lib/util/client_del';

	export let post: PostSearchDocument,
		select = false;

	const dispatch = createEventDispatcher();
	$: console.log(post.selected, post.id);
</script>

<div role="button" tabindex="0" on:click on:keydown={() => dispatch('click')} class="post">
	{#if select}
		<Button
			size="small"
			kind="ghost"
			icon={post.selected ? CheckboxChecked : Checkbox}
			on:click={() => (post.selected = !post.selected)}
		/>
	{/if}
	<div class="name">
		<Link href="/post/{post.id}">{post.value.name}</Link>
	</div>
	<!-- <div class="buttons">
		{#if post.value.is_user}
			<Button kind="ghost" href={`/post/${post.id}/edit`} iconDescription="Edit" icon={Edit} />
			<Button
				kind="ghost"
				icon={TrashCan}
				on:click={async () => await client_delete(post.id).then(() => dispatch('del'))}
			/>
		{/if}
		<slot name="buttons" />
	</div> -->
</div>

<style lang="sass">
	@use '@carbon/layout'
	.name
		width: 74%
	// .buttons
	// 	display: flex
	// 	justify-content: flex-start
	.post 
		display: flex
		align-items: center
		padding: layout.$spacing-04
</style>
