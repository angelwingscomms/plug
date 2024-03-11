<script lang="ts">
	import {
		Button,
		Column,
		InlineLoading,
		Row,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';
	import { applyAction, enhance } from '$app/forms';
	// import axios from 'axios';
	import { goto } from '$app/navigation';
	// import { OnEnter } from 'sveltekit-carbon-utils';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { Send } from 'carbon-icons-svelte';
	import type { Product } from '$lib/types/product';
	import { onMount } from 'svelte';

	export let p: Product | undefined = undefined, button_text: string;
	let loading = false,
		images_ref: HTMLInputElement,
		display_images_ref: HTMLInputElement;

	onMount(() => {console.debug(images_ref.files, display_images_ref.files)})

	// const send = async () => {
	// try {
	// 	const form = new FormData();
	// 	const { data } = await axios.post('/product', { name, about });
	// 	goto(`/product/id/${data}`);
	// } catch (e) {
	// 	console.error(e);
	// }
	// };
</script>

<Row>
	<Column>
		<form
			enctype="multipart/form-data"
			method="POST"
			use:enhance={() => {
				loading = true;

				return async ({ result }) => {
					loading = false;
					if (result.type === 'redirect') {
						goto(result.location);
					} else {
						await applyAction(result);
					}
				};
			}}
		>
			<TextInput name="n" value={p?.n ?? ''} labelText="Name" />
			<TextInput name="p" value={p?.p ?? ''} labelText="Price" />
			<TextArea name="a" value={p?.a ?? ''} labelText="About this product" />
			<FileUpload
				name="i"
				bind:ref={display_images_ref}
				label="{display_images_ref?.files?.length ? 'Change' : 'Add'} display image"
			/>
			<FileUpload
				bind:ref={images_ref}
				name="ii"
				multiple
				label="Add images {images_ref?.files?.length || 0}"
			/>
			<Button icon={loading ? InlineLoading : Send} type="submit">{button_text}</Button>
		</form>
	</Column>
</Row>
