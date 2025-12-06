<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

	import Top from "../components/home/Top.svelte"
  import Business from "../components/home/Business.svelte"
  import Philosophy from "../components/home/Philosophy.svelte"
  import About from "../components/home/About.svelte"
  import Recruit from "../components/home/Recruit.svelte"
  import Footer from "../components/Footer.svelte"


</script>


<main>
  
<Top />

<Business />

<div class="stack">
  <div class="card"><Philosophy /></div>
  <div class="card"><About /></div>
  <div class="card"><Recruit /></div>
  
</div>
  
  



</main>



<style>

.stack {position: relative;}
.card {will-change: transform;}

</style>