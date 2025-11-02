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
        サラシック不動産<br>
        地域の風土に根ざし、<br>
        未来を形づくる<br>
        不動産部門  
      </h2>
      <p class="h7 half"lang="en">
        THALASSIC Real Estate — <br>
        Specialists Rooted in Place.
      </p>
  
      </div>
    </div>
    
    
    <div class="image-container w100">
      <img class="pz sp" src="../../image/TC_business_international.jpg" alt="" loading="eager" decoding="async" />
      <img class="pz pc" src="../../image/TC_top@pc.png" alt="" loading="eager" decoding="async" />
      <!-- PC時のみ有効化されるオーバーレイ -->
      <div class="hero__overlay" aria-hidden="true"></div>
    </div>
  </section>

  <section class="business-wrapper">
    <div class="wrapper">

      <div class="container">
        <h3 class="h2 bold">不動産売買</h3>
        <h4 class="h6 half "lang="en">Real Estate Sales</h4>
        <p>当社では、収益不動産を主とした買取事業を行っています。お客様の大切な不動産を当社が直接購入し、リノベーションなどで価値を高めた後、不動産クラウドファンディング商品として運用したり、新たに購入を希望される方へ販売いたします。当社では、収益不動産を主とした買取事業を行っています。お客様の大切な不動産を当社が直接購入し、リノベーションなどで価値を高めた後、不動産クラウドファンディング商品として運用したり、新たに購入を希望される方へ販売いたします。</p>
        <img class="pz" src="../../image/TC_business_international.jpg" alt="" loading="eager" decoding="async" />
      </div>

      <div class="container">
        <div class="div">
        <h3 class="h2 bold">賃貸管理</h3>
        <h4 class="h6 half "lang="en">Rental Management</h4>
        <p>当社は収益最大化を目指し、物件管理から事業承継に至るまでをワンストップでサポートいたします。収益物件の安定した運営を実現するため、中長期的な視点からご提案を行います。オーナー様にとって大きな課題である「資産価値の維持・向上」や「空室対策」についても、競合物件や周辺環境の変化を専門的に調査し、収益向上を支援するとともに、次世代への円滑な承継を実現します。</p>
        <img class="pz" src="../../image/TC_business_international.jpg" alt="" loading="eager" decoding="async" />
        </div>
      </div>

      <div class="container">
        <div class="div">
        <h3 class="h2 bold">不動産仲介</h3>
        <h4 class="h6 half "lang="en">Real Estate Brokerage</h4>
        <p>当社は収益不動産や事業用不動産を中心に仲介を行っており、特に収益性不動産と高級住宅の仲介サービスに注力しています。売主様と買主様の橋渡し役として、経験豊かなスタッフが、ご相談から物件のご紹介や調査、条件の調整、契約、引渡しまでを一貫してサポートし、安心・円滑な不動産取引を実現いたします。</p>
        <img class="pz" src="../../image/TC_business_international.jpg" alt="" loading="eager" decoding="async" />
      </div>
      </div>

      <div class="container">
        <h3 class="h2 bold">民宿事業</h3>
        <h4 class="h6 half "lang="en">B&B Business</h4>
        <p>名古屋という都市を、文化と感性で再発見する。
          名古屋という都市が持つ、独自のリズムや文化に触れるための滞在を提案しています。歴史ある街並みと現代的な感性が混ざり合う地域で、Airbnbを中心に複数の宿泊拠点を展開。そこでは、観光では見えない“名古屋の日常”を、食・建築・人との関わりを通じて体感できます。滞在のかたちは多様でも、どの拠点にも共通するのは「その土地の空気を感じる」という価値です。</p>
        <img class="pz" src="../../image/TC_business_international.jpg" alt="" loading="eager" decoding="async" />
      </div>

    </div>
  </section>
  


</main>



<style>


.business-wrapper {
  margin-top: 8rem;
  
}
.business-wrapper .container {
  padding-left: calc(1.5 * var(--padding));
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
  padding-left: calc(2.5 * var(--padding));
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