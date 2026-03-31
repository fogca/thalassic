<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Header from "../components/layout/Header.svelte";
	import Footer from "../components/layout/Footer.svelte";
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Lenis from '@studio-freight/lenis';

	import PageTransition from '../components/utilities/PageRouting.svelte';
	import CustomCursor from '../components/snippets/CustomCursor.svelte';
	import ScrollAnimations from '../components/utilities/ScrollAnimations.svelte';
	import LangFontManager from '../components/utilities/LangFontManager.svelte';

	let { children } = $props();

	let lenis: Lenis | null = null;

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
			lenis!.raf(time * 800);
		});

		gsap.ticker.lagSmoothing(0);

		// ✅ 同一ページ内のハッシュリンククリックを処理
		document.addEventListener('click', handleHashClick);
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleHashClick);
			lenis?.destroy();
			ScrollTrigger.getAll().forEach(t => t.kill());
		}
	});

	// ✅ ページ遷移後の処理
	afterNavigate(() => {
		if (!browser || !lenis) return;

		const hash = window.location.hash;

		if (hash) {
			// ハッシュがある場合 → 対象要素にスクロール
			setTimeout(() => {
				const targetId = hash.replace('#', '');
				const el = document.getElementById(targetId);
				
				if (el) {
					lenis!.scrollTo(el, {
						offset: -80,        // Header分のオフセット（必要に応じて調整）
						duration: 1.2,
						immediate: false,   // スムーズにスクロール
					});
				}
			}, 300); // DOM構築・画像読み込みを待つ
		} else {
			// ハッシュがない場合 → トップへリセット
			lenis.scrollTo(0, { immediate: true });
		}

		ScrollTrigger.refresh();
	});

	// 同一ページ内のハッシュリンク処理
	function handleHashClick(e: MouseEvent) {
		if (!lenis) return;
		
		const target = e.target as HTMLElement;
		const link = target.closest('a');
		if (!link) return;

		const href = link.getAttribute('href');
		if (!href || !href.includes('#')) return;

		// #Recruitment など、#のみで始まるリンク
		if (href.startsWith('#')) {
			e.preventDefault();
			const el = document.getElementById(href.substring(1));
			if (el) {
				lenis.scrollTo(el, { offset: -80, duration: 1.2 });
			}
		}
		// /about#Recruitment など、別ページへのハッシュリンクは
		// SvelteKitのルーティングに任せる（afterNavigateで処理される）
	}

	
</script>


<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.22">
	<link rel="stylesheet" href="../css/layout.css?var=1.16">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400&family=Marcellus&display=swap" rel="stylesheet">
	
	<!--<link rel="stylesheet" href="https://use.typekit.net/vps5ddr.css">-->
	
	<script>
		(function(d) {
    var config = {
      kitId: 'jkg6ejh',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);
	</script>
</svelte:head>


<!--


<ScrollAnimations />

<Leave />
-->

<div class="main">

<PageTransition columns={8} color="#00268D" />
<LangFontManager />
<CustomCursor />
<ScrollAnimations />

<Header />
{@render children()}
<Footer />


</div>



<style>


</style>