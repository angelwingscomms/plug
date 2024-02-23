<script lang="ts">
	import Interface from '$lib/components/chat/Interface.svelte';
	import axios from 'axios';
	import type { PageData } from './$types';
	import { message_channel } from '$lib/util/ably';
	import { message_name } from '$lib/util/chat/message_name';

	export let data: PageData;

	let messages = data.m,
		message_input_ref: HTMLTextAreaElement,
		success = true;

	message_channel.subscribe(message_name(data.id, data.user), (m) => {
		messages = [...messages, m.data];
	});

	const send = async ({ detail }: { detail: { c: string; d: number } }) => {
		await axios.post(`/chat/${data.id}`, detail);
	};
</script>

<Interface bind:messages bind:success send_on_enter={true} bind:message_input_ref on:send={send} />
