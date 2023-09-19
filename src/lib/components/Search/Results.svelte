<script lang="ts">
	import type { RedisKey, PostSearchDocument, SearchDocument } from '$lib/types';
	import ResultEntry from './ResultEntry.svelte';
	export let results: SearchDocument<any>[],
		select = false;
	// 	selected: RedisKey[] = [];

	// const toggle_selected = (id: RedisKey) => {
	// 	selected.includes(id) ? remove_from_selected(id) : add_to_selected(id);
	// };

	// const add_to_selected = (id: RedisKey) => {
	// 	if (!selected.includes(id)) selected = [...selected, id];
	// };

	// const remove_from_selected = (id: RedisKey) => (selected = selected.filter((i) => i !== id));
</script>

{#each results as result}
	<ResultEntry
		on:select-click
		on:deselect
		{select}
		on:click
		{result}
	/>
{/each}
