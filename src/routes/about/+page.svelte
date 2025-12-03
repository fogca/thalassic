<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"

  import { t } from './about.dict';
  import { lang } from '$lib/lang';
  

</script>


<main id="About">

  <div class="fixedGrad">
    <div class="gradation">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

  <section class="topLayout topLayoutPages" id="">
    <div class="texts-container">
      <div></div>
      <div>
        <h1 class="h4"lang="en">Recruitment</h1>
        <h2 class="h1 hero__title bold">{@html t('heading', $lang)}</h2>
      </div>
      <div class="h6 half">{@html t('sub', $lang)}</div>
    </div>
    <div class="image-container w100" style="display: none;">
      <img class="pz" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />
    </div>
    
  </section>


  <section class="bodyLayout aboutBody">

    
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

.aboutBody {margin-top: -60vh;}


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

  #About .texts-container {margin-top: 10vh;}
  #About .texts-container h2 {font-size: 3.6rem;}
}



#About * {color: white;}
#About section {position: relative; z-index: 1;}

#About .aboutList .container::before,
#About .aboutValue .container:nth-of-type(3)::after,
#About .aboutCompany .container:nth-of-type(5)::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: .5px;
  background-color: white;
}

.fixedGrad {
  position: fixed;
  z-index: 0;
}
.gradation {
    width: 100vw;
    height: 100vh;
    position: relative;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
}

.gradation div {
    position: absolute;
    border-radius: 50%;
    animation: gradient 4s infinite;
}

@keyframes gradient {
    70% {
        transform: scale(1.5) translate(60px);
    }
}

.gradation div:nth-child(1) {
    height: 90%;
    width: 80%;
    background-color: #ced1c8;
    left: -29%;
    top: -10%;
}

.gradation div:nth-child(2) {
    height: 80%;
    width: 70%;
    background-color: #73bdda;
    top: -12%;
    right: -12%;
    animation-delay: .8s;
}

.gradation div:nth-child(3) {
    height: 65%;
    width: 80%;
    background-color: #0664a3;
    bottom: -15%;
    right: -20%;
    animation-delay: 0.3s;
}

.gradation div:nth-child(4) {
    height: 50%;
    width: 75%;
    background-color: #d3aea3;
    bottom: -10%;
    left: -18%;
    animation-delay: 1.2s;
}

.gradation::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    backdrop-filter: blur(80px);
}

</style>