<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import axios from 'axios'
</script>

<Button
	on:click={async () => {
		console.log(await axios.post('/embed', 's'));
	}}>embed  - server</Button
>
