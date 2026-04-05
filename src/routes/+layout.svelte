<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Header from "../components/layout/Header.svelte";
	import Footer from "../components/layout/Footer.svelte";
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate, goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Lenis from '@studio-freight/lenis';

	import PageTransition from '../components/utilities/PageRouting.svelte';
	import CustomCursor from '../components/snippets/CustomCursor.svelte';
	import ScrollAnimations from '../components/utilities/ScrollAnimations.svelte';
	import LangFontManager from '../components/utilities/LangFontManager.svelte';
	import Fontplus from '../components/utilities/Fontplus.svelte';

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

		// Use capture so stopPropagation in nav.menu doesn't block this
		document.addEventListener('click', handleHashClick, true);
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleHashClick, true);
			lenis?.destroy();
			ScrollTrigger.getAll().forEach(t => t.kill());
		}
	});

	// Reset scroll on page navigation (hash scroll is handled per-case below)
	afterNavigate(() => {
		if (!browser || !lenis) return;
		// Non-hash navigations: reset to top
		if (!window.location.hash) {
			lenis.scrollTo(0, { immediate: true });
		}
		ScrollTrigger.refresh();
	});

	// Handle same-page hash link clicks — both #Hash and /path#Hash forms
	function handleHashClick(e: MouseEvent) {
		if (!lenis) return;

		const target = e.target as HTMLElement;
		const link = target.closest('a');
		if (!link) return;

		const href = link.getAttribute('href');
		if (!href || !href.includes('#')) return;

		const linkUrl = new URL(href, window.location.href);
		const isSamePage = linkUrl.pathname === window.location.pathname;

		if (isSamePage && linkUrl.hash) {
			e.preventDefault();
			// Use goto so afterNavigate fires everywhere (e.g. closes SP menu in Header)
			goto(href, { noScroll: true });
			const el = document.getElementById(linkUrl.hash.substring(1));
			if (el) {
				lenis.scrollTo(el, { offset: -80, duration: 1.2 });
			}
		}
		// Cross-page hash links: PageRouting handles scroll position in afterNavigate
	}

	
</script>


<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.29">
	<link rel="stylesheet" href="../css/layout.css?var=1.16">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400&family=Marcellus&display=swap" rel="stylesheet">
	<!--<link rel="stylesheet" href="https://use.typekit.net/vps5ddr.css">-->
	<script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?kqbwQX--jVA%3D&box=9boKdvabiOQ%3D&aa=1&ab=2" defer></script>

</svelte:head>


<!--


<ScrollAnimations />

<Leave />
-->

<div class="main">
<LangFontManager />
<Fontplus debug={true} />
<PageTransition columns={8} color="#00268D" />
<CustomCursor />
<ScrollAnimations />

<Header />
{@render children()}
<Footer />


</div>



<style>


</style>