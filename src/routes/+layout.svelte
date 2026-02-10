<script lang="ts">
	import { page } from '$app/stores';
	import Header from "../components/Header.svelte";
	import Footer from "../components/Footer.svelte";
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Lenis from '@studio-freight/lenis';

  
	import PageTransition from '../components/PageTransition.svelte';
	//import ScrollAnimations from '../components/ScrollAnimations.svelte';
	import CustomCursor from '../components/CustomCursor.svelte';
	import OpeningAnimation from '../components/OpeningAnimation.svelte';
	//import Leave from '../components/Leave.svelte';
	import LangFontManager from '../components/LangFontManager.svelte';

	let { children } = $props();


	let lenis;

onMount(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Lenisの初期化
  lenis = new Lenis({
	duration: 1.5,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	smooth: true,
	smoothTouch: false, // モバイルはネイティブスクロール
  });

  // LenisとScrollTriggerを連携
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
	lenis.raf(time * 800);
  });

  gsap.ticker.lagSmoothing(0);

  return () => {
	lenis?.destroy();
	ScrollTrigger.getAll().forEach(t => t.kill());
  };
});

// ページ遷移後にスクロール位置をリセット
afterNavigate(() => {
  lenis?.scrollTo(0, { immediate: true });
  ScrollTrigger.refresh();
});
	
</script>


<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.17">
	<link rel="stylesheet" href="../css/layout.css?var=1.11">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap" rel="stylesheet">
	<!--<link rel="stylesheet" href="https://use.typekit.net/vps5ddr.css">-->
</svelte:head>


<!--


<ScrollAnimations />

<Leave />
-->

<div class="main">
<OpeningAnimation />
<PageTransition />
<LangFontManager />
<CustomCursor />

<Header />
{@render children?.()}
<Footer />

</div>



<style>


</style>