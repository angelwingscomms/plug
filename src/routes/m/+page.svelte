<script lang="ts">
	import Chat from '$lib/components/chat/Chat.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let name = data.user;
</script>

<Chat route="/m" {name} />
