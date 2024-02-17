<script lang="ts">
	import type {
		CreateChatCompletionResponse,
		ChatCompletionRequestMessage,
		CreateChatCompletionRequest
	} from 'openai';
	import axios from 'axios';
	export let description_label =
			'Describe the character',
		show_name_edit = true;
	export let name_label =
		'Name the character';
	import Interface from './Interface.svelte';
	import { download_blob } from '$lib/util';
	import { notify } from '$lib/util/notify';

	let loading = false,
		chat_container: HTMLElement,
		description: string,
		more_open = false,
		_content = '',
		user = 'Interlocutor_1',
		name = 'Interlocutor_2',
		message_input_ref: HTMLTextAreaElement,
		messages: ChatCompletionRequestMessage[] =
			[],
		parameters: CreateChatCompletionRequest =
			{
				model: 'gpt-4',
				temperature: 1,
				top_p: 1,
				messages: [],
				presence_penalty: 0,
				frequency_penalty: 0
			};

	const empty_chat = `${user}: `;
	let chat = empty_chat;

	const download = () => {
		download_blob(
			new Blob([chat]),
			`chat between user ${user} and AI character, ${name}`
		);
	};

	const restart = () => {
		chat = empty_chat;
		messages = [];
	};

	const download_then_restart =
		() => {
			download();
			restart();
		};

	const update_chat = ({
		content,
		response
	}: {
		content: string;
		response: string;
	}) => {
		chat.concat(
			`${content}\\n${name}: ${response}\\n${user}: `
		);
		messages = [
			...messages,
			{ content, role: 'user' },
			{
				content: response,
				role: 'assistant'
			}
		];
	};

	const send = async (
		content: string
	) => {
		loading = true;
		if (!content) {
			loading = false;
			return;
		}
		let request = parameters;

		request.messages = [
			{
				role: 'user',
				content: `Consider the following to be description of an interlocutor, \`${name}\`: ${description}. Provide the response from ${name} in the following hypothetical chat between ${user} and ${name}:\\n${chat}${content}\\n${name}: `,
				name: user
			}
		];
		await axios
			.post(
				'/token_count',
				request.messages
					.map(
						(m) =>
							`${m.role} ${m.content} ${m.name}`
					)
					.join(' ')
			)
			.then(async (r) => {
				const token_count = Number(
					r.data
				);
				if (token_count > 16000) {
					notify({
						title:
							'Conversation limit reached',
						button: {
							text: 'Clear the conversation',
							act: restart
						}
					});
					return;
				}
				console.info(
					'request',
					request
				);
				await axios
					.post<CreateChatCompletionResponse>(
						'/openai/chat',
						request
					)
					.then((r) => {
						console.info('haha!', r);
						let response =
							r.data.choices[0]
								.message?.content;
						if (!response) {
							console.error(
								'No message in first element of choices in response'
							);
							notify({
								kind: 'error',
								title: 'Please retry'
							});
							return;
						}
						update_chat({
							content,
							response
						});
						chat_container.scrollTop =
							chat_container.scrollHeight;
						_content = '';
						message_input_ref.focus();
					})
					.catch(() => {
						notify({
							kind: 'error',
							title: 'Please retry'
						});
					});
			})
			.catch(() =>
				notify({
					kind: 'error',
					title: 'Please retry'
				})
			)
			.finally(() => {
				loading = false;
			});
	};
</script>

<Interface
	bind:name
	bind:loading
	bind:parameters
	bind:chat_container
	bind:description
	bind:messages
	bind:content={_content}
	bind:more_open
	bind:message_input_ref
	{show_name_edit}
	{description_label}
	{name_label}
	on:send_attempt_without_description={() =>
		(more_open = true)}
	on:download={download}
	on:download_then_restart={download_then_restart}
	on:restart={restart}
	on:send={({ detail }) =>
		send(detail)}
/>
