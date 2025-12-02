<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"
  import Link from "../../components/Link.svelte"
  
  import { t } from './realestate.dict';
  import { lang } from '$lib/lang';
</script>


<main>

  <section class="topLayout topLayoutPages" id="">
    <div class="texts-container">
      <div></div>
      <div>
        <h1 class="h4"lang="en">Real estate</h1>
        <h2 class="h1 hero__title bold">{@html t('heading', $lang)}</h2>
      </div>
      <div class="h6 half">{@html t('sub', $lang)}</div>
    </div>
    <div class="image-container w100">
      <img class="pz" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />
    </div>
  </section>


  <section class="business-wrapper">
    <div class="wrapper">

      <div class="container">
        <h3 class="h2 bold">{@html t('real1h', $lang)}</h3>
        <h4 class="h6 half "lang="en">Real Estate Sales</h4>
        <p>{@html t('real1p', $lang)}</p>
        <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />
      </div>

      <div class="container">
        <div class="div">
        <h3 class="h2 bold">{@html t('real2h', $lang)}</h3>
        <h4 class="h6 half "lang="en">Rental Management</h4>
        <p>{@html t('real2p', $lang)}</p>
        <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />
        </div>
      </div>

      <div class="container">
        <div class="div">
        <h3 class="h2 bold">{@html t('real3h', $lang)}</h3>
        <h4 class="h6 half "lang="en">Real Estate Brokerage</h4>
        <p>{@html t('real3p', $lang)}</p>
        <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />
      </div>
      </div>

      <div class="container">
        <h3 class="h2 bold">{@html t('real4h', $lang)}</h3>
        <h4 class="h6 half "lang="en">B&B Business</h4>
        <p>{@html t('real4p', $lang)}</p>
        <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" />
      </div>

    </div>
  </section>
  


</main>



<style>




</style>