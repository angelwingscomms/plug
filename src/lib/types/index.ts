import { escape } from '$lib/util/escape';
import type { RedisJSON } from '@redis/json/dist//commands';
import type { SearchReply } from 'redis';

type Outcome = 'accepted' | 'dismissed';

export interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<Outcome>;
	prompt(): Promise<{
		outcome: Outcome;
		platform: string;
	}>;
}

export type KeyedObject = { [index: string]: RedisJSON };
export type SearchDocumentValue =SearchReply['documents'][number]['value']
export type RedisKey = string;
export type NumberDate = number;

export type Email = string;
export class EscapedEmail {
	value: string;
	constructor(email: string) {
		this.value = escape(email);
	}
}

export type V = number[];

export type { SearchResponse } from './SearchResponse';
export type {SearchDocument} from './SearchResponse'
