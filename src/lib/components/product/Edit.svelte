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
	import { notify } from '$lib/util';

	export let p: Product | undefined = undefined,
		image_loading = false,
		images: Image[] = [],
		images_loading = false,
		button_text: string;
	let loading = false,
		next_image_id = 0,
		image_added = false, //TODO-check
		images_ref: HTMLInputElement,
		image_ref: HTMLInputElement;

	type Image = { id: number; url: string };

	onMount(() => {
		console.debug(images_ref.files, image_ref.files);
	});

	$: console.debug(image_ref?.files)

	const file_to_base64 = (file: File) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				resolve(reader.result);
			};

			reader.onerror = reject;

			reader.readAsDataURL(file);
		});
	};

	const update_images = async ({ detail }: { detail: File[] }) => {
		images_loading = true;
		for (let i = 0; i < detail.length; i++) {
			try {
				const base64 = await file_to_base64(detail[i]);
				images = [
					...images,
					{
						id: next_image_id,
						url: base64 as string
					}
				];
				next_image_id++;
			} catch (err) {
				notify({
					kind: 'error',
					title: 'Error occurred while trying to read uploaded file'
				});
			}
		}
		images_loading = false;
	};

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
				loading={image_loading}
				name="i"
				bind:ref={image_ref}
				on:change={() => {
					image_added = true
				}}
				label="{image_added ? 'Change' : 'Add'} display image"
			/>
			<!-- {#if images.length}
				<div class="images">
					{#each images as image}
						<div class="image">
							<img class="img" src={image.image_url.url} alt="to be sent as part of the message" />
							<Button
								on:click={() => remove_image(image.id)}
								icon={Close}
								iconDescription="Delete this image"
							/>
						</div>
					{/each}
				</div>
			{/if} -->
			<FileUpload
				loading={images_loading}
				bind:ref={images_ref}
				on:change={update_images}
				name="ii"
				multiple
				label="Add images {images_ref?.files?.length || 0}"
			/>
			<Button icon={loading ? InlineLoading : Send} type="submit">{button_text}</Button>
		</form>
	</Column>
</Row>
