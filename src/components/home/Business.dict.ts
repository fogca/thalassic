import type { Lang } from '$lib/lang';

export const dict = {
  subheading: {
    ja: 'サラシックの事業内容',
    zh: '业务详情',
    en: 'Business Overview'
  },
  business1: {
    ja: '不動産売買・賃貸管理・不動産仲介',
    zh: '业务详情',
    en: 'Real Estate Sales & Rental Management etc'
  },
  business2: {
    ja: 'オーストラリアを中心に海外展開を推進',
    zh: '房地产买卖、租赁管理、房地产经纪',
    en: 'Promoting overseas expansion, primarily in Australia'
  },
  business3: {
    ja: '宿泊事業やその他の活動',
    zh: '住宿业务及其他活动',
    en: 'Accommodation business and other activities'
  },
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


