<script lang="ts">
	import SearchPagination from "$lib/components/Search/SearchPagination.svelte";
	import type { PageData } from "./$types";
    export let data: PageData
</script>

<p>Similar users to {data.u ? data.u : `user ${data.id}`}</p>
<SearchPagination route='user' documents={data.d} />