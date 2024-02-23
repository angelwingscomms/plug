<script lang="ts">
	import Search from '$lib/components/Search/Search.svelte';
	import type { Snapshot } from './$types';
	import type { SearchDocument } from '$lib/types';

	let documents: SearchDocument<{ u: string; s: number }>[], text: string, searched: boolean;

	export const snapshot: Snapshot = {
		capture: () => ({ documents, text, searched }),
		restore: (v) => ({ documents, text, searched } = v)
	};
</script>

<div class="s">
    <h1>search for users with detailed descriptions</h1>
    <p class="text">
        you can search for users using descriptions and contact details
    </p>
    
    <Search
        bind:searched
        bind:documents
        bind:text
        placeholder="user description..."
        route="user"
    />
</div>

<style lang="sass">
    .s
        display: flex
        flex-direction: column
        row-gap: 1rem
    h1
        font-weight: 300
        margin-bottom: 3rem
    .text
        font-size: 20px
        margin-bottom: 1rem
</style>
