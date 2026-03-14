import type { Lang } from '$lib/utils/lang';

export const dict = {
  heroBody: {
    ja: '「その土地と共に、次の100年を形づくる」<br>私たちは不動産のプロフェッショナルとして、未来を見据えたビジョンを掲げ、<br>その土地を深く知り、地域と伴走しながら事業活動を進めてまいります。',
    zh: '「珍惜每一次相遇，<br>携手共创更美好的未来」<br>我们作为不动产的专业人士，展望未来，提出愿景，<br>深入了解土地，与地域同行，推进事业活动。',
    en: '「Shape the next 100 years with the land」<br>As real estate professionals, we envision a future and set a vision, <br>deeply understanding the land, walking alongside the region and advancing our business activities.'
  },
  subheading: {
    ja: 'サラシックの事業内容',
    zh: '业务详情',
    en: 'Business Overview'
  },
  identityBody: {
    ja: '私たちサラシックキャピタルは、日本・オーストラリアを拠点とする不動産・ホスピタリティグループです。多様な文化圏から集う各分野のプロフェッショナルが、地域に根ざした責任ある事業展開を進めています。私たちが目指すのは、潜在力を長期的な価値へと転換すること。それは、地域の未来が輝くプロジェクトの創造です。',
    zh: '业务详情',
    en: 'Thalassic Capital is a group enterprise based in Japan and Australia, operating across real estate investment and hospitality. We bring together professionals from diverse cultures and disciplines, united by a shared commitment to thoughtful development and responsible growth. Our purpose is simple: to transform potential into long-term value—projects that serve communities today while preparing them for tomorrow.'
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
