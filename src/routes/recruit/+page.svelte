<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"

  import { t } from './recruit.dict';
  import { lang } from '$lib/lang';

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


  


</main>



<style>



</style>