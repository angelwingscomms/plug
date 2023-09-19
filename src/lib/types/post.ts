import type { RedisKey, SearchDocument } from '.';

export interface Payment {
	required: boolean;
	duration: number;
	once: boolean;
	cost: number;
	self: boolean;
	edits: boolean;
	// users?: {[index:string]: UserPayment}
}

export interface UserPayment {
	date: number;
	cost: number;
	once: boolean;
	paid_for_once: boolean;
}

export type NumberBool = 0 | 1;

export type PostEdit = Omit<EditablePost, 'payment' | 'allow_replies'> & Pick<Post, 'edit'>; //TODO-more precise on edit

export type EditablePost = Pick<
	Post,
	| 'allow_replies'
	| 'payment'
	| 'alias'
	| 'alias_plural'
	| 'replies_description'
	| 'replied_description'
	| 'name'
	| 'body'
>;

export interface Post {
	id: RedisKey;
	creator: string;
	created: Date;
	updated: Date;
	html?: string;
	edit?: Edit;
	selected?: boolean;
	allow_replies: boolean;
	payment: Payment;
	alias: string;
	alias_plural: string;
	replies_description: string;
	replied_description: string;
	name: string;
	body: string;
}

export type PostSearchDocument = SearchDocument<PostItem> & Pick<Post, 'selected'>;
export type PostItem = Pick<Post, 'name'>;

export interface Edit {
	to: RedisKey;
	current: boolean;
}
