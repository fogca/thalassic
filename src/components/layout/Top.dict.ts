import type { Lang } from '$lib/utils/lang';

export const dict = {
  heading: {
    ja: '出会いを大切に、<br>広がる未来を共に築く。',
    zh: '珍惜每一次相遇，<br>携手共创更美好的未来',
    en: 'Cherishing our encounters <br>and building a brighter <br>future together'
  },
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

  /* Business card categories (section.Business) */
  categoryHotel: {
    ja: '宿泊事業',
    zh: '住宿事业',
    en: ''
  },
  categoryRecruit: {
    ja: '採用情報',
    zh: '招聘信息',
    en: ''
  },
  categoryAbout: {
    ja: '会社情報',
    zh: '公司信息',
    en: ''
  },
  categoryRealEstate: {
    ja: '不動産事業',
    zh: '房地产事业',
    en: ''
  },
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}
