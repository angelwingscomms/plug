<script lang="ts">
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import { Button, Row, Column } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { signIn } from '@auth/sveltekit/client';
	import Search from '$lib/components/User/Search.svelte';
</script>

<Row>
	<Column>
		<div class="all">
			{#if $page.data.session?.user}
				<Button href="/edit" icon={Edit}>Edit Profile</Button>
			{:else}
				<Button on:click={() => signIn('google')}>Login</Button>
			{/if}
			<Search />
		</div>
	</Column>
</Row>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
