<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"
  import Grad from "../../components/RecruitGrad.svelte"

  import { t } from './recruit.dict';
  import { lang } from '$lib/lang';


  let sectionEl: HTMLElement;
</script>


<main>

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

  <section class="bodyLayout recruitAbout">
    <div class="wrapper">
      <p>{@html t('recruit', $lang)}</p>
    </div>    
  </section>


  <section class="bodyLayout recruitCareer aboutList">

    <h3 class="h2" lang="en">Career</h3>
    <div class="wrapper">

      <a href="/#career1" class="container">
        <div class="h4">不動産営業</div>
        <div class="h6 half">投資用・居住用不動産の販売戦略や売買仲介</div>
      </a>

      <a href="/#career2" class="container">
        <div class="h4">不動産管理</div>
        <div class="h6 half">賃貸物件の管理・対応</div>
      </a>

      <a href="/#career3" class="container">
        <div class="h4">SNS・コンテンツクリエイター</div>
        <div class="h6 half">各SNSの運用とマーケティング</div>
      </a>

    </div>
    
  </section>

  <section class="bodyLayout recruitBody">

    
    <div class="container" id="career1" bind:this={sectionEl}>
        
      <div class="recruitGrad">
        <div class="gradation">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="content">
      <h4 class="h2 bold">不動産営業</h4>
      <p><br>
        投資用・居住用不動産の売買仲介<br class="sp">
        および販売戦略の立案・実行、顧客への提案書作成、<br class="sp">
        プレゼンテーション、交渉、契約業務、物件調査、<br class="sp">
        価格査定、販売資料の作成、契約後フォロー
      </p>
      <hr>
      <p>必須要件<br>不動産売買仲介または営業経験（年数不問）<br>顧客ニーズに合わせた提案力とコミュニケーション能力<br>普通自動車免許（AT限定可）</p>
      <hr>
      <p>好ましい資格・技能<br>宅地建物取引士資格<br>英語・中国語</p>
      <hr>
      <p>募集人材<br>・チームワークを重視しながらも、目標達成に向けて自律的に行動できる方<br>・誠実で信頼される営業スタイルをお持ちの方<br>・当社のビジョンやブランドに共感し、長期的に成長したい方</p>
      <hr>
      <p>勤務体系<br>勤務時間：フルフレックス（コアタイムなし）<br>1日の標準労働時間は実働8時間、休憩1時間（時短勤務も相談可）<br>職務内容・就業場所について：会社の定める業務のため、上記の記載から変更される可能性があります。<br>休日休暇：火水、祝日、特別休暇、有給休暇（初年度13日）<br><br>試用期間：あり<br><br>福利厚生<br>各種保険完備 / 健康診断補助 / 交通費手当：10,000円／月 / 社員旅行</p>
    </div>
  </div>

  <div class="container" id="career1" bind:this={sectionEl}>
        
    <div class="recruitGrad">
      <div class="gradation">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="content">
    <h4 class="h2 bold">不動産営業</h4>
    <p><br>
      投資用・居住用不動産の売買仲介<br class="sp">
      および販売戦略の立案・実行、顧客への提案書作成、<br class="sp">
      プレゼンテーション、交渉、契約業務、物件調査、<br class="sp">
      価格査定、販売資料の作成、契約後フォロー
    </p>
    <hr>
    <p>必須要件<br>不動産売買仲介または営業経験（年数不問）<br>顧客ニーズに合わせた提案力とコミュニケーション能力<br>普通自動車免許（AT限定可）</p>
    <hr>
    <p>好ましい資格・技能<br>宅地建物取引士資格<br>英語・中国語</p>
    <hr>
    <p>募集人材<br>・チームワークを重視しながらも、目標達成に向けて自律的に行動できる方<br>・誠実で信頼される営業スタイルをお持ちの方<br>・当社のビジョンやブランドに共感し、長期的に成長したい方</p>
    <hr>
    <p>勤務体系<br>勤務時間：フルフレックス（コアタイムなし）<br>1日の標準労働時間は実働8時間、休憩1時間（時短勤務も相談可）<br>職務内容・就業場所について：会社の定める業務のため、上記の記載から変更される可能性があります。<br>休日休暇：火水、祝日、特別休暇、有給休暇（初年度13日）<br><br>試用期間：あり<br><br>福利厚生<br>各種保険完備 / 健康診断補助 / 交通費手当：10,000円／月 / 社員旅行</p>
  </div>
