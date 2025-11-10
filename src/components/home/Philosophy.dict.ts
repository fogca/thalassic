import type { Lang } from '$lib/lang';

export const dict = {
  subheading: {
    ja: 'ビジネスフィロソフィー',
    zh: '商业理念',
    en: 'Our Philosophy'
  },
  paragraph: {
    ja: 'サラシックキャピタルは、日本、中国、<br>オーストラリアを中心に、パートナー企業と<br>世界各地をつなぐ架け橋を築きます。',
    zh: 'Thalassic Capital 致力于搭建桥梁，<br>连接世界各地的合作伙伴公司，<br>尤其关注日本、中国和澳大利亚。',
    en: 'Thalassic Capital builds bridges <br>connecting partner companies <br>with all over the world, <br>with a focus on Japan, China and Australia.'
  },
  heading: {
    ja: 'お客様とのひとつひとつの<br>出会いを大切にし、<br>常にお客様と共に。',
    zh: '我们珍视与客户的<br>每一次接触，<br>并始终与他们同在。',
    en: 'We value each and <br>every encounter with <br>our customers and are always <br>with them.'
  }
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


