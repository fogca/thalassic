import type { Lang } from '$lib/lang';

export const dict = {
  heading: {
    ja: '出会いを大切に、<br>広がる未来を共に築く。',
    zh: '珍惜每一次相遇，<br>携手共创更美好的未来',
    en: 'Cherishing our encounters <br>and building a brighter <br>future together'
  }
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


