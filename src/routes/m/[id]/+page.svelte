<script lang="ts">
	import Chat from '$lib/components/chat/Chat.svelte';
	import type { SearchDocument } from '$lib/types';
	import type { Message } from '$lib/types/message';
	import { truncate } from 'carbon-components-svelte';
	import type { PageData, Snapshot } from './$types';
	export let data: PageData;

	let name = data.id || "",
		text = '';

	export const snapshot: Snapshot = {
		capture: () => ({ text }),
		restore: (v) => ({ text } = v)
	};
</script>

<p class="f">replies to </p>
<p use:truncate>{data.c}</p>

<Chat bind:text route="/m/{data.id}" {name} />

<style lang="sass">
	@use "@carbon/type"

	.f
		@include type.type-style('label-01')
</style>