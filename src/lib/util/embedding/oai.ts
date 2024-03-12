import { embedding_model } from '$lib/constants';
import { openai } from '$lib/util/openai';

export const oai = (input: string) =>
	openai.embeddings.create({ model: embedding_model, input }).then((r) => 
		r.data[0].embedding
	);
