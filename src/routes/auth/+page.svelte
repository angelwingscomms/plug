<script>
	import { signIn } from '@auth/sveltekit/client';
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
</script>

{#if $page.data.session?.user}
	<!-- goto previous page -->
	<!-- <Button on:click={()=> goto('/')}>Or here to to go to the previous page</Button> -->
	<Button href="/">You are logged in, click here to go to the homepage</Button>
{:else}
	<div>
		<h4>Sign In</h4>
		<ButtonSet stacked>
			<Button on:click={() => signIn('google')}>Google</Button>
			<Button on:click={() => signIn('github')}>Github</Button>
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
