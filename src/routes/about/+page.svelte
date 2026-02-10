<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"
  import Bannar from "../../components/RecruitBannar.svelte"
  import Identity from "../../components/snippet/Identity.svelte"

  import { t } from './about.dict';
  import { lang } from '$lib/utils/lang';
    import { materialRoughness } from 'three/tsl';
  

</script>


<main id="About">

  <div>

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
        <h1 class="h4"lang="en">About Us</h1>
        <h2 class="h1 hero__title bold">{@html t('heading', $lang)}</h2>
      </div>
      <div class="h6 half" style="opacity:0;">{@html t('sub', $lang)}</div>
    </div>
    <div class="image-container w100" style="display: none;">
      <img class="pz" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />
    </div>
    
  </section>


  <section class="bodyLayout aboutBody">

    
    <div class="wrapper">
      <p>{@html t('about', $lang)}</p>
    </div>

    <Identity />
    

  </section>


  <section class="aboutValue aboutList" style="display: none;">
    
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
    <h3 class="h1" lang="en">Company Profile</h3>

    <div class="wrapper">
      <div class="wrap">
        <div class="container">
          <div class="h6">商号</div>
          <div class="h5">THALASSIC CAPITAL株式会社</div>
        </div>
        <div class="container">
          <div class="h6">所在地</div>
          <div class="h5">451-0034<br>愛知県名古屋市西区樋の口町1-15</div>
        </div>
        <div class="container">
          <div class="h6">設立</div>
          <div class="h5">2021年</div>
        </div>
        <div class="container">
          <div class="h6">資本金</div>
          <div class="h5">30,000,000円</div>
        </div>
        <div class="container">
          <div class="h6">代表</div>
          <div class="h5">J Wang</div>
        </div>
      </div>

      <div class="wrap">
        <h3 class="h5">子会社</h3>
        <div class="container">
          <div class="h6">商号</div>
          <div class="h5" lang="en">THALASSIC不動産 株式会社</div>
        </div>
        <div class="container">
          <div class="h6">所在地</div>
          <div class="h5" lang="en">Level 4, 524 Hay St. Perth, WA 6000</div>
        </div>
      </div>

      <div class="wrap">
        <h3 class="h5">海外支社</h3>
        <div class="container">
          <div class="h6">商号</div>
          <div class="h5" lang="en">THALASSIC  CAPITAL Ltd, Pty.  / Australia</div>
        </div>
        <div class="container">
          <div class="h6">所在地</div>
          <div class="h5" lang="en">Level 4, 524 Hay St. Perth, WA 6000</div>
        </div>
      </div>

      

      

    </div>
    
  </section>

  <section class="bodyLayout aboutRecruit" id="Recruitment">
    <hr>
    <h3 class="h1" lang="en">Recruitment</h3>
    <div class="wrap">
      <h4 class="h0" lang="en">Join Our Team!</h4>
      <p>{@html t('recruit', $lang)}</p>
    </div>
      
    <div class="container aboutList">
      
      <h5 class="h3">募集要項</h5>
      <div class="container">
        <div class="h6 half"><br>募集人材</div>
        <div class="h5">不動産営業<br>不動産管理<br>SNS・コンテンツクリエイター</div>
      </div>

      <div class="container">
        <div class="h6 half">勤務体系</div>
        <div class="h5">フルフレックス（コアタイムなし）<br>1日の標準労働時間は実働8時間、休憩1時間（時短勤務も相談可）</div>
      </div>

      <div class="container">
        <div class="h6 half">給与</div>
        <div class="h5">経験・能力を考慮し、当社規定によって決定いたします</div>
      </div>

      <div class="container">
        <div class="h6 half">福利厚生</div>
        <div class="h5">各種保険完備 / 健康診断補助 / 交通費手当：10,000円／月</div>
      </div>

      <div class="container">
        <div class="h6 half">休日休暇</div>
        <div class="h5">土日、祝日、特別休暇、有給休暇（初年度13日）</div>
      </div>
  
    </div>

    <div class="container aboutList">
      <h5 class="h3">01. 不動産営業</h5>
      <div class="container">
        <p><br>不動産営業職<br>
          投資用・居住用不動産の売買仲介および販売戦略の立案・実行、顧客への提案書作成、プレゼンテーション、交渉、契約業務、物件調査、価格査定、販売資料の作成、契約後フォロー
          <br><br>
          必須要件<br>不動産売買仲介または営業経験（年数不問）<br>顧客ニーズに合わせた提案力とコミュニケーション能力<br>普通自動車免許（AT限定可）
          <br><br>
          好ましい資格・技能<br>宅地建物取引士資格<br>英語・中国語
        </p>
      </div>
    </div>

    <div class="container aboutList">
      <h5 class="h3">02. 不動産管理</h5>
      <div class="container">
        <p><br>不動産営業職<br>
          投資用・居住用不動産の売買仲介および販売戦略の立案・実行、顧客への提案書作成、プレゼンテーション、交渉、契約業務、物件調査、価格査定、販売資料の作成、契約後フォロー
          <br><br>
          必須要件<br>不動産売買仲介または営業経験（年数不問）<br>顧客ニーズに合わせた提案力とコミュニケーション能力<br>普通自動車免許（AT限定可）
          <br><br>
          好ましい資格・技能<br>宅地建物取引士資格<br>英語・中国語
        </p>
      </div>
    </div>

    <div class="container aboutList">
      <h5 class="h3">03. SNS・コンテンツクリエイター</h5>
      <div class="container">
        <p><br>不動産営業職<br>
          投資用・居住用不動産の売買仲介および販売戦略の立案・実行、顧客への提案書作成、プレゼンテーション、交渉、契約業務、物件調査、価格査定、販売資料の作成、契約後フォロー
          <br><br>
          必須要件<br>不動産売買仲介または営業経験（年数不問）<br>顧客ニーズに合わせた提案力とコミュニケーション能力<br>普通自動車免許（AT限定可）
          <br><br>
          好ましい資格・技能<br>宅地建物取引士資格<br>英語・中国語
        </p>
      </div>
    </div>

    

    <style>
      
    </style>
    

  </section>

  

