import type { RedisKey } from '.';
import type { Document } from './SearchResponse';

export interface Payment {
	required: boolean;
	duration: number;
	once: boolean;
	cost: number;
	self: boolean;
	expires?: number | 'never';
	// users?: {[index:string]: UserPayment}
}

export interface UserPayment {
	// [index: string]: number | boolean,
	date: number;
	cost: number;
	once: boolean;
	paid_for_once: boolean;
}

export type PostEdit = Omit<EditablePost, 'payment' | 'allow_replies'> & Pick<Post, 'edit'>; //TODO-more precise on edit

export type EditablePost = Omit<Post, 'id' | 'creator' | 'created' | 'updated' | 'edit'>;

export interface Post {
	id: RedisKey;
	creator: string;
	html?: string;
	created: Date;
	updated: Date;
	edit?: Edit;
	allow_replies: boolean;
	payment?: Payment;
	alias: string;
	alias_plural: string;
	replies_description: string;
	replied_description: string;
	name: string;
	body: string;
}

export type PostSearchDocument = Document<PostItem>;
export type PostItem = Pick<Post, 'name'>;

export interface Edit {
	to: RedisKey;
	current: boolean;
}
