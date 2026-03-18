<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/layout/Footer.svelte"
  import Link from "../../components/snippets/Link.svelte"
  
  import { t } from './realestate.dict';
  import { lang } from '$lib/utils/lang';

  const rows = [
    // 1行目: 大・中・中
    [
      { src: '/images/property-case_01.jpg', alt: 'Image 1' },
      { src: '/images/property-case_03.jpg', alt: 'Image 2' },
      { src: '/images/property-case_04.jpg', alt: 'Image 3' },
    ],
    // 2行目: 小・中・大
    [
      { src: '/images/property-case_08.jpg', alt: 'Image 8' },
      { src: '/images/property-case_06.jpg', alt: 'Image 5' },
      { src: '/images/property-case_05.jpg', alt: 'Image 4' },
    ],
    // 3行目: 大・小・中
    [
      { src: '/images/property-case_02.jpg', alt: 'Image 7' },
      { src: '/images/property-case_07.jpg', alt: 'Image 6' },
      
      
    
    ],
  ];

</script>


<main>

  <section class="topLayout topLayoutPages" id="">
    <div class="texts-container">
      <div></div>

      <div>
        <h1 class="h2 hero__title uppercase" lang="en">
          BUILDING LASTING VALUE<br>THROUGH REAL ESTATE
        </h1>
        <h2 class="h5 hero__subtitle sans">{@html t('heading', $lang)}</h2>
      </div>
      <div></div>
    </div>
    <div class="image-container w100">
      <img class="pz" src="/images/top_05.webp" alt="" loading="eager" decoding="async" />
    </div>
  </section>


  <section class="BusinessDetails">

    <div class="l-Contents wrapper">
      <div class="heading">
        <h2 class="" lang="en">Business<br>details</h2>
        <h5>{t('real1h', $lang)}</h5>
      </div>
      <div class="container">
        <div class="Illustration">
          <div class="box">
            <img class="pz" src="/images/property-character_04.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Acquisitions</h3>
            <h4 class="h6 center">{t('buy', $lang)}</h4>
          </div>
          <div class="box">
            <img class="pz" src="/images/property-character_01.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Revitalisation</h3>
            <h4 class="h6 center">{t('revitalisation', $lang)}</h4>
          </div>
          <div class="box">
            <img class="pz" src="/images/property-character_02.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Brokerage</h3>
            <h4 class="h6 center">{t('brokerage', $lang)}</h4>
          </div>
          <div class="box">
            <img class="pz" src="/images/property-character_03.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Management</h3>
            <h4 class="h6 center">{t('management', $lang)}</h4>
          </div>
        </div>
        <p>{@html t('real1p', $lang)}</p>
        <style>

        </style>
        <!--<p>{@html t('real4p', $lang)}</p>
        <img class="pz" src="/images/property-global_01.webp" alt="" loading="eager" decoding="async" />
        -->
      </div>
    </div>

    <div class="l-Contents wrapper">
      <div class="heading">
        <h2 class="" lang="en">Case<br>study</h2>
        <h5>{t('real2h', $lang)}</h5>
      </div>
      <div class="container Gallery">

      {#each rows as row, rowIndex}
        <div class="row" data-row={rowIndex + 1}>
        {#each row as image}
          <div class="container">
            <img src={image.src} alt={image.alt} />
            <div class="overlay"></div>
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
    height: 100%;
  }
  .Gallery .row {display: grid;gap: 5px;}
  .Gallery .row[data-row="1"] {grid-template-columns: 2fr 1fr 1fr;}
  .Gallery .row[data-row="2"] {grid-template-columns: 0.8fr 1.2fr 2fr;}
  .Gallery .row[data-row="3"] {grid-template-columns: 1.8fr 2.2fr;}
  .Gallery img {
    width: 100%;
    height: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
    filter: saturate(.25) contrast(1.1) brightness(1.0);
  }
  

  .Gallery .row .container {position:relative;}
  .Gallery .row .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0,50,120,0.25);
    
    position: absolute;
    top: 0;
    left: 0;
  }
  .Gallery .container {width:100%;}
    </style>

  </section>

  <section class="GlobalBusiness">
    <img class="w100" src="/images/property-global_02.jpg" alt="" loading="eager" decoding="async" />     
    <div class="l-Contents wrapper">
      <div class="heading">
        <h2 class="" lang="en">Global<br>Business</h2>
        <h5>{t('real3h', $lang)}</h5>
      </div>
      <div class="container">
        <img class="" src="/images/property-career_01.webp" alt="" loading="eager" decoding="async" />     
        <h5 class="h4 bold">{@html t('real3s', $lang)}</h5>
        <p>{@html t('real3p', $lang)}</p>

        <div class="Illustration">
          
          <div class="box">
            <img class="pz" src="/images/property-character_01.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Development</h3>
            <h4 class="h6 center">{t('dev', $lang)}</h4>
          </div>
          <div class="box">
            <img class="pz" src="/images/property-character_02.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Brokerage</h3>
            <h4 class="h6 center">{t('brokerage', $lang)}</h4>
          </div>
          <div class="box">
            <img class="pz" src="/images/property-character_03.png" alt="" loading="eager" decoding="async" />
            <h3 class="h4 center" lang="en">Management</h3>
            <h4 class="h6 center">{t('management', $lang)}</h4>
          </div>
        </div>

      </div>

    </div>

    <div class="city">
      <div class="container">
        <h2 lang="en" class="h2 mb-20">Sydney</h2>
        <img class="" src="/images/global_1.png" alt="" loading="eager" decoding="async" />     
        <h3 class="h4 mt-20 mb-10" lang="en">Core Long-Term Market</h3>
        <p>{@html t('city1', $lang)}</p>
      </div>
      <div class="container">
        <h2 lang="en" class="h2 mb-20">Perth</h2>
        <img class="" src="/images/recruit_01.jpg" alt="" loading="eager" decoding="async" />   
        <h3 class="h4 mt-20 mb-10" lang="en">Growth & Income Market</h3>
        <p>{@html t('city2', $lang)}</p>
      </div>
    </div>

  </section>
  
  


</main>



<style>





  .GlobalBusiness .city {
    width: 100%;
    display: flex;
    margin-bottom: 100px;
  }
  .GlobalBusiness .city .container {width: 44%;margin-right: 1%;}
  .GlobalBusiness .city .container:last-of-type {width: 55%; margin-right: 0;}

.GlobalBusiness .container img:nth-of-type(1) {height: 40vh;}
.GlobalBusiness .container h5 {margin: 30px 0 10px;}
.GlobalBusiness {margin-top: 180px;}
.GlobalBusiness img.w100 {height: 50vh;}
.GlobalBusiness .box {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.Illustration {
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  padding: 30px 25px 20px;
  margin-bottom: 30px;
}
.Illustration .box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.Illustration .box img,
.GlobalBusiness .container .Illustration img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}
.GlobalBusiness .Illustration {margin-top: 40px;}


.Illustration .box h4 {margin-top: 0px;}


.GlobalBusiness .Illustration {grid-template-columns: 1fr 1fr 1fr; gap: 20px;}


</style>