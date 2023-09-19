<script lang="ts">
	import type { PostSearchDocument } from '$lib/types';
	import Posts from '../Posts.svelte';
	import { Loading, Pagination } from 'carbon-components-svelte';
	import Results from './Results.svelte';

	export let page: number = 1,
		totalItems: number,
		select = false,
		results: PostSearchDocument[];

	let loading = false;

	// const get = async (page: number) => {
	// 	({ total: totalItems, documents: results } = await axios
	// 		.post('/post/get', { page, filters })
	// 		.then((r) => r.data)
	// 		.catch((e) =>
	// 			notify({
	// 				title: 'Encountered an error attempting to fetch results',
	// 				subtitle: e.response.data,
	// 				kind: 'error'
	// 			})
	// 		));
	// };
</script>

{#if loading}
	<Loading />
{:else}
	<Results on:select-click on:select on:deselect {results} />
{/if}

<Pagination on:update pageSizeInputDisabled pageSize={7} {totalItems} {page} />
