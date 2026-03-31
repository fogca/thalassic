import type { Lang } from '$lib/utils/lang';

export const dict = {
  realestate: {
    ja: '不動産事業',
    zh: '房地产业务',
    en: 'Real Estate'
  },
  hotel: {
    ja: 'ホテル事業',
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

  footerAbout: {
    ja: '会社概要',
    zh: '公司概况',
    en: ''
  },
  footerRecruit: {
    ja: 'キャリア・採用に関して',
    zh: '人才招聘',
    en: ''
  },
  contactBody: {
    ja: 'プロジェクトへの参画や事業提携、<br>不動産活用のお悩みなど、<br>ぜひお気軽にご相談ください。',
    zh: '如您有意参与项目、建立业务合作伙伴关系，<br>或有任何房地产相关咨询，<br>欢迎随时与我们取得联系。',
    en: 'For project participation, business partnerships, <br>or any real estate-related enquiries, <br>please feel free to be in touch with us.'
  },
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


