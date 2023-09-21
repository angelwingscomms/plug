import { pipeline } from "@xenova/transformers"

export const xenova = async (text: string) => {
    const extractor = await pipeline('feature-extraction', 'Xenova/bert-base-uncased', { revision: "default" });
    const output = await extractor(text, { pooling: "mean", normalize: true })
    console.log('embedding', output, typeof output.data)
    return output.data
}