<script>
	import { signIn } from '@auth/sveltekit/client';
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { previous_page } from '$lib/store';
</script>

{#if $page.data.session?.user}
	<div>
		<h4>You are logged in</h4>
		<ButtonSet stacked>
			<Button on:click={() => goto($page.data.t || $previous_page || '/')}
				>Go to the previous page</Button
			>
			<Button href="/">Go to the homepage</Button>
		</ButtonSet>
	</div>
{:else}
	<div>
		<h4>Sign In</h4>
		<ButtonSet stacked>
			<Button on:click={() => signIn('github')}>Github</Button>
			<Button on:click={() => signIn('google')}>Google</Button>
		</ButtonSet>
	</div>
{/if}

<style lang="sass">
	@use '@carbon/layout'
	div 
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-04
</style>
