<script lang="ts">
	import Interface from '$lib/components/chat/Interface.svelte';
	import axios from 'axios';
	import ably from 'ably';
	import { message_index } from '$lib/constants';
	import { onMount } from 'svelte';
	import { to_html } from '$lib/util/markdown/parse';
	import { page } from '$app/stores';

	export let route: string, name: string, text = "";

	let messages = $page.data.m,
		message_input_ref: HTMLTextAreaElement,
		success = true;

	onMount(async () => {
		const realtime = new ably.Realtime({ authUrl: `/ably?i=${$page.data.id}` });
		// realtime.auth.requestToken((await axios.get(`/ably?i=${$page.data.id}`)).data);
		const channel = realtime.channels.get(message_index);

		// realtime.connection.once('connected', () => {

		// })

		channel.subscribe(name, (m) => {
			messages = [m.data, ...messages];
		});
	});

	const send = async ({ detail }: { detail: { c: string; d: number } }) => {
		await axios.post(route, { ...detail, h: await to_html(detail.c) });
		text = ""
	};
</script>

<Interface
	bind:text
	u={$page.data.user}
	bind:messages
	bind:success
	send_on_enter={true}
	bind:message_input_ref
	on:send={send}
/>
