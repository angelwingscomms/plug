import { typeStore } from '$lib/util/store';

export const theme_key = '__carbon-theme';
export const theme = typeStore<'white' | 'g10' | 'g80' | 'g90' | 'g100'>(theme_key, 'g100', (v) => {
	if (v !== ('white' || 'g10' || 'g80' || 'g90' || 'g100')) return 'g100';
	return v;
});