</main>







<style>
  .bannar {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: white;
    z-index: 5;
    display: flex;
    align-items: center;
  }


#About section:nth-last-of-type(1) {padding-bottom: 10rem;}
.aboutBody {margin-top: -75vh;}


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
.aboutValue .container:last-of-type(1)::after,
.aboutCompany .container:last-of-type(1)::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: .5px;
  background-color: #ccc;
}

.aboutCompany .wrapper .wrap h3 {margin: 60px 0 20px;}

.aboutCompany .container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.8rem 0 1.5rem;
}
.aboutCompany .container div:nth-of-type(1) {width: 30%;}
.aboutCompany .container div:nth-of-type(2) {width: 70%;}

.aboutList .container::before {top: 0;}
.aboutList .container::after {top: auto;bottom:0;}

.aboutValue .wrapper {margin-top: 12rem;}

.aboutCompany .wrapper {margin-top: 8rem;}
.aboutRecruit .wrap {margin-top: 12rem;}
.aboutRecruit .wrap .h0 {font-size: 4.2rem;}

.aboutRecruit .aboutList {margin-top: 8rem;}
.aboutRecruit .aboutList h5 {margin-bottom: 2rem;}

@media screen and (min-width: 960px) {

  .aboutValue .wrapper,
  .aboutCompany .wrapper {
    width: 45%;
    margin-left: auto;
  }
  .aboutCompany .container div:nth-of-type(1) {width: 20%;}
  .aboutCompany .container div:nth-of-type(2) {width: 80%;}
  .aboutCompany .container {padding: 2.5rem 0 2rem;}
  #About .texts-container {margin-top: 10vh;}
  #About .texts-container h2 {font-size: 4rem;line-height: 1.4;}

  .aboutBody {
    margin-top: -42.5vh;
    margin-bottom: 3rem;
  }
  #About section:nth-last-of-type(1) {padding-bottom: 15rem;}

  .aboutValue .wrapper {margin-top: 6rem;}
  .aboutValue .container {padding: 2.5rem 0 2.5rem;}


  .aboutCompany .wrapper {margin-top: 0;}
  .aboutRecruit .wrap {
    padding-left: 25%;
    margin-top: 12rem;
  }
  .aboutRecruit .wrap .h0 {font-size: 6.4rem;}
  .aboutRecruit .wrap p {
    width: 60.000285%;
    margin-left: auto;
    margin-top: 3rem;
  } 
  .aboutRecruit .aboutList {margin-top: 6rem;}
  .aboutRecruit .aboutList h5 {padding-left: 25%;margin-bottom: -4rem;}
  .aboutRecruit .aboutList .container {width: 45%;margin-left: auto;}
  .aboutRecruit .aboutList .container:nth-of-type(1) {width: 75%;}
  .aboutRecruit .aboutList .container:nth-of-type(1) * {width: 60%;margin-left:auto;}
  

.aboutRecruit .wrap {
  padding-left: 25%;
  margin-top: 12rem;
}
.aboutRecruit .wrap .h0 {font-size: 6.4rem;}
.aboutRecruit .wrap p {
  width: 60%;
  margin-left: auto;
  margin-top: 3rem;
} 
.aboutRecruit .aboutList {margin-top: 6rem;}
.aboutRecruit .aboutList h5 {padding-left: 25%;margin-bottom: -4rem;}
.aboutRecruit .aboutList .container {width: 45%;margin-left: auto;}
.aboutRecruit .aboutList .container:nth-of-type(1) {width: 75%;}
.aboutRecruit .aboutList .container:nth-of-type(1) * {width: 60%;margin-left:auto;}
    

}



#About * {color: white;}
#About section {position: relative; z-index: 1;}

#About .aboutList .container::before,
#About .aboutValue .container:last-of-type::after,
#About .aboutCompany .container:last-of-type::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: .5px;
  background-color: rgba(255, 255, 255, .3);
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
        transform: scale(1.5) translate(80px);
    }
}

.gradation div:nth-child(1) {
    height: 90%;
    width: 80%;
    background-color: #ced1c8;
    background-color: #a8dae7;
    left: -30%;
    top: -10%;
}

.gradation div:nth-child(2) {
    height: 80%;
    width: 60%;
    background-color: #8ac5db;
    background-color: #83cce0;
    top: -10%;
    right: 0%;
    animation-delay: .8s;
}

.gradation div:nth-child(3) {
    height: 65%;
    width: 80%;
    background-color: #005fac;
    background-color: #062D7A;
    bottom: -15%;
    right: -20%;
    animation-delay: 0.3s;
}

.gradation div:nth-child(4) {
    height: 50%;
    width: 75%;
    background-color: #f1af9b;
    background-color: #e2d6c2;
    bottom: -10%;
    left: -50%;
    animation-delay: 1.2s;
}

.gradation::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    backdrop-filter: blur(120px);
}

</style>