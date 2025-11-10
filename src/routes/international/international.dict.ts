import type { Lang } from '$lib/lang';

export const dict = {
  heading: {
    ja: '新たな分野を切り拓く<br>戦略的投資として、<br>グローバル事業の推進を図る。',
    zh: '通过战略性投资开拓新领域，<br>推动全球业务的发展。',
    en: 'Drive global expansion <br>through strategic investments that <br>open new fields of opportunity.'
  },
  int1h: {
    ja: 'グローバル戦略の出発点<br>オーストラリア',
    zh: '澳大利亚——我们全球战略的起点',
    en: 'Australia – <br>The Starting Point of <br>Our Global Strategy'
  },
  int1p: {
    ja: '新たな分野を切り拓く戦略的投資（海外事業）として、当社はグローバル化の進展を事業拡大の好機と捉え、オーストラリアを中心に海外展開を推進しています。<br><br>オーストラリアは、南半球に広がる自然豊かな多文化国家であり、シドニー、メルボルン、ブリスベン、パースなどの主要都市では、移民を受け入れることで多様な文化が共存し、鉱業・農業・教育・観光・不動産など多岐にわたる産業が発展しています。安定した政治・経済基盤のもと、世界的に見ても高い生活水準を誇る国です。<br><br>当社のメンバーは、オーストラリアで学業・キャリアを通じて出会ったメンバーを中心に構成されており、現地での経験とコミュニティに根ざしたネットワークを強みとしています。この背景により、市場への深い理解と文化的感性を持ちながら、不動産を軸とした新たな事業の創出を積極的に進めています。<br><br>今後も、現地パートナーとの連携を強化しながら、投資機会の拡大、魅力ある物件の開発・取得を通じて、オーストラリアにおける収益事業をより強固に展開していきます。',
    zh: '作为开拓新领域的战略性海外投资，本公司将全球化的推进视为业务扩张的重要契机，重点布局澳大利亚市场。<br>澳大利亚以稳定的政治与经济基础、多元文化的城市结构及成熟的房地产市场著称，为长期投资与发展提供了良好环境。<br><br>我们的海外团队由曾在澳大利亚学习或工作的成员组成，凭借扎根当地的经验与人脉网络，使我们能够更深入地理解市场，并积极推进房地产收购、开发及多种合作机会。<br><br>未来，我们将继续强化在澳大利亚的布局，通过战略性的全球扩展，为客户与投资者创造更高价值。',
    en: 'As a strategic investment into new global markets, we are expanding our overseas business with a focus on Australia.<br>Australia’s stable economy, multicultural cities, and strong real-estate market provide an ideal foundation for long-term growth.<br><br>Our international team was originally formed in Australia, where many of us studied or worked. This shared background gives us deep local insight and trusted networks, enabling us to actively pursue property acquisitions, development opportunities, and partnerships across the country.<br><br>We will continue strengthening our presence in Australia while creating new value through strategic global expansion.'
  },
  int2h: {
    ja: '賃貸管理',
    zh: '租赁管理',
    en: 'Rental Management'
  },
  int2p: {
    ja: '当社は収益最大化を目指し、物件管理から事業承継に至るまでをワンストップでサポートいたします。収益物件の安定した運営を実現するため、中長期的な視点からご提案を行います。オーナー様にとって大きな課題である「資産価値の維持・向上」や「空室対策」についても、競合物件や周辺環境の変化を専門的に調査し、収益向上を支援するとともに、次世代への円滑な承継を実現します。',
    zh: '我们以实现资产收益最大化为目标，提供从物业管理到事业承继的一站式服务。<br>为了确保收益型不动产的稳定运营，我们基于中长期视角提出专业建议，并深入分析竞争物业与周边环境的变化。<br><br>我们协助业主维护与提升资产价值、解决空置问题、提高收益，并实现不动产向下一代的顺利承继。',
    en: 'We provide comprehensive, one-stop support for property owners—from asset management to business succession—aimed at maximizing long-term income. Our team offers mid- to long-term strategies to ensure stable operation of income-producing properties, including expert analysis of market competition and local trends. <br><br> We help owners maintain and enhance asset value, address vacancy challenges, improve profitability, and ensure a smooth transition of real estate assets to the next generation.'
  }
  
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


