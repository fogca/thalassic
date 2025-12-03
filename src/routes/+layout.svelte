<script lang="ts">
	import Header from "../components/Header.svelte";
	import OpAnimation from "../components/OpAnimation.svelte";
	import Footer from "../components/Footer.svelte";
	import favicon from '$lib/assets/favicon.svg';
	import { onMount, onDestroy } from 'svelte';

	import Lenis from '@studio-freight/lenis';
	import { initParallaxZoom } from '$lib/motion/pz';

	import { afterNavigate } from '$app/navigation';
    import { fontplusInit, fontplusRefresh } from '$lib/utils/fontplus';

	import { detectLang, lang as langStore } from '$lib/lang';
	import { lang } from '$lib/lang';

	import { opFinished } from '$lib/op';
  	
	//fontplus
	let off: (() => void) | null = null;
	

	onMount(() => {

		// 初回のみ。SPA遷移後は localStorage / ?lang が効く
		langStore.set(detectLang());

		const unsub = lang.subscribe(v => {
    		document.documentElement.setAttribute('lang', v); // 'ja' | 'zh' | 'en'
  		});
  		return () => unsub();

		//lenis
		const lenis = new Lenis({ smoothWheel: true, syncTouch: true });
		requestAnimationFrame(function raf(t){ lenis.raf(t); requestAnimationFrame(raf); });
		const stop = initParallaxZoom({ selector: '.pz', lenis });

		//fontplus
		fontplusInit({
    	  selector: 'body',                // ページ全体をカバー
    	  families: ['YourJP', 'YourJP Bold'], // 必要なファミリー名
    	  async: true                      // まずは非同期が安定。同期にしたいなら false
    	});

    	// ② 初回レンダ後に一度refresh（defer読み込みのズレ吸収）
    	requestAnimationFrame(() => fontplusRefresh());

    	// ③ ルート遷移のたびに再適用
    	const stopF = afterNavigate(() => {
    	  // DOM差し替え後のタイミングで
    	  requestAnimationFrame(() => fontplusRefresh());
    	});
    	off = stopF;
	});

	onDestroy(() => {
    	off?.();
  	});


	let { children } = $props();


	

</script>



<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.07">
	<link rel="stylesheet" href="../css/layout.css?var=1.04">
	
	<link rel="stylesheet" href="https://use.typekit.net/vps5ddr.css">
</svelte:head>






 
<div class="main">
<Header />
{@render children?.()}
<Footer />
</div>



<style>

</style>