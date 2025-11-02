<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"
  import Link from "../../components/Link.svelte"

</script>


<main>

  <section class="topLayout" id="" lang="jp">
    <!-- モバイル用：テキストブロック -->
    <div class="texts-container">
      <div>
      <h2 class="hero__title bold">
        新たな分野を切り拓く<br>
        戦略的投資として、<br>
        グローバル事業の推進を図る。
      </h2>
      <p class="h7 half"lang="en">
        Global business <br>
        as a strategic investment
      </p>

      </div>
    </div>
    
    
    <div class="image-container w100">
      <img class="pz" src="../../image/TC_business_international_1.webp" alt="" loading="eager" decoding="async" />
      <!-- PC時のみ有効化されるオーバーレイ -->
      <div class="hero__overlay" aria-hidden="true"></div>
    </div>
  </section>
  
  <section class="business-wrapper">
    <div class="wrapper">

      <div class="container">
        <h3 class="h2 bold">オーストラリア</h3>
        <h4 class="h6 half "lang="en">Australia</h4>
        <p>新たな分野を切り拓く戦略的投資（海外事業）として、グローバル化の進展を事業拡大の好機と捉え、オーストラリアを中心に海外展開を推進しています。<br><br>
          オーストラリアは南半球に位置する広大な国で、豊かな自然環境と多文化社会が特徴です。国土は世界第6位の広さを誇り、乾燥地帯から熱帯雨林、サンゴ礁まで多様な自然を有します。主要都市はシドニー、メルボルン、ブリスベン、パースなどで、移民を積極的に受け入れることで多様な文化が共存。鉱業や農業、教育、観光、不動産など幅広い産業が発展しており、安定した政治・経済基盤を背景に高い生活水準を実現しています。</p>
        <img class="pz" src="../../image/TC_business_international_1.webp" alt="" loading="eager" decoding="async" />
      </div>


    </div>
  </section>
  


</main>



<style>


.business-wrapper {
  margin-top: 8rem;
  
}
.business-wrapper .container {
  padding-left: calc(1 * var(--padding));
  margin-bottom: 8rem;
}

.business-wrapper .container p {
  margin: 1rem 0 3rem;
  opacity: .9;
}
.business-wrapper .container img {width: calc(100% + var(--padding));}


.business-wrapper .container:nth-of-type(2),
.business-wrapper .container:nth-of-type(3) {
  width: 100vw;
  margin-left: calc(-1*(var(--padding)));
  background-color: var(--textColor);
  padding-left: calc(2 * var(--padding));
  padding-right: var(--padding);
  position: relative;
}
.business-wrapper .container:nth-of-type(2) div,
.business-wrapper .container:nth-of-type(3) div {transform: translateY(8rem);}
.business-wrapper .container:nth-of-type(2) * {color: white;}

.business-wrapper .container:nth-of-type(2) {margin-bottom: 0;position: relative;z-index: 1;}

.business-wrapper .container:nth-of-type(3) {
  padding-top: 8rem;
  background-color: #eee;
}

.business-wrapper .container:nth-of-type(4) {transform: translateY(8rem);}




.topLayout {
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.topLayout .texts-container {
    margin-top: 50px;
  height: 50vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.topLayout .texts-container p {margin: 8px 0 20px;}

.topLayout .image-container {
  width: 100vw;
  height: 50vh;
  height: 50svh;
}

.topLayout .image-container img {height: 100%;}








/* --------- PC：画像全面・左下にオーバーレイ＋テキスト重ね --------- */
@media (min-width: 960px){


  .business-wrapper .container {
    padding-left: calc(2 * var(--pcPadding));
    padding-right: calc(2 * var(--pcPadding));
  }

  .business-wrapper .container:nth-of-type(2),
  .business-wrapper .container:nth-of-type(3) {
    margin-left: calc(-1 * (var(--pcPadding)));
    padding-left: calc(2.5 * var(--pcPadding));
    padding-right: calc(2.5 * var(--pcPadding));
  }

  .business-wrapper .container:nth-of-type(2) img,
  .business-wrapper .container:nth-of-type(3) img {width: 100%;}







  .topLayout .texts-container{
    position: absolute;
    top: auto;
    bottom: 90px;
    left: 90px;
    z-index: 1;
    height: auto;
  }
  .topLayout .texts-container * {color: white;fill:white;}


  .topLayout .image-container {
    width: calc(100vw - 60px);
    height: calc(100vh - 65px - 60px);
    height: calc(100dvh - 65px - 60px);
    margin-left: 0;
    position: absolute;
    top: auto;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0%);
  }


  .topLayout .image-container .hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, var(--overlay-from) 0%, var(--overlay-to) 55%);
    pointer-events: none;
  }


}


</style>