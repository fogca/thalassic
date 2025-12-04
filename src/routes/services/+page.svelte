<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"
  import Link from "../../components/Link.svelte"

  import { t } from './services.dict';
  import { lang } from '$lib/lang';

</script>


<main>

  <section class="topLayout topLayoutPages" id="">
    <div class="texts-container">
      <div></div>
      <div>
        <h1 class="h4"lang="en">Services</h1>
        <h2 class="h1 hero__title bold">{@html t('heading', $lang)}</h2>
      </div>
      <div class="h6 half">{@html t('sub', $lang)}</div>
    </div>
    <div class="image-container w100">
      <img class="pz" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />
    </div>
  </section>


  <section class="bodyLayout serviceBody">

    <h3 class="h1" lang="en">Concept</h3>
    <div class="wrapper">
      <p>{@html t('concept', $lang)}</p>
    </div>
    
    <img class="pz w100 mar" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />

  </section>



  <section class="serviceAcc mar">

    <h3 class="h1" lang="en">Accommodation</h3>
    <p>{@html t('accommodation', $lang)}</p>
    
    <div class="wrapper w100 grid">

      <a href="/" class="container">
        <img class="pz" src="../../image/TC_services_acc1.webp" alt="" loading="eager" decoding="async" />
        <div class="box">
          <h4 class="white h3" lang="en">Mokuseki Nagoya</h4>
        </div>
      </a>
      <a href="/" class="container">
        <img class="pz" src="../../image/TC_services_acc2.webp" alt="" loading="eager" decoding="async" />
        <div class="box">
          <h4 class="white h3" lang="en">Nagoya Castle I</h4>
        </div>
      </a>
      <a href="/" class="container">
        <img class="pz" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />
        <div class="box">
          <h4 class="white h3" lang="en">Mokuseki Nagoya</h4>
        </div>
      </a>
      
    </div>
    
    

  </section>

</main>


<style>

.serviceBody.bodyLayout .wrapper {width: fit-content;}
.serviceAcc .wrapper {margin-top: 2rem;}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;
}

.serviceAcc .container {position: relative;}
.serviceAcc .container .box {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  padding-left: var(--padding);
}

@media screen and (min-width:720px) {

  .serviceAcc .w100,
  .serviceBody .w100{
    width: 100%;
    margin-left: 0;
  }

  .serviceBody {margin-top: 4rem;}
  .serviceBody.bodyLayout .wrapper {width: 100%;}
  .serviceBody * {text-align: center;}
  .serviceBody img {
    margin-top: 12rem;
    height: 60vh;
    border-radius: 1rem;
  }

  .serviceAcc {margin: 12rem 0 16rem;}
  .serviceAcc img {
    height: calc(85vw / 3 / 3 * 2);
    border-radius: 1rem;
    filter: brightness(.85) contrast(1.2);
  }
  .serviceAcc .container .box {justify-content: center;padding-left: 0;}

  .grid {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }

}

</style>



