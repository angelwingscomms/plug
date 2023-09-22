<script>
	import { SideNav, SideNavItems } from 'carbon-components-svelte';
	import SideNavLink from './SideNavLink.svelte';
	import { page } from '$app/stores';

	import { isSideNavOpen } from './store';

	import A2HsLink from './A2HSLink.svelte';
	import { onMount } from 'svelte';
</script>

<SideNav bind:isOpen={$isSideNavOpen}>
	<SideNavItems>
		{#if $page.data.session?.user}
			<SideNavLink text="View profile" href="/user/{$page.data.session?.user?.id}" />
			<SideNavLink text="Edit profile" href="/edit" />
		{/if}
		
		 <SideNavLink text="Feedback" href="/feedback" />
		<A2HsLink />
	</SideNavItems>
</SideNav>
