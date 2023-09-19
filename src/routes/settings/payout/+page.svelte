<script lang="ts">
	import {
		Button,
		Column,
		InlineLoading,
		NumberInput,
		Row,
		Select,
		SelectItem,
		TextInput
	} from 'carbon-components-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	import { currencies, type Currency } from '$lib/util/paystack/currencies';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import Save from 'carbon-icons-svelte/lib/Save.svelte'
	import type { ToastNotificationProps } from 'carbon-components-svelte/types/Notification/ToastNotification.svelte';

	let bank = '',
		name = '',
		number: number,
		banks: string[] = [],
		banks_loading = false,
		update_loading = false,
		currency: Currency;

	$: get_banks(currency);

	const get_banks = async (currency: Currency) => {
		banks_loading = true;
		await axios
			.get('/paystack/get_banks', { params: { currency } })
			.catch((e) =>
				notify({
					title: 'Encountered an error attempting to get banks',
					subtitle: e.response.data,
					kind: 'error'
				})
			)
			.finally(() => (banks_loading = false));
	};

	const update = async () => {
		update_loading = true;
		await axios
			.post('/settings/payout', { email: data.email, data: {name, number, bank, currency} })
			.then(() => notify('User payout details updated Successfully'))
			.catch((e) => {
				let notification: ToastNotificationProps = { title: 'We encountered an error attempting to update user payout details'};
				if (e.response.data) {
					notification.subtitle = e.response.data;
				}
				notify(notification)
			}).finally(() => update_loading = false);
	};
</script>

<Row>
	<Column>
		<div class="all">
			<p>Where should we send your earnings?</p>
			<Select labelText="Select the currency to pay to you" bind:selected={currency}>
				{#each currencies as currency}
					<SelectItem value={currency.value} text="{currency.name} ({currency.value})" />
				{/each}
			</Select>
			{#if banks_loading}
				<InlineLoading />
			{:else if banks.length}
				<Select labelText="Select the bank" bind:selected={bank}>
					{#each banks as b}
						<SelectItem value={b} />
					{/each}
				</Select>
			{/if}

			<TextInput bind:value={name} labelText="Account Name" />
			<TextInput bind:value={number} labelText="Account Number" />
		</div>
		<Button icon={update_loading ? InlineLoading : Save} on:click={update}>Update payout settings</Button>
	</Column>
</Row>

<style lang="sass">
	@use '@carbon/layout'
	.all
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-05
</style>