</div>

<div class="container" id="career1" bind:this={sectionEl}>
        
  <div class="recruitGrad">
    <div class="gradation">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div class="content">
  <h4 class="h2 bold">不動産営業</h4>
  <p><br>
    投資用・居住用不動産の売買仲介<br class="sp">
    および販売戦略の立案・実行、顧客への提案書作成、<br class="sp">
    プレゼンテーション、交渉、契約業務、物件調査、<br class="sp">
    価格査定、販売資料の作成、契約後フォロー
  </p>
  <hr>
  <p>必須要件<br>不動産売買仲介または営業経験（年数不問）<br>顧客ニーズに合わせた提案力とコミュニケーション能力<br>普通自動車免許（AT限定可）</p>
  <hr>
  <p>好ましい資格・技能<br>宅地建物取引士資格<br>英語・中国語</p>
  <hr>
  <p>募集人材<br>・チームワークを重視しながらも、目標達成に向けて自律的に行動できる方<br>・誠実で信頼される営業スタイルをお持ちの方<br>・当社のビジョンやブランドに共感し、長期的に成長したい方</p>
  <hr>
  <p>勤務体系<br>勤務時間：フルフレックス（コアタイムなし）<br>1日の標準労働時間は実働8時間、休憩1時間（時短勤務も相談可）<br>職務内容・就業場所について：会社の定める業務のため、上記の記載から変更される可能性があります。<br>休日休暇：火水、祝日、特別休暇、有給休暇（初年度13日）<br><br>試用期間：あり<br><br>福利厚生<br>各種保険完備 / 健康診断補助 / 交通費手当：10,000円／月 / 社員旅行</p>
</div>
</div>

  </section>

  


</main>



<style>
.recruitAbout {padding-top: 0;}
.recruitCareer a {display: block;}

.recruitBody hr {
  height: .5px; 
  background-color: rgba(200,200,200,1);
  border: 0;
  margin: 1.5rem 0;
}

.recruitBody .container {
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 4rem 3rem;
} 

.recruitBody .container {position: relative;margin-bottom: 6rem;}
.recruitBody .content {position: relative;}


.recruitGrad {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.gradation {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 1.5rem;
}


.gradation div {
  position: absolute;
  border-radius: 50%;
  animation: gradient 4s infinite;
}

@keyframes gradient {
  70% {
      transform: scale(1) translate(00px);
  }
}

.gradation div:nth-child(1) {
  height: 50%;
  width: 30%;
  background-color: #ffffff;
  left: -29%;
  top: -10%;
}

.gradation div:nth-child(2) {
  height: 50%;
  width: 30%;
  background-color: #a1e3ff;
  top: -12%;
  right: -12%;
  animation-delay: .8s;
}

.gradation div:nth-child(3) {
  height: 65%;
  width: 30%;
  background-color: #ffffff;
  bottom: -15%;
  right: -20%;
  animation-delay: 0.3s;
}

.gradation div:nth-child(4) {
  height: 50%;
  width: 35%;
  background-color: #fbc8b9;
  bottom: -10%;
  left: -18%;
  animation-delay: 1.2s;
}

.gradation::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  backdrop-filter: blur(50px);
}


@media screen and (min-width:720px) {


  .recruitCareer .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .recruitCareer .wrapper .container {
    margin-left: 5rem;
    padding: 2rem 0 1.8rem;
  }

  .recruitCareer .wrapper .container:nth-of-type(2)::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: .5px;
  background-color: #ccc;
}

  .recruitBody .container {
    width: 60%;
    margin-left: auto;
    margin-right: 0;
    padding: 5rem 5rem 3rem;
  }

  .recruitBody .container p {font-size: 1.3rem;}


}


</style>