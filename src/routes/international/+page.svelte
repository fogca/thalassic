<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"
  import Link from "../../components/Link.svelte"

  import { t } from './international.dict';
  import { lang } from '$lib/lang';

</script>


<main>

  <section class="topLayout topLayoutPages" id="" lang="jp">
    <!-- モバイル用：テキストブロック -->
    <div class="texts-container">
      <div>
      <h2 class="hero__title bold">
        {@html t('heading', $lang)}
      </h2>
      <p class="h7 half"lang="en">
        Global business <br>
        as a strategic investment
      </p>

      </div>
    </div>
    
    
    <div class="image-container w100">
      <img class="pz" src="../../image/TC_business_international_1.webp" alt="" loading="eager" decoding="async" />
      <!-- PC時のみ有効化されるオーバーレイ -->
      <div class="hero__overlay" aria-hidden="true"></div>
    </div>
  </section>
  
  <section class="business-wrapper">
    <div class="wrapper">

      <div class="container">
        <h3 class="h2 bold">
          {@html t('int1h', $lang)}
        </h3>
        <h4 class="h6 half "lang="en"></h4>
        <p>
          {@html t('int1p', $lang)}
        </p>
        <img class="pz" src="../../image/TC_business_international_1.webp" alt="" loading="eager" decoding="async" />
      </div>


    </div>
  </section>
  


</main>



