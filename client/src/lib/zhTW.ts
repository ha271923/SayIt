/**
 * 简体 → 繁體（台灣用語）轉換。fork 自訂：界面文案與辨識輸出一律以繁體中文呈現。
 *
 * 用 OpenCC 的 cn → twp 方案：除了字形，也轉台灣慣用詞（软件→軟體、视频→影片）。
 * 純前端、離線，不連網。
 */
import * as OpenCC from 'opencc-js'

const convert: (text: string) => string = OpenCC.Converter({ from: 'cn', to: 'twp' })

/** 轉成繁體；空字串或非字串原樣返回，轉換失敗時保留原文，不讓輸出因此中斷。 */
export function toTraditional(text: string): string {
  if (!text) return text
  try {
    return convert(text)
  } catch {
    return text
  }
}

/** 整張文案表逐值轉換，key 不動（`{name}` 這類占位符是 ASCII，不受影響）。 */
export function toTraditionalTable<T extends Record<string, string>>(table: T): T {
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(table)) {
    out[key] = toTraditional(value)
  }
  return out as T
}
