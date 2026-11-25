// opencc-js 沒有附帶型別定義，這裡只宣告用到的部分。
declare module 'opencc-js' {
  export function Converter(options: { from: string; to: string }): (text: string) => string
}
