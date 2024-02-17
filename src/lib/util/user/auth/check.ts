import { SECRET } from '$env/static/private';
import { createHmac } from 'crypto';

export const code = (id: string) => {
	const hmac = createHmac('sha256', SECRET);
	hmac.update(id);
	const ch = `${id}.${hmac.digest('hex')}`;
	return ch;
};

export const check = (token: string) => {
	const [id, code] = token.split('.');
	const hmac = createHmac('sha256', SECRET);
	hmac.update(id);
	return hmac.digest('hex') === code ? id : '';
};
