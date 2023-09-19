<script lang="ts">
	const payment = {
		required: false,
		cost: 0,
		once: false,
		duration: 1,
		self: false,
		edits: false
	};
	export let save_loading = false,
		delete_loading = false,
		show_delete_button = false,
		id: string | undefined = undefined,
		post: EditablePost = {
			name: '',
			body: '',
			alias: '',
			alias_plural: '',
			replied_description: '',
			replies_description: '',
			allow_replies: false,
			payment
		};

	import {
		Button,
		ButtonSet,
		InlineLoading,
		InlineNotification,
		NumberInput,
		TextArea,
		TextInput,
		Toggle
	} from 'carbon-components-svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';
	import View from 'carbon-icons-svelte/lib/View.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { createEventDispatcher } from 'svelte';
	import OnEnter from '$lib/components/OnEnter.svelte';
	import type { EditablePost } from '$lib/types/post';
	import { parse } from '$lib/util/markdown/parse/web';
	import { sanitize_string, sanitize_object } from '$lib/util/sanitize';

	$: loading = save_loading || delete_loading;

	let error = '';
	const dispatch = createEventDispatcher();

	const dispatch_accept = async () => {
		const sanitized = sanitize_object(post);
		await parse(sanitized.body as string)
			.then((t) => {
				sanitized.html = sanitize_string(t);
				dispatch('accept', sanitized);
			})
			.catch((e) => {
				error = e;
			});
	};

	if (!post.payment) post.payment = payment;
</script>

<OnEnter on:enter={dispatch_accept} />

{#if error}
	{#if error === 'timeout'}
		<InlineNotification
			hideCloseButton
			title="Error:"
			subtitle="Took too long to parse the content body field. Try making the post shorter"
		/>
	{:else}
		<InlineNotification
			hideCloseButton
			title="Error:"
			subtitle="Encountered an error parse the content of the body field"
		/>
	{/if}
{/if}

<div class="form">
	<TextInput disabled={loading} bind:value={post.name} labelText="Name" />
	<!-- <TextInput disabled={loading} bind:value={post.alias} labelText="Alias" />
	<TextInput disabled={loading} bind:value={post.alias_plural} labelText="Alias Plural" /> -->
	<TextInput
		disabled={loading}
		bind:value={post.replies_description}
		labelText="Description for Replies"
	/>
	<TextInput
		disabled={loading}
		bind:value={post.replied_description}
		labelText="Description for Replied"
	/>
	<TextArea
		helperText="Markdown may be used for the body of the post"
		disabled={loading}
		bind:value={post.body}
		labelText="Body"
	/>

	<p>Payments</p>
	{#if post.payment}
		<!-- TODO-nah 👆 -->
		<Toggle
			bind:toggled={post.payment.required}
			labelText="Require users to be subscribed to this post to view it's sub-posts"
		/>
		
	{/if}
	{#if post.payment?.required}
		<Toggle
			bind:toggled={post.payment.self}
			labelText="Require users to be subscribed to this post to view this post itself"
		/>
		<Toggle
			bind:toggled={post.payment.edits}
			labelText="Require users to be subscribed to this post to view it's past edits"
		/>
		<NumberInput
			label="Cost for a user to subscribe to this article in Naira (NGN)"
			bind:value={post.payment.cost}
		/>
		<Toggle
			bind:toggled={post.payment.once}
			labelText="Allow Users have lifetime access to this post after a single one-time payment"
		/>
		{#if !post.payment.once}
			<NumberInput
				bind:value={post.payment.duration}
				label="Duration of a payment (milliseconds)"
			/>
		{/if}
	{/if}
	<Toggle bind:toggled={post.allow_replies} labelText="Allow users to reply to this post" />
	<ButtonSet stacked>
		<Button
			disabled={loading || Boolean(error)}
			icon={save_loading ? InlineLoading : Save}
			on:click={dispatch_accept}>Save</Button
		>
		{#if show_delete_button && id}
			<Button
				disabled={loading}
				icon={delete_loading ? InlineLoading : TrashCan}
				on:click={() => dispatch('delete', post)}>Delete</Button
			>
			<Button disabled={loading} icon={View} href={`/post/${id}`}>View this post's page</Button>
		{/if}
	</ButtonSet>
</div>

<style lang="sass">
	.form
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
