import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	optimizeDeps: {
		include: ['sharp', 'onnxruntime-node']
	},
	plugins: [sveltekit(), SvelteKitPWA({ devOptions: { enabled: true } })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
