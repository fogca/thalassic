import type { Lang } from '$lib/utils/lang';

export const dict = {
  heading: {
    ja: 'その土地とともに<br>次の100年の価値を育んでいく。',
    zh: '一家深植本土文化、致力于塑造城市未来的房地产公司。',
    en: 'A real estate division rooted <br>in the local culture and shaping the future'
  },
  real1h: {
    ja: '国内の不動産事業',
    zh: '日本房地产业务',
    en: 'Real Estate in Japan'
  },

  real1p: {
    ja: '私たちは、収益不動産を中心に「買取・再生・仲介・管理」の全フェーズをワンストップで手掛ける不動産総合サービスを展開しています。買取事業においては、市場価値を精緻に分析し、自社で直接購入。リノベーションやバリューアップを施すことで不動産の潜在能力を引き出し、次なるオーナー様への販売へと繋げます。運営フェーズでは、中長期的な収益最大化を目的とした賃貸管理から、円滑な事業承継のサポートまでを網羅。さらに、収益物件に特化した仲介サービスを通じて、経験豊富なスタッフが安心かつスピード感のある取引を実現します。',
    zh: '我们提供贯穿收益型物业全生命周期的综合房地产服务：收购, 改造, 中介,管理。我们专注于被忽视的机会，将严谨的分析与本地市场洞察相结合，收购并重新定位表现不佳的资产，将其转化为稳定的创收投资。通过实践性管理，我们提升现金流、租户质量和长期资产表现，为业主提供注重实效的解决方案。我们以投资为导向的经纪服务，确保交易透明、高效且专业管理。',
    en: 'Thalassic Real Estate provides integrated real estate services across the lifecycle of income-producing properties: acquisition, revitalisation, Brokerage, and Management. We focus on overlooked opportunities, combining disciplined analysis with local market insight to acquire and reposition underperforming assets into stable, income-generating investments. Through hands-on management, we enhance cash flow, tenant quality, and long-term asset performance—supporting owners with practical, results-driven solutions. Our investment-focused brokerage delivers transactions that are transparent, efficient, and professionally managed.'
  },
  real2h: {
    ja: '事例紹介',
    zh: '案例介绍',
    en: ''
  },
  real3h: {
    ja: '海外不動産事業',
    zh: '海外房地产业务',
    en: ''
  },
  real3s: {
    ja: 'グローバル化の進展を事業拡大の好機と捉え、<br>オーストラリアを中心に海外展開を推進',
    zh: '秉持长期投资理念，<br>业务范围从日本延伸至澳大利亚。',
    en: 'Guided by a long-term investment perspective,<br>operations extend beyond Japan to Australia.'
  },
  real3p: {
    ja: '新たな分野を切り拓く戦略的投資（海外事業）として、グローバル化の進展を事業拡大の好機と捉え、オーストラリアを中心に海外展開を推進しています。オーストラリアは南半球に位置する広大な国で、豊かな自然環境と多文化社会が特徴です。国土は世界第6位の広さを誇り、乾燥地帯から熱帯雨林、サンゴ礁まで多様な自然を有します。',
    zh: '作为开拓新领域的战略投资（海外业务），我们将全球化进程视为业务拓展的良机，以澳大利亚为中心推进海外发展。澳大利亚位于南半球，是一个幅员辽阔的国家，以丰富的自然环境和多元文化社会为特色。国土面积居世界第六，拥有从干旱地带到热带雨林、珊瑚礁等多样化的自然景观。',
    en: 'Our international initiatives connect Japanese and Australian markets through investment partnerships, cross-border advisory, and collaborative development. By combining local expertise with international networks, we support investors seeking stable real estate exposure across both regions.'
  },
  city1: {
    ja: '1. 人口増加による住宅需要高<br>2. オーストラリアの金融・経済の中心地<br>3. 賃貸物件の慢性的な供給不足<br>4. 安定的な資産保全を目指した設計',
    zh: '1. 人口驱动型住房需求<br>2. 澳大利亚金融经济中心<br>3. 成熟区域供应受限<br>4. 以长期资本保值为导向',
    en: '1. Population-driven housing demand<br>2.Australia’s financial and economic centre<br>3.Limited supply in established areas<br>4.Designed for long-term capital preservation'
  },
  city2: {
    ja: '1. 移民による人口増加<br>2. 経済拡大による需要増加<br>3. 賃貸物件の慢性的な供給不足<br>4. 安定した市場による安定した賃料収入',
    zh: '1. 移民推动的人口增长<br>2. 经济扩张带动住宅需求<br>3. 租赁供应结构性紧张<br>4. 成熟市场收益导向',
    en: '1.Population growth supported by migration<br>2.Expanding economy supporting residential demand<br>3.Structurally constrained rental supply<br>4.Income-focused in a developed market'
  },
  buy: {
    ja: '不動産買取',
    zh: '收购',
    en: ''
  },
  revitalisation: {
    ja: '再生事業',
    zh: '改造',
    en: ''
  },
  brokerage: {
    ja: '不動産仲介',
    zh: '中介',
    en: ''
  },
  management: {
    ja: '賃貸管理',
    zh: '管理',
    en: ''
  },
  dev: {
    ja: '不動産開発',
    zh: '开发',
    en: ''
  },


  
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


