import { openai } from '../openai';

const example_tags = ['refurbished', 'black', 'iPhone 8', '8 GB RAM'];
const example_text = 'Refurbished Black iPhone 8 8GB RAM';

export const extract_tags = async (text: string): Promise<string[]> => {
	const res = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: `create a list of tags for the following product description: """${text}""". For example ,for the following product description: """${example_text}""", the resulting tags would be ${JSON.stringify(example_tags)}`
			}
		]
	});
	return JSON.parse(res.choices[0].message.content as string); //TODO-error-handling
};
