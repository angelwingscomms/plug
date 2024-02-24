<script lang="ts">
	export let data: PageData;
	import Chat from '$lib/components/chat/Chat.svelte';
	import { message_name } from '$lib/util/chat/message_name';
	import type { PageData } from './$types';
</script>

<Chat name={message_name(data.id, data.user)} route="/user/${data.id}/chat" />
