import type { Lang } from '$lib/utils/lang';

export const dict = {
  item1Title: {
    ja: '01',
    zh: '01',
    en: '01'
  },
  item1Body: {
    ja: 'サラシックキャピタルの運用物件数',
    zh: '管理物业数量 / 在管物业数',
    en: 'Properties Under Management'
  },
  item2Title: {
    ja: '02',
    zh: '02',
    en: '02'
  },
  item2Body: {
    ja: 'サラシックキャピタルの年平均成長率',
    zh: '年均复合增长率',
    en: 'Compound Annual Growth Rate'
  },
  item3Title: {
    ja: '03',
    zh: '03',
    en: '03'
  },
  item3Body: {
    ja: 'サラシックキャピタルの運用資産残高 / AUM',
    zh: '资产管理规模',
    en: 'Assets Under Management'
  }
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}
