<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/layout/Footer.svelte"
  import Bannar from "../../components/RecruitBannar.svelte"
  import Identity from "../../components/snippets/Identity.svelte"
  import Gradation from "../../components/snippets/Gradation.svelte"

  import { t } from './about.dict';
  import { lang } from '$lib/utils/lang';
    
  

</script>


<main id="About">

  <div class="fixedGrad">
    <Gradation />
  </div>


  <section class="topLayout topLayoutPages" id="">
    <div class="texts-container">
      <div></div>
      <div>
        <h1 class="h5 white" lang="en" data-animate="fade-up">About Us</h1>
        <h2 class="h1 hero__title white mb-20 mt-40" lang="en" data-animate="fade-up">Creating Value<br>that Endures</h2>
        <h3 class="h5 hero__subtitle white mt-10" data-animate="fade-up">{@html t('heading', $lang)}</h3>
      </div>
      
    </div>
    <div class="image-container w100" style="display: none;">
      <img class="pz" src="/images/top_05.webp" alt="" loading="eager" decoding="async" />
    </div>
    
  </section>


  <section class="bodyLayout aboutBody">

    
    <div class="wrapper">
      <p class="mb-40" data-animate="fade-up">{@html t('about', $lang)}</p>
      <Identity />
    </div>


    

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
    <h3 class="h1 white" lang="en" data-animate="fade-up">Company Profile</h3>
    <h4 class="h5 white mt-10" data-animate="fade-up">{@html t('company_profile_heading', $lang)}</h4>
    <div class="wrapper">
      <div class="wrap" data-animate="fade-stagger">
        <div class="container">
          <div class="h6 white">{t('firm_heading', $lang)}</div>
          <div class="h5 white">{t('firm_main', $lang)}</div>
        </div>
        <div class="container">
          <div class="h6 white">{t('location_heading', $lang)}</div>
          <div class="h5 white">{@html t('firm_location', $lang)}</div>
        </div>
        <div class="container">
          <div class="h6 white">{t('establishment_heading', $lang)}</div>
          <div class="h5 white">{t('firm_establishment', $lang)}</div>
        </div>
        <div class="container">
          <div class="h6 white">{t('capital_heading', $lang)}</div>
          <div class="h5 white">{t('firm_capital', $lang)}</div>
        </div>
        <div class="container">
          <div class="h6 white">{t('representative_heading', $lang)}</div>
          <div class="h5 white">{t('firm_representative', $lang)}</div>
        </div>

      </div>

      <div class="wrap" data-animate="fade-stagger">
        <h3 class="h5">{@html t('subsidiary1_heading', $lang)}</h3>
        <div class="container">
          <div class="h6 white">{t('firm_heading', $lang)}</div>
          <div class="h5 white" lang="en">{t('firm_name', $lang)}</div>
        </div>
        <div class="container">
          <div class="h6 white">{t('location_heading', $lang)}</div>
          <div class="h5 white">{@html t('firm_location2', $lang)}</div>
        </div>
      </div>

      <div class="wrap" data-animate="fade-stagger">
        <h3 class="h5">{@html t('subsidiary2_heading', $lang)}</h3>
        <div class="container">
          <div class="h6 white">{t('firm_heading', $lang)}</div>
          <div class="h5 white" lang="en">THALASSIC  CAPITAL PTY LTD</div>
        </div>
        <div class="container">
          <div class="h6 white">{t('location_heading', $lang)}</div>
          <div class="h5 white" lang="en">105/311 Hay St, Perth, WA, Australia</div>
        </div>
      </div>

      <div class="mt-80">
        <h3 class="h2 white mb-20" lang="en">Our Belief</h3>
        <img src="/images/about-logo.png" alt="">
        <p class="white mt-20">{@html t('logo_belief', $lang)}</p>
      </div>
      
    </div>
    
  </section>

  <section class="bodyLayout aboutRecruit" id="Recruitment">
    <hr class="sp mb-40">
    <h3 class="h1 white" lang="en" data-animate="fade-up">Recruitment</h3>
    <h4 class="h5 white mt-10" data-animate="fade-up">{@html t('recruit_heading', $lang)}</h4>
    <div class="wrap" data-animate="fade-stagger">
      <h4 class="h0 white" lang="en">Join Our Team!
        <img src="/images/about-character_01.png" class="" alt="">
        <img src="/images/about-character_02.png" class="" alt="">
        <img src="/images/about-character_03.png" class="" alt="">
        <img src="/images/about-character_04.png" class="" alt="">
      </h4>
      <p data-animate="fade-up">{@html t('recruit', $lang)}
        <img src="/images/about_recruit.png" class="" alt="">
      </p>
      
    </div>
    

    
      
    <div class="container aboutList">

      
      <h5 class="h3 white">{@html t('recruit_career_heading', $lang)}</h5>
      <div class="container">
        <div class="h6 half white"><br>{@html t('recruit_career_title', $lang)}</div>
        <div class="h4 white mt-40 mb-20">{@html t('recruit_career_1', $lang)}<br>{@html t('recruit_career_2', $lang)}<br>{@html t('recruit_career_3', $lang)}</div>
      </div>

      <div class="container">
        <div class="h6 half" style="display: none;">勤務体系</div>
        <div class="h5" style="display: none;">フルフレックス（コアタイムなし）<br>1日の標準労働時間は実働8時間、休憩1時間（時短勤務も相談可）</div>
      </div>

      <div class="container"style="display: none;">
        <div class="h6 half">給与</div>
        <div class="h5">経験・能力を考慮し、当社規定によって決定いたします</div>
      </div>

      <div class="container"style="display: none;">
        <div class="h6 half">福利厚生</div>
        <div class="h5">各種保険完備 / 健康診断補助 / 交通費手当：10,000円／月</div>
      </div>

      <div class="container"style="display: none;">
        <div class="h6 half">休日休暇</div>
        <div class="h5">土日、祝日、特別休暇、有給休暇（初年度13日）</div>
      </div>
  
    </div>

    <div class="container aboutList" style="display: none;">
      <h5 class="h3">01. {@html t('recruit_career_1', $lang)}</h5>
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

    <div class="container aboutList"  style="display: none;">
      <h5 class="h3">02. {@html t('recruit_career_2', $lang)}</h5>
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

    <div class="container aboutList" style="display: none;">
      <h5 class="h3">03. {@html t('recruit_career_3', $lang)}</h5>
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

    <div class="contact container">
      <p class="mt-40">{@html t('contact', $lang)}</p>
      <a href="/contact" class="button h5 mt-30 sans" lang="en">Contact Form</a>
    </div>
    

    <style>

    #Recruitment .container {position: relative;}

    #Recruitment .wrap h4 img {
      display: none;
      width: 70px;
      margin-left: -15px;
      margin-bottom: -15px;
    }
    
    #Recruitment img.character {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -105px;
      left: auto;
      right: 0;
    }



    @media screen and (max-width: 834px) {
      #Recruitment .wrap h4 img {display: none;}
      #Recruitment .wrap h4 {font-size: 32px; margin: 40px 0 5px;}
      #Recruitment hr {margin: 0 0 60px;}
    }

    .contact {width: 45%;margin-left: auto;margin-right: 0;}
      
    </style>
    

  </section>

  

</main>







<style>

#About * {
  color: white;
}
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



@media screen and (max-width: 834px) {
  
  #About .topLayout h2.h1 {
    font-size: 32px;
    line-height: 1.4;
    margin: 20px 0 10px;
    margin-left: -2px;
    
  }
  .aboutCompany {margin-top: 100px;}
  .aboutCompany .wrapper {margin-top: 20px;}
  .aboutCompany .wrapper .wrap .container .h5 {font-size: 14px;}

  .aboutRecruit {margin-top: 100px;}
  .aboutRecruit h3.h1 {font-size: 18px;}
  .aboutRecruit .wrap {margin-top: 20px;}
  #Recruitment .wrap h4 img {width: 35px;}

  #Recruitment img.character {top: -55px;}
}





@media screen and (min-width: 960px) {


  #About .topLayout h2.h1 {
    font-size: clamp(28px, 4vw, 64px);
    line-height: 1.2;
  }
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



</style>