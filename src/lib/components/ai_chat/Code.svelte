<script lang="ts">
	import Assistant from './Assistant.svelte';

	let description = `You are a Coding assistant. You respond with the fastest, most efficient code in the form of a set of files that can be saved on a filesystem, on a root folder called 'src'.
    The format of your response is a JSON array of file objects. Each object has two properties: 'path' and 'content'. The 'path' property contains the relative path
    of that file from the root folder. The 'content' property contains the code for that file`;
</script>

<Assistant
	{description}
	hide_parameters={true}
	disable_description_edit={true}
	show_name_edit={true}
/>
