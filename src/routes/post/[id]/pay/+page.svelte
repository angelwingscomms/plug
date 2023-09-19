<script lang="ts">
	import { goto } from '$app/navigation';
	import Paystack from '$lib/components/Paystack.svelte';
	import { friendly_milliseconds } from '$lib/util/friendly_milliseconds';
	import { notify } from '$lib/util/notify';
	import type { ArgsMetadata } from '$lib/util/redis/post/record_payment';
	import { Button } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const metadata: ArgsMetadata | null = data.id && data.once ? { id: data.id, once: data.once } : null;
</script>

<div class="label">Post name:</div>
<div class="name">{data.name}</div>

<p>
	The above post requires a {data.once
		? 'one time payment'
		: `payment every ${friendly_milliseconds(data.duration || 0)}`} of {data.cost} NGN to access it{data.self
		? ''
		: `'s ${data.replies_description}'`}
</p>

{#if metadata && data.currency}
	<Paystack
		{metadata}
		amount={data.cost || 0}
		currency={data.currency}
		on:verify={({ detail }) => {
			if (detail) {
				const url = data.self ? `/post/${data.id}` : `/post/${data.id}/replies`;
				goto(url);
			} else {
				notify({title: `Payment for is unverified`, kind: 'warning'}); //TODO
			}
		}}
		on:error={({ detail }) => notify({title: `Encountered an error attempting to verify the payment`, subtitle: detail, kind:'error'})}
		button_props={{}}>Click here to pay for access to this post</Paystack
	>
{:else}
	<p>Encountered an error trying loading post details</p>
	<Button size="small" on:click={window.location.reload}>Reload page</Button>
{/if}
