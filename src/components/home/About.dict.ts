import type { Lang } from '$lib/lang';

export const dict = {
  subheading: {
    ja: '会社概要',
    zh: '公司简介',
    en: 'Company Profile'
  },
  paragraph: {
    ja: 'サラシックキャピタルは、日本、中国、<br>オーストラリアを中心に、パートナー企業と<br>世界各地をつなぐ架け橋を築きます。',
    zh: 'Thalassic Capital 致力于搭建桥梁，<br>连接世界各地的合作伙伴公司，<br>尤其关注日本、中国和澳大利亚。',
    en: 'Thalassic Capital builds bridges <br>connecting partner companies <br>with all over the world, <br>with a focus on Japan, China and Australia.'
  },
  heading: {
    ja: '世界をつなぐ架け橋を築く会社。',
    zh: '一家建造连接世界的桥梁的公司。',
    en: 'A company that builds bridges <br>that connect the world.'
  }
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


