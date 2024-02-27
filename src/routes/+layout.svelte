<script lang='ts'>
	import { Content, Grid, Theme } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/all.css';
	import { browser } from '$app/environment';
	import { Header, SideNav } from '$lib/components/Nav';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { theme, theme_key } from '$lib/theme_store';
	import Notifications from '$lib/components/Notifications.svelte';
	import { navigating } from '$app/stores';
	import { previous_page } from '$lib/store';

	console.log('God bless Isa')

	inject({ mode: dev ? 'development' : 'production' });

	if (browser && navigator && navigator.serviceWorker)
		navigator.serviceWorker.ready.then((registration) => registration.update());

	onMount(async() => {
		if (window.navigator && window.navigator.serviceWorker) {
			console.info('dlf', navigator.serviceWorker.controller)
			await navigator.serviceWorker.ready
			console.info('service worker ready')
		} else {
			console.debug('unavailable')
		}
		if (window.matchMedia) {
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				e.matches ? $theme = 'g100' : $theme = 'white'
			});
		}
	});

	$: if ($navigating) {
		$previous_page = $navigating.from?.url.pathname ?? ''
	}
</script>

<Notifications />
<Theme persist persistKey={theme_key} theme={$theme} />
<Header />
<Content style="background: none; padding: 1rem 1rem 0 1rem; height: 100%">
	<SideNav />
	<Grid>
		<slot />
	</Grid>
</Content>
