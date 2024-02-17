<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { isSideNavOpen } from './store';
	import {
		InlineLoading,
		SkipToContent,
		Header,
		HeaderUtilities,
		HeaderAction,
		HeaderPanelLinks,
		HeaderPanelLink
	} from 'carbon-components-svelte';
	import Sun from 'carbon-icons-svelte/lib/Sun.svelte';
	import Moon from 'carbon-icons-svelte/lib/Moon.svelte';
	import { theme } from '$lib/theme_store';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
	import { goto } from '$app/navigation';
	import { sign_out } from '$lib/util/user/auth/sign_out';

	$: isOpen = false;
	$: icon = $theme === 'g100' ? Sun : Moon;
</script>

<Header
	persistentHamburgerMenu={true}
	platformName="Search"
	bind:isSideNavOpen={$isSideNavOpen}
	href="/"
>
	{#if $navigating}
		<InlineLoading />
	{/if}
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderAction
			on:click={(e) => {
				$theme = $theme === 'g100' ? 'white' : 'g100';
			}}
			on:open={(e) => {
				isOpen = false;
			}}
			bind:isOpen
			{icon}
			closeIcon={icon}
		/>
		<HeaderAction icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
			<HeaderPanelLinks>
				{#if $page.data.user}
					<HeaderPanelLink on:click={() => sign_out()}>sign out</HeaderPanelLink>
				{:else}
					<HeaderPanelLink on:click={() => goto('/auth')}>sign in</HeaderPanelLink>
				{/if}
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>
