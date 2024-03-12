<script>
	import { InlineLoading, SideNav, SideNavItems } from 'carbon-components-svelte';
	import SideNavLink from './SideNavLink.svelte';
	import { page } from '$app/stores';

	import { isSideNavOpen } from './store';

	import A2HsLink from './A2HSLink.svelte';
	import axios from 'axios';
	import { invalidateAll } from '$app/navigation';
	import { Add, AlignBoxTopLeft, List, Login, Logout, User, UserOnline } from 'carbon-icons-svelte';

	let logout_loading = false;
</script>

<SideNav bind:isOpen={$isSideNavOpen} rail>
	<SideNavItems>
		{#if $page.data.user}
			<SideNavLink icon={List} text="my items" href="/u/{$page.data.user}/i" />
			<SideNavLink icon={Add} text="add item" href="/i/add" />
			<SideNavLink icon={User} text="my account" href="/u/{$page.data.user}" />
			<SideNavLink
				icon={UserOnline}
				text="users similar to me"
				href="/u/{$page.data.user}/similar"
			/>
			<SideNavLink
				href={null}
				icon={logout_loading ? InlineLoading : Logout}
				text="logout"
				on:click={async () => {
					logout_loading = true;
					await axios.post('/auth/sign_out');
					await invalidateAll();
					logout_loading = false;
				}}
			/>
		{:else}
			<SideNavLink icon={Login} href="/auth" text="login" />
		{/if}

		<!-- <SideNavLink text="messages" href="/m" /> -->
		<SideNavLink icon={AlignBoxTopLeft} text="feedback" href="/feedback" />
		<A2HsLink />
	</SideNavItems>
</SideNav>
