<script lang="ts">
	import Header from "../components/Header.svelte"
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
  	import { initMotionLenis, motionRaf } from '$lib/motion/lenisCore';

  onMount(() => {
    initMotionLenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { raf = requestAnimationFrame(loop); motionRaf(t); };
    loop(0);
    return () => cancelAnimationFrame(raf);
  });

	let { children } = $props();
</script>



<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.00">
	<script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?kqbwQX--jVA%3D&box=2bQkUFfZnEc%3D&aa=1&ab=2"></script>
	<link rel="stylesheet" href="https://use.typekit.net/vps5ddr.css">
</svelte:head>

<div>
<Header />
{@render children?.()}

</div>
