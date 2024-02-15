import { openai } from '$lib/util/openai';

export const oai = (input: string) =>
	openai.embeddings.create({ model: "text-embedding-ada-002", input }).then((r) => 
		r.data[0].embedding
	);
