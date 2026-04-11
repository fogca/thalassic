<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { get } from 'svelte/store';
	import { lenisStore } from '$lib/stores/lenis';
	import Header from '../components/layout/Header.svelte';
	import Footer from '../components/layout/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import PageTransition from '../components/utilities/PageRouting.svelte';
	import CustomCursor from '../components/snippets/CustomCursor.svelte';
	import ScrollAnimations from '../components/utilities/ScrollAnimations.svelte';
	import LangFontManager from '../components/utilities/LangFontManager.svelte';
	import Fontplus from '../components/utilities/Fontplus.svelte';
    import OpAnimation from '../components/utilities/OpAnimation.svelte';

	let { children } = $props();

	// Handle hash scroll and scroll-to-top after every navigation.
	// Lenis is owned by ScrollAnimations.svelte and shared via lenisStore.
	afterNavigate(() => {
		if (!browser) return;
		const lenis = get(lenisStore);
		if (!lenis) return;

		const hash = window.location.hash;

		if (hash) {
			// Scroll to target element with Lenis after DOM settles
			setTimeout(() => {
				const el = document.getElementById(hash.slice(1));
				if (el) {
					lenis.scrollTo(el, { offset: -80, duration: 1.2, immediate: false });
				}
			}, 300);
		} else {
			lenis.scrollTo(0, { immediate: true });
		}
	});
</script>


<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.30">
	<link rel="stylesheet" href="../css/layout.css?var=1.17">
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


<OpAnimation />
<div class="main">
<LangFontManager />
<Fontplus debug={true} />
<PageTransition columns={8} color="#00268D" />
<CustomCursor />
<ScrollAnimations />

<div class="route-content">
<Header />
{@render children()}
<Footer />
</div>


</div>



<style>
.route-content {
	opacity: 1;
}

</style>