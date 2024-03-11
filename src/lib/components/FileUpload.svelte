<script lang="ts">
	export let multiple = false,
		name: string = '',
		loading: boolean,
		ref: HTMLInputElement,
		label = `Upload file${multiple ? 's' : ''}`,
		button: ButtonProps = {},
		dispatch_empty = false;

	import { Button, InlineLoading } from 'carbon-components-svelte';
	import type { Button as ButtonProps } from 'carbon-components-svelte/types';
	import Upload from 'carbon-icons-svelte/lib/Upload.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const change = async () => {
		if (!ref || !ref.files) return;
		if (ref.files.length < 1 && !dispatch_empty) return;
		dispatch('change', ref.files);
	};
</script>

<Button
	icon={loading ? InlineLoading : Upload}
	iconDescription={label + `${ref?.files.length ? ref?.files.length : ''}`}
	{...button}
	on:click={() => ref?.click()}
	>{label}
	{ref?.files.length ? ref?.files.length : ''}</Button
>
<input style="display: none;" {multiple} {name} on:change={change} type="file" bind:this={ref} />
