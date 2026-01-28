import type { Lang } from '$lib/utils/lang';

export const dict = {
  realestate: {
    ja: '不動産事業',
    zh: '房地产业务',
    en: 'Real Estate'
  },
  hotel: {
    ja: '宿泊事業',
    zh: '住宿业务',
    en: 'Hotel'
  },
  about: {
    ja: '会社概要',
    zh: '公司概况',
    en: 'About Us'
  },
  recruit: {
    ja: '採用に関して',
    zh: '人才招聘',
    en: 'Recruitment'
  },
  contact: {
    ja: 'お問い合わせ',
    zh: '联系我们',
    en: 'Contact'
  },
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


