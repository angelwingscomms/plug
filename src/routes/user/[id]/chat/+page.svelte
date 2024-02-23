<script lang="ts">
	import Interface from '$lib/components/chat/Interface.svelte';
	import axios from 'axios';
	import type { PageData } from './$types';
	import { message_name } from '$lib/util/chat/message_name';
	import ably from 'ably';
	import { message_index } from '$lib/constants';
	import { onMount } from 'svelte';

	export let data: PageData;

	let messages = data.m,
		message_input_ref: HTMLTextAreaElement,
		success = true;

	onMount(async () => {
		const realtime = new ably.Realtime({ authUrl: `/ably?i=${data.id}` });
		// realtime.auth.requestToken((await axios.get(`/ably?i=${data.id}`)).data);
		console.debug('we good');
		const channel = realtime.channels.get(message_index);

		// realtime.connection.once('connected', () => {

		// })

		channel.subscribe(message_name(data.id, data.user), (m) => {
			console.debug('sub got', m);
			messages = [...messages, m.data];
			console.debug('m', messages)
		});
	});

	const send = async ({ detail }: { detail: { c: string; d: number } }) => {
		console.debug('send s.df', detail);
		await axios.post(`/user/${data.id}/chat`, detail);
	};
</script>

<Interface bind:messages bind:success send_on_enter={true} bind:message_input_ref on:send={send} />
