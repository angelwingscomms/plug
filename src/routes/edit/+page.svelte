<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Edit from '$lib/components/User/Edit.svelte';
</script>

<Edit on:save={()=> goto(`/u/${$page.data.user}`)} />
