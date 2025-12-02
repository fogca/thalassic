<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"

  import { t } from './about.dict';
  import { lang } from '$lib/lang';
  

</script>


<main id="About">

  <section class="topLayout topLayoutPages" id="">
    <div class="texts-container">
      <div></div>
      <div>
        <h1 class="h4"lang="en">Recruitment</h1>
        <h2 class="h1 hero__title bold">{@html t('heading', $lang)}</h2>
      </div>
      <div class="h6 half">{@html t('sub', $lang)}</div>
    </div>
    <div class="image-container w100">
      <img class="pz" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />
    </div>
  </section>


  <section class="bodyLayout">

    <h3 class="h1" lang="en">About Us</h3>
    <div class="wrapper">
      <p>{@html t('about', $lang)}</p>
    </div>
    

  </section>


  <section class="bodyLayout aboutValue aboutList">

    <h3 class="h1" lang="en">Value</h3>
    <div class="wrapper">

      <div class="container">
        <div class="h4" lang="en">01</div>
        <div class="box">
          <div class="h2" lang="en">Local Insight</div>
          <div class="h6 half">その地域の個性を読み解き、<br>土地の持つポテンシャルを最大限引き出します。</div>
        </div>
      </div>

      <div class="container">
        <div class="h4" lang="en">02</div>
        <div class="box">
          <div class="h2" lang="en">Cross-Cultural Perspective</div>
          <div class="h6 half">日本やオーストラリア、中国など様々なバックグラウンドを持つプロフェッショナルが集まり、<br class="pc">多様で国際的な視点が新たな価値をつくリます。</div>
        </div>
      </div>

      <div class="container">
        <div class="h4" lang="en">03</div>
        <div class="box">
          <div class="h2" lang="en">Long-Term Value</div>
          <div class="h6 half">短期的な利益ではなく、土地に根ざす持続的な価値を優先します。</div>
        </div>
      </div>

    </div>
    
  </section>

  <section class="bodyLayout aboutCompany aboutList">

    <h3 class="h1" lang="en">Company</h3>
    <div class="wrapper">

      <div class="container">
        <div class="h6" lang="en">Firm</div>
        <div class="h4">THALASSIC CAPITAL株式会社</div>
      </div>

      <div class="container">
        <div class="h6" lang="en">Established</div>
        <div class="h4">2021年</div>
      </div>

      <div class="container">
        <div class="h6" lang="en">Capital</div>
        <div class="h4">30,000,000円</div>
      </div>

      <div class="container">
        <div class="h6" lang="en">Head Office</div>
        <div class="h4">451-0034 愛知県名古屋市西区樋の口町1-15</div>
      </div>

      <div class="container">
        <div class="h6" lang="en">Subsidiary</div>
        <div class="h4" lang="en">THALASSIC  CAPITAL Ltd, Pty.  / Australia</div>
      </div>

    </div>
    
  </section>


</main>



<style>

  #About {padding-bottom: 8rem;}

.aboutValue .wrapper,
.aboutCompany .wrapper {width: 100%;margin-left: 0;}
.aboutValue .container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem 0 1.3rem;
}
.aboutValue .container .box {margin-left: 3rem;}


.aboutList .container {position: relative;}
.aboutList .container::before,
.aboutValue .container:nth-of-type(3)::after,
.aboutCompany .container:nth-of-type(5)::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: .5px;
  background-color: #ccc;
}

.aboutList .container::before {top: 0;}
.aboutList .container::after {top: auto;bottom:0;}

.aboutCompany .container {padding: 1.3rem 0 1.2rem;}


@media screen and (min-width: 960px) {

  .aboutValue .wrapper,
  .aboutCompany .wrapper {
    width: 60%;
    margin-left: auto;
  }

}

</style>