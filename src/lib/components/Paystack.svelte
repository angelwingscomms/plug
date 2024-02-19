<script lang="ts" context="module">
	declare namespace PaystackPop {
		function setup(args: object): { openIframe: () => null };
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import {
		PUBLIC_PAYSTACK_PK_LIVE,
		PUBLIC_PAYSTACK_PK_TEST,
		PUBLIC_PAYSTACK_TEST
	} from '$env/static/public';
	import axios from 'axios';
	import { Button } from 'carbon-components-svelte';
	import type { ButtonProps } from 'carbon-components-svelte/types';
	import { createEventDispatcher } from 'svelte';
	import { v4 } from 'uuid';

	const key = PUBLIC_PAYSTACK_TEST ? PUBLIC_PAYSTACK_PK_TEST : PUBLIC_PAYSTACK_PK_LIVE;
	const dispatch = createEventDispatcher();

	export let amount: number,
		button_props: ButtonProps,
		metadata: unknown,
		currency: 'NGN' | 'GHS' | 'ZAR' | 'USD';

	const request_payment = () => {
		PaystackPop.setup({
			key,
			email: $page.data.session?.user?.email,
			metadata,
			currency,
			channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
			amount: amount * 100,
			ref: v4(),
			callback: async (r: { reference: string }) => {
				await axios
					.post('/paystack/verify', r.reference)
					.then((r) => dispatch('verify', r.data))
					.catch((e) => dispatch('error', e.response.data));
			},
			onClose: () => dispatch('close')
		}).openIframe();
	};
</script>

<Button {...button_props} on:click={request_payment}><slot name="button" /></Button>

<svelte:head>
	<script src="https://js.paystack.co/v1/inline.js"></script>
</svelte:head>
