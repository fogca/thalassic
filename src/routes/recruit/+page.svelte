<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"

  import { t } from './recruit.dict';
  import { lang } from '$lib/lang';

</script>


<main>


  <div>{@html t('heading', $lang)}</div>


</main>



<style>



</style>