import { createChat } from "./createChat"

const apiKey = process.env.OPENAI_API_KEY || '';
const sendText = `
マリンピア
`

const testFunc = async () => {
  const chat = await createChat(apiKey, sendText);
  console.log(chat);
};

testFunc()