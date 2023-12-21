<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let ctrl = false, shift = false;

	const dispatch = createEventDispatcher();
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			if (ctrl && !e.ctrlKey) return;
			if (shift && !e.shiftKey) return;
			e.preventDefault()
			dispatch('enter');
		}
	}}
/>
