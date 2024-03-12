<script lang="ts">
	import SearchPagination from "$lib/components/Search/SearchPagination.svelte";
	import type { PageData } from "./$types";
    export let data: PageData
</script>

<h4>Similar users to {data.u ? data.u : `user ${data.id}`}</h4>
<SearchPagination f="u" route='u' documents={data.d} />