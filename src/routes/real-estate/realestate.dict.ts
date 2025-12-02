import type { Lang } from '$lib/lang';

export const dict = {
  heading: {
    ja: 'サラシック不動産ー<br>風土を読み解き、地域とともに<br>未来へ続く価値を育んでいく。',
    zh: 'Thalassic Real Estate：<br>一家植根于当地文化并塑造未来的房地产公司。',
    en: 'Thalassic Real Estate: <br>A real estate division rooted <br>in the local culture and shaping the future'
  },
  sub: {
    ja: '国内外の不動産業',
    zh: 'Thalassic Real Estate：<br>一家植根于当地文化并塑造未来的房地产公司。',
    en: 'Thalassic Real Estate: <br>A real estate division rooted <br>in the local culture and shaping the future'
  },
  real1h: {
    ja: '不動産売買',
    zh: '房地产销售',
    en: 'Real estate sales'
  },
  real1p: {
    ja: '当社では、収益不動産を中心とした買取事業を展開しています。お客様が所有される大切な不動産を、仲介を介さず当社が直接購入し、市場価値や立地特性を丁寧に分析した上で、適切なリノベーションやバリューアップを施します。再生後の不動産は、当社が手掛ける不動産クラウドファンディング商品として運用するほか、新たに購入を希望される個人・法人のお客様へ販売し、次のオーナーへ価値ある資産として引き継いでいきます。買取から再生、運用、販売まで一貫して行うことで、スピード感のある取引と透明性の高い運用を実現し、不動産の新たな可能性を創出しています。',
    zh: '本公司主要从事收益型不动产的收购业务。<br>我们直接向业主购买物业，无需中介，并在深入分析市场价值、区位特性及潜在提升空间后，针对性地进行改造和价值提升。<br><br>完成再生后的物业将作为本公司的不动产众筹产品进行运营，或出售给寻求优质资产的个人或法人客户。通过集“收购—改造—运营—销售”于一体的一站式流程，我们实现快速而透明的交易流程，为不动产创造新的价值与可能性。',
    en: 'Our company specializes in acquiring income-producing real estate. We purchase properties directly from owners, then enhance their value through tailored renovations and strategic improvements.<br><br>After revitalization, these properties are either managed as part of our real estate crowdfunding products or sold to new individual and corporate buyers.<br>By handling acquisition, renovation, management, and resale in a unified process, we deliver efficient transactions and create new opportunities for real-estate value growth.'
  },
  real2h: {
    ja: '賃貸管理',
    zh: '租赁管理',
    en: 'Rental Management'
  },
  real2p: {
    ja: '当社は収益最大化を目指し、物件管理から事業承継に至るまでをワンストップでサポートいたします。収益物件の安定した運営を実現するため、中長期的な視点からご提案を行います。オーナー様にとって大きな課題である「資産価値の維持・向上」や「空室対策」についても、競合物件や周辺環境の変化を専門的に調査し、収益向上を支援するとともに、次世代への円滑な承継を実現します。',
    zh: '我们以实现资产收益最大化为目标，提供从物业管理到事业承继的一站式服务。<br>为了确保收益型不动产的稳定运营，我们基于中长期视角提出专业建议，并深入分析竞争物业与周边环境的变化。<br><br>我们协助业主维护与提升资产价值、解决空置问题、提高收益，并实现不动产向下一代的顺利承继。',
    en: 'We provide comprehensive, one-stop support for property owners—from asset management to business succession—aimed at maximizing long-term income. Our team offers mid- to long-term strategies to ensure stable operation of income-producing properties, including expert analysis of market competition and local trends. <br><br> We help owners maintain and enhance asset value, address vacancy challenges, improve profitability, and ensure a smooth transition of real estate assets to the next generation.'
  },
  real3h: {
    ja: '不動産仲介',
    zh: '房地产经纪',
    en: 'Real estate brokerage'
  },
  real3p: {
    ja: '当社は収益不動産や事業用不動産を中心に仲介を行っており、特に収益性不動産と高級住宅の仲介サービスに注力しています。売主様と買主様の橋渡し役として、経験豊かなスタッフが、ご相談から物件のご紹介や調査、条件の調整、契約、引渡しまでを一貫してサポートし、安心・円滑な不動産取引を実現いたします。',
    zh: '本公司主要从事收益型不动产及商业不动产的中介业务，尤其专注于高收益物业与高端住宅的买卖服务。<br><br>作为卖方与买方之间值得信赖的桥梁，我们经验丰富的团队将从咨询、物业介绍、调查、条件协调、签约到交付的全流程提供一站式支持，确保安全且顺畅的房地产交易体验。',
    en: 'We specialize in brokerage services for income-producing properties and commercial real estate, with a particular focus on high-yield investments and luxury residences.<br> Serving as a trusted intermediary between sellers and buyers, our experienced team provides full support throughout the entire process—from consultation and property introduction to due diligence, terms negotiation, contract execution, and final handover—ensuring a secure and seamless real estate transaction.'
  },
  real4h: {
    ja: '宿泊事業',
    zh: '民宿业务',
    en: 'B&B Business'
  },
  real4p: {
    ja: '名古屋という都市を、文化と感性で再発見する。 名古屋という都市が持つ、独自のリズムや文化に触れるための滞在を提案しています。歴史ある街並みと現代的な感性が混ざり合う地域で、Airbnbを中心に複数の宿泊拠点を展開。そこでは、観光では見えない“名古屋の日常”を、食・建築・人との関わりを通じて体感できます。滞在のかたちは多様でも、どの拠点にも共通するのは「その土地の空気を感じる」という価値です。',
    zh: '以文化与感性重新发现名古屋。<br>我们提供的住宿体验，旨在让您触碰这座城市独特的节奏与文化纹理。在多处以Airbnb为中心的住宿据点中，历史街景与现代美学交织的区域，让您通过饮食、建筑、人们的生活往来，感受那些观光无法看见的“名古屋的日常”。无论住宿形式如何变化，所有据点都拥有同一价值：感受这片土地的空气。',
    en: 'Rediscover Nagoya through culture and sensibility.<br>We offer stays designed to connect you with the city’s unique rhythm and cultural layers.<br>Across several Airbnb-based locations, set within neighborhoods where historic streets blend with contemporary aesthetics, guests can experience an authentic “everyday Nagoya” that typical sightseeing cannot reveal—through food, architecture, and encounters with local people.<br>No matter the style of stay, each location shares a single value: to feel the atmosphere of the place itself.'
  },


  



  
};

export function t<K extends keyof typeof dict>(key: K, lang: Lang) {
  return dict[key][lang];
}


