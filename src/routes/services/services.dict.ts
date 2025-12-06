import type { Lang } from '$lib/utils/lang';

export const dict = {
  heading: {
    ja: '空気と文化を纏い、暮らすように<br>泊まる。旅の記憶になる<br>滞在体験をお届けする。',
    zh: '通过战略性投资开拓新领域，<br>推动全球业务的发展。',
    en: 'Drive global expansion <br>through strategic investments that <br>open new fields of opportunity.'
  },
  sub: {
    ja: '宿泊・オフィス事業',
    zh: '澳大利亚——我们全球战略的起点',
    en: 'Australia – <br>The Starting Point of <br>Our Global Strategy'
  },
  concept: {
    ja: '素材の静けさと、土地の空気。<br class="sp">名古屋の“今”を静かに味わうための宿泊体験。<br><br class="sp">木と石が宿す静謐な調和を基調に、<br class="sp">名古屋という都市の文化と感性を<br class="sp">再発見するための滞在を創ります。<br><br>日本の伝統技能や職人にルーツを持つ<br class="sp">「木石」の思想は、<br class="pc">素材そのものの美しさと、<br class="sp">余白を生かした静けさを大切にします。<br>その感性を基盤に、名古屋を<br class="sp">“過去と現在が響き合う都市”として捉え、<br>観光の表層ではなく、土地が持つ<br class="sp">呼吸・生活のリズム・人の営みを体感できる<br class="sp">場を設計します。<br><br>土地の物語と素材の温もりを<br class="sp">静かに深く味わう。<br class="pc">その土地を楽しむ<br class="sp">新しい滞在のかたち。',
    zh: '作为开拓新领域的战略性海外投资，本公司将全球化的推进视为业务扩张的重要契机，重点布局澳大利亚市场。<br>澳大利亚以稳定的政治与经济基础、多元文化的城市结构及成熟的房地产市场著称，为长期投资与发展提供了良好环境。<br><br>我们的海外团队由曾在澳大利亚学习或工作的成员组成，凭借扎根当地的经验与人脉网络，使我们能够更深入地理解市场，并积极推进房地产收购、开发及多种合作机会。<br><br>未来，我们将继续强化在澳大利亚的布局，通过战略性的全球扩展，为客户与投资者创造更高价值。',
    en: 'As a strategic investment into new global markets, we are expanding our overseas business with a focus on Australia.<br>Australia’s stable economy, multicultural cities, and strong real-estate market provide an ideal foundation for long-term growth.<br><br>Our international team was originally formed in Australia, where many of us studied or worked. This shared background gives us deep local insight and trusted networks, enabling us to actively pursue property acquisitions, development opportunities, and partnerships across the country.<br><br>We will continue strengthening our presence in Australia while creating new value through strategic global expansion.'
  },
  accommodation: {
    ja: '運営する宿泊施設',
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


