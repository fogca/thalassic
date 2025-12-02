import type { Lang } from '$lib/lang';

export const dict = {
  heading: {
    ja: 'わたしたちは、<br>土地の価値を未来へ繋いでいく<br>仲間を募集しています。',
    zh: 'Thalassic Real Estate：<br>一家植根于当地文化并塑造未来的房地产公司。',
    en: 'Thalassic Real Estate: <br>A real estate division rooted <br>in the local culture and shaping the future'
  },
  
  sub: {
    ja: '採用情報',
    zh: '房地产销售',
    en: 'Career'
  },

  
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


