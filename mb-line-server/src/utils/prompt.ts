import { storeList } from "./storeList";

export const prompt = `
ユーザーがイオン（総合小売店）の店舗名を投げかけます。
次のstoreList${storeList}の中から該当しそうな店舗を、
{ storeList: string[] }
の型のJSONで返却してください
## 注意
該当候補がない場合からの配列を返してください
複数候補がある場合は1つに絞らず複数提案しても大丈夫です
`