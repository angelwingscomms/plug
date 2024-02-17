<script lang="ts">
	import axios from 'axios';
	import Record from '../Record.svelte';
	import { createEventDispatcher } from 'svelte';
	import { transcribe } from '$lib/util/transcribe';

	const dispatch =
		createEventDispatcher();
</script>

<Record
	buttonProps={{
		size: 'field'
	}}
	on:pause={async (e) => {
		dispatch(
			'text',
			await transcribe(
				await new Blob(
					e.detail.chunks,
					{
						type: e.detail.type
					}
				)
			)
		);
	}}
/>
