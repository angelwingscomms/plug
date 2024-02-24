<script lang="ts">
	import Chat from '$lib/components/chat/Chat.svelte';
	import type { SearchDocument } from '$lib/types';
	import type { Message } from '$lib/types/message';
	import type { PageData, Snapshot } from './$types';
	export let data: PageData;

	let name = data.id,
		text = '';

	export const snapshot: Snapshot = {
		capture: () => ({ text }),
		restore: (v) => ({ text } = v)
	};
</script>

<Chat bind:text route="/m/{data.id}" {name} />
