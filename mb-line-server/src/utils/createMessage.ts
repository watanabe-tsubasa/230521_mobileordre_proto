import { FlexMessage } from '@line/bot-sdk';
import { correctStoreName, gptResponse, StoreName } from './storeList';

export const flexTemplate: FlexMessage = {
  type: 'flex',
  altText: 'test',
  contents: {
    type: 'carousel',
    contents: []
  }
};

const generateFlexContent = (storeName: StoreName) => {
  return {
    "type": "bubble",
    "header": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": correctStoreName[storeName],
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "style": "primary",
          "action": {
            "type": "uri",
            "label": "Go",
            "uri": "https://www.aeon.jp/sc/itabashi/"
          }
        }
      ]
    }
  }
}

export const createMessages = (chat: gptResponse) => {
  if (chat.storeList.length === 0) {
    return [{
      type: 'text',
      text: 'まだ店舗が対応していないようです。他の店舗を探してください'
    }]
  } else {
    const flexContents = (chat.storeList as StoreName[]).map(elem => (generateFlexContent(elem)));
    return [{
      ...flexTemplate,
      contents: {
        ...flexTemplate.contents,
        contents: flexContents
      }
    }];
  }
};
