<script lang="ts">
	import Chat from '$lib/components/chat/Chat.svelte';
	import { Toggle } from 'carbon-components-svelte';
	import type { Snapshot } from './$types';

	let t = true,
		text = '';

	export const snapshot: Snapshot = {
		capture: () => ({ text }),
		restore: (v) => ({ text } = v)
	};
</script>

<Toggle labelText="Top level messages only" bind:toggled={t} />

<Chat bind:text route="/m{t ? '?t=1' : ''}" name={t ? 't' : 'e'} />
