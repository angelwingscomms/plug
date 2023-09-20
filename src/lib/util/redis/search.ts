import { embedding_field_name, items_per_page } from '$lib/constants';
import type { SearchOptions } from 'redis';
import { client } from '.';
import type { Filters } from '$lib/types/filter';
import { embedding } from '$lib/util/embedding';
import { slim } from '$lib/util/redis/shape/slim';
import type { SearchDocumentValue } from '$lib/types';
import { float32_buffer } from '$lib/util/float32_buffer';

export interface SearchParams {
	index: string;
	page: number | null;
	filters?: Filters;
	count?: boolean;
	query?: string;
	RETURN?: string[];
	OPTIONS?: SearchOptions;
	search?: string | number[];
}

export const search = async ({
	index,
	page,
	filters,
	count,
	search,
	RETURN,
	OPTIONS,
	query = ''
}: SearchParams) => {
	const options: SearchOptions = {
		RETURN,
		DIALECT: 3
	};

	if (count) {
		options.LIMIT = { from: 0, size: 0 };
	} else if (page) {
		options.LIMIT = { from: page > 1 ? (page - 1) * items_per_page : 0, size: items_per_page };
	}

	let extra_args = ''; // ' HYBRID_POLICY ADHOC_BF';

	console.log(filters);
	if (filters && filters.length) {
		filters.forEach((filter) => {
			switch (filter.type) {
				case 'tag':
					query += ` @${filter.field}:{${filter.values.map(
						(v, i) => `${v}${i === filter.values.length - 1 ? '' : ' |'}`
					)}}`;
					break;
				case 'num':
					query += ` @${filter.field}:[${filter.start} ${filter.end}]`;
					break;
				case 'bool':
					query += ` @${filter.field}:{${filter.value.toString()}}`;
					break;
				case 'text':
					query += ` @${filter.field}:(${filter.value})`;
			}
		});
		extra_args = ' HYBRID_POLICY ADHOC_BF';
	} else {
		query = '*';
	}

	console.log(query);

	if (search) {
		query += `=>[KNN 7 @${embedding_field_name} $BLOB${extra_args}]`;
		options.PARAMS = {
			BLOB:
				typeof search === 'string'
					? float32_buffer(await embedding(search))
					: float32_buffer(search)
		};
		options.SORTBY = {
			BY: `__${embedding_field_name}_score`,
			DIRECTION: 'ASC'
		};
	} else {
		// options.SORTBY = {
		// 	BY: '__score',
		// 	DIRECTION: 'DESC'
		// };
	}

	console.log(query);
	return client.ft.search(index, query, { ...options, ...OPTIONS }).then((res) => {
		res.documents = res.documents.map((r) => {
			r.value = slim(r.value, true) as SearchDocumentValue;
			return r;
		});
		return { ...res, page };
	});
};
