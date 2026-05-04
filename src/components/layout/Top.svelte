<script lang="ts">
import { lang } from '$lib/utils/lang';
import { t } from './New.dict';
import { t as tTop } from './Top.dict';
import Orbit from '../snippets/Orbit.svelte';

type BusinessCategoryKey = 'categoryHotel' | 'categoryRecruit' | 'categoryAbout' | 'categoryRealEstate';

const cards: { image: string; categoryKey: BusinessCategoryKey; title: string; link: string }[] = [
  { image: '/images/hotel-accommodation_01.webp', categoryKey: 'categoryHotel', title: 'HOTEL', link: '/hotel' },
  { image: '/images/recruit_26a.webp', categoryKey: 'categoryRecruit', title: 'RECRUITMENT', link: '/about#Recruitment' },
  { image: '/images/top-about_01.webp', categoryKey: 'categoryAbout', title: 'ABOUT US', link: '/about' },
  { image: '/images/property-global_01.webp', categoryKey: 'categoryRealEstate', title: 'REAL ESTATE', link: '/real-estate' }
];
</script>







<section class="Identity mt-160 mb-80">
  <div class="wrapper">
    <div class="container">
      <div class="h5 sans uppercase" lang="en">GROUP COMPANY</div>
      <h2 class="h1 mb-10" lang="en">Three Identities,<br />One Collective Vision.</h2>
      <p>{t('identityBody', $lang)}</p>
      <a class="button white mt-40" href="/about" lang="en">About Us</a>
    </div>
    <div class="container">
      <Orbit />
      
      <!--<Ball size={ballSize} />-->
    </div>
  </div>
</section>

<section class="Business">
  <div class="wrapper">
    {#each cards as card}
      <a class="container" href={card.link}>
        <img src={card.image} alt={card.title} />
        <div class="overlay"></div>
        <div class="texts">
          <h6 class="white">{tTop(card.categoryKey, $lang)}</h6>
          <h2 class="h2 uppercase white" lang="en">{card.title}</h2>
          <div class="button" lang="en">Discover</div>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="InlineText pc">
  <div class="wrapper">
    <h1 class="center uppercase" lang="en">
      Rooted in nature,
      <br />
      Forging <img src="/images/top_04.webp" alt="" class="image" /> the next
      <br />
      century's form <img src="/images/top_05.webp" alt="" class="image" />.
    </h1>
  </div>
</section>

<style lang="scss">
  .Identity {
    padding-top: 0;
    padding-bottom: 0;
    position: relative;
    z-index: 1;
  }

  .Identity .wrapper {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .Identity .wrapper .container:nth-of-type(1) { width: 42.5%; }
  .Identity .wrapper .container:nth-of-type(2) {margin-top: -80px;}

  .Identity h2 {
    margin-top: 2rem;
  }

  @media screen and (max-width: 834px) {
    .Identity {
      margin-top: 100px;
    }

    .Identity .wrapper .container:nth-of-type(1) {
      width:100%;
    }

    .Identity .wrapper .container:nth-of-type(2) {margin-top: 0px;}



    .Identity .wrapper {
      flex-direction: column;
    }

    .Identity .wrapper .container:nth-of-type(2) {
      position: static;
      width: 100%;
      height: auto;
      margin-top: 40px;
      right: auto;
      top: auto;
    }
  }





  .Business .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 5px;
    width: 100%;
    height: 70vh;
    border-radius: 10px;
    overflow: hidden;
  }

  .Business .container:nth-of-type(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }

  .Business .container:nth-of-type(2) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  .Business .container:nth-of-type(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  .Business .container:nth-of-type(4) {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
  }

  .Business .container:nth-of-type(2) .overlay {display: none;}
  .Business .container:nth-of-type(2) .texts * {
    color: var(--textColor) !important;
    -webkit-text-stroke: calc(0.1px + 0.01em) var(--textColor);
  }
  

  .Business .container {
    position: relative;
    overflow: hidden;
    display: block;
    text-decoration: none;
  }

  .Business .container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .Business .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
  }

  .Business .texts {
    position: absolute;
    bottom: 50px;
    left: 30px;
    z-index: 2;
    color: #ffffff;
  }

  .Business .texts h6 { margin-bottom: 12px; opacity: 0.9; }
  .Business .texts h2 { margin-bottom: 24px; }

  .Business .button {
    display: inline-block;
    padding: 12px 32px;
    background: #ffffff;
    color: #000000;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    border-radius: 24px;
  }








  @media screen and (max-width: 834px) {
    .Business .wrapper {
      width: 100vw;
      margin-left: calc(-1 * var(--padding));
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
      height: auto;
      min-height: 100vh;
      border-radius: 0;
      gap: 1px;
    }

    .Business .container:nth-of-type(1),
    .Business .container:nth-of-type(2),
    .Business .container:nth-of-type(3),
    .Business .container:nth-of-type(4) {
      grid-column: 1 / 2;
      grid-row: auto;
    }
    .Business .container {height: 60vw;}
    .Business .container:nth-of-type(1) {order: 2;}
    .Business .container:nth-of-type(2) {order: 4;}
    .Business .container:nth-of-type(3) {order: 3;}
    .Business .container:nth-of-type(4) {order: 1;}

    .Business .texts {
      top: auto;
      bottom: 0;
      left: 0;
      padding: 25px var(--padding);
    }
    .Business .texts h6 { font-size: 12px; margin-bottom: 8px; }
    .Business .texts h2 { font-size: 28px; margin-bottom: 30px; }
    .Business .button { padding: 10px 24px; font-size: 11px; }






    
  }

  .InlineText {
    padding: 200px 0 80px;
  }

  .InlineText .wrapper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .InlineText h1 {
    font-size: 100px;
    line-height: 1;
    position: relative;
  }

  .InlineText .image {
    display: inline-block;
    width: 140px;
    height: 80px;
    object-fit: cover;
    vertical-align: middle;
    margin: -20px -25px 0;
    transform-origin: center;
  }

  .InlineText .image:nth-of-type(2) {
    margin-right: 5px;
  }







  @media screen and (max-width: 834px) {
    .InlineText { padding: 120px 0; }
    .InlineText .wrapper { padding: 0 20px; }
    .InlineText h1 { font-size: 48px; line-height: 1.4; }
    .InlineText .image {
      width: 80px;
      height: 50px;
      margin: 0 4px;
    }
  }
</style>
