export interface gptResponse {
  storeList: typeof storeList
}
export const storeList = [
  '板橋',
  '板橋前野',
  'マリンピア',
  '稲毛',
  '千葉みなと',
  '東雲',
  '東久留米',
  '品川シーサイド',
  '海浜幕張',
]

export const correctStoreName = {
  '板橋': 'イオン板橋ショッピングセンター',
  '板橋前野': 'イオンスタイル板橋前野',
  'マリンピア': 'イオンマリンピアショッピングセンター',
  '稲毛': 'イオン稲毛店',
  '千葉みなと': 'イオンスタイル千葉みなと',
  '東雲': 'イオンスタイル東雲',
  '東久留米': 'イオン東久留米店',
  '品川シーサイド': 'イオンスタイル品川シーサイド',
  '海浜幕張': 'イオン海浜幕張店',
} as const;

export type StoreName = keyof typeof correctStoreName;