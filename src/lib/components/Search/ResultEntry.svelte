<script lang="ts">
	import type {
		PostSearchDocument,
		SearchDocument

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

	export let result: SearchDocument<{ name: string; email: string }>;
		// select = false

	const dispatch = createEventDispatcher();
	// $: console.log(result.selected, result.id)
</script>

<div role="button" tabindex="0" on:click on:keydown={() => dispatch('click')} class="result">
	<!-- {#if select}
		<Button
			size='small'
			kind='ghost'
			icon={result.selected ? CheckboxChecked : Checkbox}
			on:click={() => result.selected = !result.selected}
		/>
	{/if} -->
	<div class="name">
		<Link href="/user/{result.id}">~ {result.value.name ?? ''}</Link>
	</div>
	<!-- <div class="buttons">
		{#if result.value.is_user}
			<Button kind="ghost" href={`/result/${result.id}/edit`} iconDescription="Edit" icon={Edit} />
			<Button
				kind="ghost"
				icon={TrashCan}
				on:click={async () => await client_delete(result.id).then(() => dispatch('del'))}
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
	.result 
		display: flex
		align-items: center
		padding: layout.$spacing-04
</style>
