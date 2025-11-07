<script lang="ts">
	import Header from "../components/Header.svelte";
	import favicon from '$lib/assets/favicon.svg';
	import { onMount, onDestroy } from 'svelte';

	import Lenis from '@studio-freight/lenis';
	import { initParallaxZoom } from '$lib/motion/pz';
	

	onMount(() => {
		const lenis = new Lenis({ smoothWheel: true, syncTouch: true });
		requestAnimationFrame(function raf(t){ lenis.raf(t); requestAnimationFrame(raf); });
		const stop = initParallaxZoom({ selector: '.pz', lenis });
	});


	let { children } = $props();
</script>



<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.02">
	<link rel="stylesheet" href="../css/layout.css?var=1.00">
	<script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?kqbwQX--jVA%3D&box=2bQkUFfZnEc%3D&aa=1&ab=2"></script>
	<link rel="stylesheet" href="https://use.typekit.net/vps5ddr.css">
</svelte:head>

<div>
<Header />
{@render children?.()}

</div>
