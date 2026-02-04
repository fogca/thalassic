<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"
  import Link from "../../components/Link.svelte"
  
  import { t } from './realestate.dict';
  import { lang } from '$lib/utils/lang';

  const rows = [
    // 1行目: 大・中・中
    [
      { src: '/image/TC_business_international.webp', alt: 'Image 1' },
      { src: '/image/TC_business_international.webp', alt: 'Image 2' },
      { src: '/image/TC_business_international.webp', alt: 'Image 3' },
    ],
    // 2行目: 小・中・大
    [
      { src: '/image/TC_business_international.webp', alt: 'Image 4' },
      { src: '/image/TC_business_international.webp', alt: 'Image 5' },
      { src: '/image/TC_business_international.webp', alt: 'Image 6' },
    ],
    // 3行目: 大・小・中
    [
      { src: '/image/TC_business_international.webp', alt: 'Image 7' },
      { src: '/image/TC_business_international.webp', alt: 'Image 8' },
      { src: '/image/TC_business_international.webp', alt: 'Image 9' },
    ],
  ];

</script>


<main>

  <section class="topLayout topLayoutPages" id="">
    <div class="texts-container">
      <div></div>
      <div>
        <h1 class="h2 hero__title uppercase" lang="en">Forging the next<br>century’s form.</h1>
        <h2 class="h5 hero__subtitle">{@html t('heading', $lang)}</h2>
      </div>
      <div></div>
    </div>
    <div class="image-container w100">
      <img class="pz" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />
    </div>
  </section>


  <section class="BusinessDetails">

    <div class="l-Contents wrapper">
      <div class="heading">
        <h2 class="" lang="en">Business<br>details</h2>
        <h5>国内不動産事業</h5>
      </div>
      <div class="container">
        <div class="Illustration">
          <div class="box">
            <img class="pz" src="../../image/Illust/4.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Acquisitions</h3>
          </div>
          <div class="box">
            <img class="pz" src="../../image/Illust/1.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Revitalisation</h3>
          </div>
          <div class="box">
            <img class="pz" src="../../image/Illust/2.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Brokerage Services</h3>
          </div>
          <div class="box">
            <img class="pz" src="../../image/Illust/3.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Property Management</h3>
          </div>
        </div>
        <p>当社は、収益不動産を中心に「買取・再生・管理・仲介」の全フェーズをワンストップで手掛ける不動産総合サービスを展開しています。買取事業においては、市場価値を精緻に分析し、自社で直接購入。リノベーションやバリューアップを施すことで不動産の潜在能力を引き出し、次なるオーナー様への販売へと繋げます。運営フェーズでは、中長期的な収益最大化を目的とした賃貸管理から、円滑な事業承継のサポートまでを網羅。さらに、収益物件に特化した仲介サービスを通じて、経験豊富なスタッフが安心かつスピード感のある取引を実現します。</p>
        
        <style>
          .Illustration {
            width: 100%;
            background-color: #fafafa;
            border-radius: 10px;
            display: flex;
            padding: 30px;
            margin-bottom: 30px;
          }
          .Illustration .box {margin: 0 10px;}
          .Illustration .box img {border-radius: 10px}
        </style>
        <!--<p>{@html t('real4p', $lang)}</p>
        <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />
        -->
      </div>
    </div>

    <div class="l-Contents wrapper">
      <div class="heading">
        <h2 class="" lang="en">Case<br>study</h2>
        <h5>事例紹介</h5>
      </div>
      <div class="container Gallery">

      {#each rows as row, rowIndex}
        <div class="row" data-row={rowIndex + 1}>
        {#each row as image}
          <div class="container">
            <img src={image.src} alt={image.alt} />
          </div>
        {/each}
        </div>
      {/each}

      </div>
    </div>
    <style>
    .Gallery {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    height: 70vh;
  }
  .Gallery .row {display: grid;gap: 5px;}
  .Gallery .row[data-row="1"] {grid-template-columns: 2fr 1fr 1fr;}
  .Gallery .row[data-row="2"] {grid-template-columns: 0.8fr 1.2fr 2fr;}
  .Gallery .row[data-row="3"] {grid-template-columns: 2fr 0.8fr 1.2fr;}
  .Gallery img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .Gallery .container {width:100%;}
    </style>

  </section>

  <section class="GlobalBusiness">
    <img class="w100" src="../../image/THALASSIC_Global_01.webp" alt="" loading="eager" decoding="async" />     
    <div class="l-Contents wrapper">
      <div class="heading">
        <h2 class="" lang="en">Global<br>Business</h2>
        <h5>海外不動産事業</h5>
      </div>
      <div class="container">
        <h5 class="h3 bold">グローバル化の進展を事業拡大の好機と捉え、<br>オーストラリアを中心に海外展開を推進</h5>
        <p>新たな分野を切り拓く戦略的投資（海外事業）として、グローバル化の進展を事業拡大の好機と捉え、オーストラリアを中心に海外展開を推進しています。オーストラリアは南半球に位置する広大な国で、豊かな自然環境と多文化社会が特徴です。国土は世界第6位の広さを誇り、乾燥地帯から熱帯雨林、サンゴ礁まで多様な自然を有します。</p>
        <div class="box">
          <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />     
          <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />     
          <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />     
          <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />     
        </div>
      </div>
    </div>
  </section>
  
  


</main>



<style>

.GlobalBusiness {margin-top: 180px;}
.GlobalBusiness img.w100 {height: 50vh;}
.GlobalBusiness .box {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}


</style>