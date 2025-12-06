import type { Lang } from '$lib/utils/lang';

export const dict = {
  subheading: {
    ja: 'キャリア・採用に関して',
    zh: '职业发展与招聘',
    en: 'Career and Recruitment'
  }
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


