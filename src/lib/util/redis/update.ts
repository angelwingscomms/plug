import type { KeyedObject } from '$lib/types';
import { is_object } from '$lib/util/is_object';
import { client } from '.';
import { oai } from '$lib/util/embedding/oai';
import { sanitize_object } from '$lib/util/sanitize/sanitize_object';

const include = (prefix: string, obj: KeyedObject, accumulator: KeyedObject) => {
	for (const [key, value] of Object.entries(obj)) {
		if (is_object(value)) {
			include(`${prefix}.${key}`, value as KeyedObject, accumulator);
		} else {
			accumulator[`${prefix}.${key}`] = value;
		}
	}
};

export const update = async ({ id, data }: { id: string; data: KeyedObject }) => {
	if (!is_object(data)) client.json.set(id, '$', data);
	const sanitized_data = sanitize_object(data);
	const values: KeyedObject = {
		'$.v': await oai(JSON.stringify(sanitized_data))
	};
	include('$', data as KeyedObject, values);
	for (const [path, value] of Object.entries(values)) {
		await client.json.set(id, path, value);
	}
	await client.json.set(id, '$.updated', Date.now());
};
