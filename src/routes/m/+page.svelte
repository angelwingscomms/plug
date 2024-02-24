<script lang="ts">
	import Chat from '$lib/components/chat/Chat.svelte';
	import type { PageData, Snapshot } from './$types';

	let name = "all",
		text = '';

	export const snapshot: Snapshot = {
		capture: () => ({ text }),
		restore: (v) => ({ text } = v)
	};
</script>

<Chat bind:text route="/m" {name} />
