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
    ja:'不動産と宿泊の両軸から、地域の価値をともに創出する会社です。柔軟な発想や誠実さを大切にし、長く続く価値を一緒に生み出すメンバーを募集しています。<br class="sp"><br class="sp">詳しい募集キャリアは以下をご覧ください',
  }

  
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


