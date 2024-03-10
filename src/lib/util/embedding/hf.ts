// // import { PUBLIC_HF } from '$env/static/public';
// import { client as gradio_client } from '@gradio/client';
// // import { client as gradio_client } from '$lib/util/gradio_client';
// import { client } from '$lib/util/redis';
// import EventSource from 'eventsource';
// import { browser } from '$app/environment';
// // import crypto from 'crypto';
// import axios from 'axios';
// // import JSDOM from 'jsdom';

// // global.window = global
// // global.EventSource = eventsource

// export const hf = async (text: string) => {
// 	if (!browser) {
// 		// const { window } = new JSDOM(`<html></html>`);
// 		// global.window = window;
// 	}
// 	const space = 'https://edge37-embed.hf.space';
// 	// const session_hash = crypto.randomBytes(16).toString('hex');
// 	const session_hash = await client.incr('last_hf_embed_session_hash');
// 	console.debug('before join');
// 	const { data } = await axios.post(
// 		`${space}/queue/join`,
// 		{ data: [text], fn_index: 0, session_hash },
// 		{
// 			headers: {
// 				Authorization: 'Bearer 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'
// 			}
// 		}
// 	);
// 	let res: number[] | undefined = undefined;
// 	let es: EventSource | null = new EventSource(`${space}/queue/data?session_hash=${session_hash}`);
// 	const handle_event = (e: MessageEvent<any>) => {
// 		console.debug('ee', e.data, typeof e.data, e.data.msg);
// 		const e_data = JSON.parse(e.data);
// 		if (e_data.msg === 'process_completed') {
// 			console.debug('here');
// 			res = e_data.output.data[0]
// 			console.log('_res', res);
// 			if (e !== null) {
// 				es.removeEventListener('message', handle_event);
// 				es.removeEventListener('error', handle_error_event);
// 			}
// 			es = null;
// 		}
// 	};
// 	const handle_error_event = (e: MessageEvent<any>) => console.debug('eer', e);
// 	es.addEventListener('message', handle_event);
// 	es.addEventListener('error', handle_error_event);
// 	while (true) {
// 		if (res) break;
// 	}
// 	// const app = await gradio_client('edge37/embed');
// 	// const result = await app.predict('/predict', [
// 	// 	text // string  in 'text' Textbox component
// 	// ]);
// 	// console.log('rr', result.data);
// 	// return result.data;
// };
