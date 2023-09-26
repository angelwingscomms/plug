<script>
	import { goto } from '$app/navigation';
	import Edit from '$lib/components/User/Edit.svelte';
</script>

<Edit on:save={()=> goto('/')} />
