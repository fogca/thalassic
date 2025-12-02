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


  <section class="bodyLayout">

    <h3 class="h1" lang="en">Concept</h3>
    <div class="wrapper">
      <p>{@html t('concept', $lang)}</p>
    </div>
    

  </section>


  
  <section class="business-wrapper">
    <div class="wrapper">

      <div class="container">
        <h3 class="h2 bold">
          
        </h3>
        <h4 class="h6 half "lang="en"></h4>
        <p>
          
        </p>
        <img class="pz" src="../../image/TC_business_international_1.webp" alt="" loading="eager" decoding="async" />
      </div>


    </div>
  </section>
  


</main>



