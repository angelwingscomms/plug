export interface SearchDocument<T> {
	id: string;
	value: T;
}

export interface SearchResponse<T> {
	total: number;
	documents: SearchDocument<T>[];
	page: number;
}
