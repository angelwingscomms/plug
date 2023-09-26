<script>
	import { signIn } from '@auth/sveltekit/client';
	import { Button, ButtonSet } from 'carbon-components-svelte';
</script>

<div>
	<h5>Sign In</h5>
	<ButtonSet stacked>
		<Button on:click={() => signIn('github')}>Github</Button>
		<Button on:click={() => signIn('google')}>Google</Button>
	</ButtonSet>
</div>

<style lang="sass">
	@use '@carbon/layout'
	div 
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-04
</style>
