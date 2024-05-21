import OpenAI from "openai";
import { prompt } from "./utils/prompt";
import { gptResponse } from "./utils/storeList";

export const createChat = async (apiKey: string, text: string): Promise<gptResponse> => {
  const openai = new OpenAI({ apiKey: apiKey });
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": prompt},
        {"role": "user", "content": text},
      ],
      model: "gpt-4o",
      response_format: { type: "json_object"}
    });
    const { content } = completion.choices[0].message
    if (!content) {
      throw new Error('Empty response from OpenAI')
    }
    const parsedContent = JSON.parse(content)
    if (!parsedContent.storeList || !Array.isArray(parsedContent.storeList)) {
      throw new Error('Invalid response format from OpenAI');
    }
    return { storeList: parsedContent.storeList };
  } catch (error) {
    console.error('Error creating chat:', error);
    return { storeList: [] }
  }
}