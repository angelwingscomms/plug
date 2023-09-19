import type { SearchDocumentValue } from '.';

export interface SearchDocument<Type> {
	id: string;
	value: Type;
}

export interface SearchResponse<Type extends SearchDocumentValue> {
	total: number;
	documents: SearchDocument<Type>[];
	page: number;
}
