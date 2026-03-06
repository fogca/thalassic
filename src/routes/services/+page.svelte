<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/layout/Footer.svelte"
  import Link from "../../components/snippets/Link.svelte"
  import Hotel from "../../components/snippets/Hotel.svelte"

  import { t } from './services.dict';
  import { lang } from '$lib/utils/lang';

</script>


<main class="Services_Page">

  <section class="topLayout topLayoutPages" id="">
    <div class="texts-container">
      <div></div>
      <div>
        <h1 class="h2 hero__title uppercase" lang="en">Woven with<br>local soul.</h1>
        <h2 class="h5 hero__subtitle">{@html t('heading', $lang)}</h2>
      </div>
      <div class="h6 half">{@html t('sub', $lang)}</div>
    </div>
    <div class="image-container w100">
      <img class="pz" src="/images/hotel_01.webp" alt="" loading="eager" decoding="async" />
    </div>
  </section>


  <section class="serviceBody">
    <div class="l-Contents">
      <div class="heading">
        <h2 class="" lang="en">Concept</h2>
        <h5>フィロソフィー</h5>
      </div>
      <div class="container">
        <p>
        名古屋の空気を静かに味わう宿泊体験。<br>
        木と石が持つ静かな調和を基調に、<br>
        名古屋という都市の文化と感性を<br>
        再発見するための滞在を創ります。<br>
        <br>
        日本の伝統技能や職人にルーツを持つ「木石」の思想は、<br>
        素材そのものの美しさと、余白を生かした静けさを大切にします。<br>
        その感性を基盤に、名古屋の人の営みを体感できる場を設計します。<br>
        <br>
        土地の物語と素材の温もりを静かに深く味わう。<br>
        その土地を楽しむ新しい滞在のかたち。
        </p>
      </div>
    </div>
  </section>

  

  
  <section>
    <div class="l-Contents">
      <div class="heading">
        <h2 class="" lang="en">What’s<br>Mokuseki</h2>
        <h5>木石という思想</h5>
      </div>
      <div class="container">
        <img class="pz" src="/images/hotel_02.webp" alt="" loading="eager" decoding="async" />
        <p>{@html t('concept', $lang)}</p>
      </div>
    </div>
  </section>


  <section class="serviceAcc mar">

    <h3 class="h1" lang="en">Accommodation</h3>
    <p>{@html t('accommodation', $lang)}</p>
    
    <div class="wrapper">

      <Hotel />

      
    </div>
    
    

  </section>

</main>


<style>

.serviceImage {margin-left: 0;height: 60vh;}
.Services_Page * {color: #272726;}

.serviceAcc .wrapper {margin-top: 2rem;}


.serviceAcc .wrapper {
  width: 100%;
  height: 100%;
}


@media screen and (min-width:720px) {

  .serviceAcc .w100,
  .serviceBody .w100 {
    width: 100%;
    margin-left: 0;
  }

  .serviceBody {
    margin-top: 4rem;
    margin-bottom: 160px;
  }


  .serviceAcc {margin: 12rem 0 16rem;}

}

</style>



