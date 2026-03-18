import type { Lang } from '$lib/utils/lang';

export const dict = {
  heroBody: {
    ja: '「その土地と共に、次の100年を形づくる」<br>不動産のプロフェッショナルとして、私たちはその土地を深く理解し、<br>地域と共に歩みながら、未来へ続く価値を創造します。',
    zh: '「与这片土地共同塑造下一个百年」<br>作为房地产领域的专业团队，我们深入学习每一片土地，<br>与地区共同前行，创造延续至未来的价值。',
    en: 'Embracing the richness of place, shaping the next hundred years.'
  },

  identityBody: {
    ja: '私たちサラシックキャピタルは、日本・オーストラリアを拠点とする不動産・ホスピタリティグループです。多様な文化圏から集う各分野のプロフェッショナルが、地域に根ざした責任ある事業展開を進めています。私たちが目指すのは、潜在力を長期的な価値へと転換すること。それは、地域の未来が輝くプロジェクトの創造です。',
    zh: '我们是一家以日本和澳大利亚为据点的综合型房地产公司，致力于发掘城市与土地的潜在价值，将潜力转化为可持续的长期价值，通过高质量的开发与运营，打造推动地区未来发展的优质项目。',
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
