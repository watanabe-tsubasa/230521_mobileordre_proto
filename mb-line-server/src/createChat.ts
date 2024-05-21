import OpenAI from "openai";
import { prompt } from "./prompt";

export const createChat = async (apiKey: string, text: string) => {
  const openai = new OpenAI({ apiKey: apiKey });
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": prompt},
        {"role": "user", "content": text},
      ],
      model: "gpt-4o",
    });
    const { content } = completion.choices[0].message
    if (!content) {
      throw new Error('Empty response from OpenAI')
    }
    return content
  } catch (error) {
    console.error('Error creating chat:', error);
    return '通信のよいところで再度お願いします'
  }
}