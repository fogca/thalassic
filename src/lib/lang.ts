// src/lib/lang.ts
import { writable } from 'svelte/store';

export type Lang = 'ja' | 'zh' | 'en';

// グローバル言語ストア（既定は en）
export const lang = writable<Lang>('en');

// ブラウザの言語から ja / zh / en を決定
export function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'en';
  const prefs = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];

  const pick = (l: string): Lang => {
    const s = l.toLowerCase();
    if (s.startsWith('ja')) return 'ja';
    if (s.startsWith('zh')) return 'zh'; // zh-CN/zh-TW/zh-HK なども吸収
    return 'en';
  };

  for (const l of prefs) {
    const r = pick(l);
    // 先頭の優先候補を採用
    return r;
  }
  return 'en';
}