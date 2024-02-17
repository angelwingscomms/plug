<script lang="ts">
	import axios from 'axios';
	import { post } from '$lib/fetch';
	import type { Id } from '$lib/types';
	import { ComboBox } from 'carbon-components-svelte';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';

	export let id: Id,
		value: string = '',
		items: ComboBoxItem[] = [];

	const from_ids = (
		ids: Id[]
	): ComboBoxItem[] => {
		let res = [];
		for (let id of ids) {
			if (!id) continue;
			let s =
				localStorage.getItem(id);
			if (!s) continue;
			let r;
			try {
				r = JSON.parse(s);
			} catch {
				continue;
			}
			if (s) {
				res.push({
					id,
					text: r.name
				});
			} else {
				continue;
			}
		}
		return res;
	};

	const search = async () => {
		await axios
			.post('/openai/embeddings', {
				model:
					'text-embedding-ada-002',
				input: value
			})
			.then(async (vector) => {
				// await post(
				// 	'/embedding/query',
				// 	{
				// 		topK: 7,
				// 		namespace: 'entries',
				// 		vector
				// 		// filter: {"parent": {"$in": []}}
				// 	}
				// ).then((ids) => {
				// 	items = from_ids(ids);
				// });
			});
	};
</script>

<ComboBox
	bind:value
	on:select={({ detail }) =>
		(id = detail.selectedId)}
	titleText="Select an entry"
	{items}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			search();
		}
	}}
/>
