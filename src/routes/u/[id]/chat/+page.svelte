<script lang="ts">
	export let data: PageData;
	import Chat from '$lib/components/chat/Chat.svelte';
	import { message_name } from '$lib/util/chat/message_name';
	import type { PageData, Snapshot } from './$types';

	let text = '';

	export const snapshot: Snapshot = {
		capture: () => ({ text }),
		restore: (v) => ({ text } = v)
	};
</script>

<Chat bind:text name={message_name(data.id, data.user)} route="/u/${data.id}/chat" />
