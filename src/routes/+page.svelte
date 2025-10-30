<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { initScrollSystem, initStackCards } from '$lib/motion/scroll';

	import Top from "../components/home/Top.svelte"
  import Business from "../components/home/Business.svelte"
  import Philosophy from "../components/home/Philosophy.svelte"
  import About from "../components/home/About.svelte"
  import Recruit from "../components/home/Recruit.svelte"
  import Footer from "../components/Footer.svelte"
  
  let destroyStack: () => void;
  onMount(async () => {
    const { ScrollTrigger } = await initScrollSystem();
    destroyStack = initStackCards({ headerOffset: 50, overlapRatio: 0.12 });
  });
  onDestroy(() => destroyStack?.());

</script>


<main>

<Top />
<Business />

<div class="stack">
  <div class="card"><Philosophy /></div>
  <div class="card"><About /></div>
  <div class="card"><Recruit /></div>
  <div class="card"><Footer /></div>
</div>
  
  
  


</main>



<style>

.stack {position: relative;}
.card {will-change: transform;}

</style>