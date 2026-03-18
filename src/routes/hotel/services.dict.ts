import type { Lang } from '$lib/utils/lang';

export const dict = {
  heading: {
    ja: '空気と文化を纏い、暮らすように泊まる。<br>旅の記憶になる滞在体験をお届けする。',
    zh: '通过战略性投资开拓新领域，<br>推动全球业务的发展。',
    en: 'Drive global expansion <br>through strategic investments that <br>open new fields of opportunity.'
  },
  sub: {
    ja: '宿泊・オフィス事業',
    zh: '澳大利亚——我们全球战略的起点',
    en: 'Australia – <br>The Starting Point of <br>Our Global Strategy'
  },
  concept: {
    ja: '名古屋の空気を静かに味わう宿泊体験。<br>木と石が持つ静かな調和を基調に、<br>名古屋という都市の文化と感性を<br>再発見するための滞在を創ります。<br><br>日本の伝統技能や職人にルーツを持つ<br>「木石」の思想は、素材そのものの美しさと、<br>余白を生かした静けさを大切にします。<br>その感性を基盤に、名古屋の人の営みを<br>体感できる場を設計します。<br><br>土地の物語と素材の温もりを<br class="sp">静かに深く味わう。<br class="pc">その土地を楽しむ<br class="sp">新しい滞在のかたち。',
    zh: '静静品味名古屋气息的住宿体验。<br>以木与石的静谧和谐为基调，<br>打造一场重新发现名古屋<br>这座城市文化与感性的旅居。<br><br>源于日本传统技艺与匠人精神的<br>"木石"理念，珍视材质本身的美感，<br>以及留白所带来的宁静。<br>以此感性为基础，<br>设计一处能够感受名古屋人文生活的空间。<br><br>静静地、深深地品味<br>这片土地的故事与材质的温度。<br>享受当地风土的<br>全新旅居方式。',
    en: 'Our accommodations are designed for travelers who want to experience JAPAN beyond the surface.<br>Inspired by the balance of wood and stone, we shape environments that feel warm yet calm, simple yet refined. Each space is guided by proportion, light, and the character of its surroundings.<br>A stay with us is not about spectacle. It is about slowing down, observing, and living within the rhythm of the city.<br>To experience a place with intention. To discover a more thoughtful way of staying.'
  },
  mokuseki: {
    ja: 'わたしたちが大切にする「木石」の思想、<br>それは自然との調和であり、<br>日々の喧騒から静寂をもたらすものです。<br><br>木は暖かさや心地良さ、活力を象徴し、<br>石は静けさや力強さを表します。<br><br>こうした素材の力を随所に散りばめることで、<br>私たちのホスピタリティを体現しています。<br><br>私たちの宿泊施設は<br>「シンプルでいて豊かであること」、<br>「優雅でいて気取らないこと」、<br>「繊細でいて深く記憶に残ること」<br>を基準に設計しています。',
    zh: '我们珍视的"木石"理念，<br>是与自然的和谐共处，<br>是为日常喧嚣带来宁静。<br><br>木象征着温暖、舒适与活力，<br>石则代表着静谧与力量。<br><br>通过将这些材质的力量融入各处，<br>我们诠释着自己的待客之道。<br><br>我们的住宿设施以<br>"简约而丰盈"、<br>"优雅而不造作"、<br>"细腻而令人难忘"<br>为设计理念。',
    en: '“Mokuseki” expresses harmony between nature and everyday life.<br>Wood – warmth, comfort, vitality<br>Stone – stability, calmness, endurance<br><br>These elements shape our approach to hospitality.<br>Our accommodations are: <br>1. Minimal yet meaningful<br>2. Elegant yet approachable<br>3. Simple yet deeply memorable<br><br>Mokuseki is not a concept layered onto a space.'
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


