<script lang="ts">
	// import PostsPagination from '$lib/components/PostsPagination.svelte';
	import { Column, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import { to_html } from '$lib/util/markdown/parse';

	export let data: PageData;
</script>

<Row>
	<Column>
		<div class="all">
			<p>{data.name}</p>

			{#if data.text}
				<p>{@html to_html(data.text.toString())}</p>
			{/if}
			<!-- <p>All posts by {data.user}</p>
			<PostsPagination {...data} /> -->
			<!-- <Tabs>
				<Tab label="Most Recent" />
				<Tab label="Search" />
				<svelte:fragment slot="content">
					<TabContent>
						<PostsPagination page={current_page} totalItems={data.totalItems} posts={data.posts} />
					</TabContent>
					<TabContent>
						<Search totalItems={data.totalItems} />
					</TabContent>
				</svelte:fragment>
			</Tabs> -->
		</div>
	</Column>
</Row>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
