<script lang="ts">
	import Edit from '$lib/components/product/Edit.svelte';
	export let data;
</script>

<h3>Edit this product</h3>

<Edit p={data.p} button_text="Edit" />
