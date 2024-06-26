import { 
  messagingApi,
  webhook,
} from '@line/bot-sdk'
import { Hono } from 'hono'
import { createChat } from './createChat'
import { createMessages } from './utils/createMessage'

type Bindings = {
  CHANNEL_ACCESS_TOKEN: string,
  CHANNEL_SECRET: string,
  OPENAI_API_KEY: string,
}

const app = new Hono<{ Bindings: Bindings}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/webhook', async (c) => {

  const body = await c.req.json()
  const channelAccessToken = c.env.CHANNEL_ACCESS_TOKEN || process.env.CHANNEL_ACCESS_TOKEN || ''
  const openaiApiKey = c.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY || ''

  const events = body.events
  const promises = events.map((event: webhook.Event) => handleEvent(event, channelAccessToken, openaiApiKey))
  await Promise.all(promises)

  return c.text('OK')
})

const handleEvent = async (
  event: webhook.Event,
  accessToken: string,
  openaiApiKey: string
) => {
  if (event.type !== 'message' || event.message.type !== 'text') return;
  if (!event.replyToken) return;
  const { text } = event.message;
  fetch('https://api.line.me/v2/bot/chat/loading/start', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"chatId": event.source?.userId})
  })
  const chat = await createChat(openaiApiKey, text);
  const messages = createMessages(chat) as messagingApi.Message[]
  const responseBody: messagingApi.ReplyMessageRequest = {
    replyToken: event.replyToken,
    messages: messages 
  }
  // `${chat.storeList}`
  return fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(responseBody)
  })
}

export default app
