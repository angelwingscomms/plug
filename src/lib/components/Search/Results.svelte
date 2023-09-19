<script lang="ts">
	import type { RedisKey, PostSearchDocument, SearchDocument } from '$lib/types';
	import ResultEntry from './ResultEntry.svelte';
	export let results: SearchDocument<any>[];
</script>

{#each results as result}
	<ResultEntry
		on:click
		{result}
	/>
{/each}
