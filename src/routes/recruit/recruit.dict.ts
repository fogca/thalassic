import type { Lang } from '$lib/utils/lang';

export const dict = {
  heading: {
    ja: 'わたしたちは、<br>土地の価値を未来へ繋いでいく<br>仲間を募集しています。',
    zh: '',
    en: ''
  },
  
  sub: {
    ja: '採用情報',
    zh: '',
    en: 'Career'
  },
  recruit: {
    ja:'私たちは不動産と宿泊という二つの軸から地域の価値を創出する会社です。柔軟な発想や誠実さを大切にし、長く続く価値を一緒に生み出すメンバーを募集しています。<br class="sp"><br class="sp">詳しい募集キャリアは以下をご覧ください',
    zh:'我们是一家从房地产与住宿两方面共同创造地域价值的公司。重视灵活创意与诚信，招募能一起创造长久价值的成员。详情请见下方招聘信息。',
    en:'We are a company that creates local value through both real estate and hospitality. We value flexible thinking and integrity, and we welcome members who want to build lasting value together. See below for open roles.'
  }

  
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


