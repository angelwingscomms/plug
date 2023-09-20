<script>
	import { signIn } from '@auth/sveltekit/client';
	import { Button } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
</script>

{#if $page.data.session?.user}
	<!-- goto previous page -->
	<!-- <Button on:click={()=> goto('/')}>Or here to to go to the previous page</Button> -->
	<Button href="/">You are logged in, click here to go to the homepage</Button>
{:else}
	<Button on:click={() => signIn('google')}>Sign In with Google</Button>
	<Button on:click={() => signIn('github')}>Sign In with Github</Button>
{/if}
