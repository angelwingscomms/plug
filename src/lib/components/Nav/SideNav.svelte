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
		<!-- <SideNavLink text="Create an article" href="/post/add" />
		{#if $page.data.session?.user}
			<SideNavLink text="View your articles" href="/post/user/{$page.data.session?.user.email}" />
		{/if} -->
		<A2HsLink />
	</SideNavItems>
</SideNav>
