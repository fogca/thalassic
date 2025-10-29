<script lang="ts">
  import ParallaxStack from '$lib/motion/ParallaxStack.svelte';

	import Top from "../components/home/Top.svelte"
  import Business from "../components/home/Business.svelte"
  import Philosophy from "../components/home/Philosophy.svelte"
  import About from "../components/home/About.svelte"
  import Recruit from "../components/home/Recruit.svelte"
</script>


<main>

<Top />
<Business />

<ParallaxStack
  layers={[Philosophy, About, Recruit]}
  headerOffset={50}
  minPinPx={1000}
  ease={0.12}
/>

</main>



<style>

</style>