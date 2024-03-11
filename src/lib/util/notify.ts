import { browser } from '$app/environment';
import { arrayStore } from '$lib/util/store';
// import type { ToastNotification as ToastNotificationProps } from 'carbon-components-svelte/types';

export interface ToastNotification {
	caption?: string,
	title: string,
	kind?: string,
	timeout?: number,
	subtitle?: string,
	lowContrast?: boolean
}

export const notify = (message: string | ToastNotification) => {
	if (browser) {
		const n: ToastNotification = typeof message === 'string' ? { title: message } : message;
		n.caption = new Date().toLocaleString();
		if (!n.kind) n.kind = 'success'
		if (!n.timeout) n.timeout = n.kind === 'success' ? 432 : 4320
		n.lowContrast = true
		notifications.update((ns) => [...ns, n]);
	}
};

export const notifications = arrayStore<object>('notifications');
