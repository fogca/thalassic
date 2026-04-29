<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { get } from 'svelte/store';
	import { lenisStore } from '$lib/stores/lenis';
	import Header from '../components/layout/Header.svelte';
	import Footer from '../components/layout/Footer.svelte';
	import PageTransition from '../components/utilities/PageTransition.svelte';
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
	<!-- Favicon -->
	<link rel="icon" href="/images/favicon.png" type="image/png" />

	<!-- Default meta (overridden per page via <svelte:head>) -->
	<title>Thalassic Capital</title>
	<meta name="description" content="Thalassic Capital is a real estate and hospitality group based in Japan and Australia, transforming potential into long-term value." />

	<!-- OGP -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Thalassic Capital" />
	<meta property="og:title" content="Thalassic Capital" />
	<meta property="og:description" content="Thalassic Capital is a real estate and hospitality group based in Japan and Australia, transforming potential into long-term value." />
	<meta property="og:image" content="https://thalassiccapital.com/images/OGP.png" />
	<meta property="og:url" content="https://thalassiccapital.com" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Thalassic Capital" />
	<meta name="twitter:description" content="Thalassic Capital is a real estate and hospitality group based in Japan and Australia, transforming potential into long-term value." />
	<meta name="twitter:image" content="https://thalassiccapital.com/images/OGP.png" />

	<!-- Fonts & Styles -->
	<link rel="stylesheet" href="../css/base.css?var=1.32">
	<link rel="stylesheet" href="../css/layout.css?var=1.17">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400&family=Marcellus&display=swap" rel="stylesheet">
	<script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?kqbwQX--jVA%3D&box=9boKdvabiOQ%3D&aa=1&ab=2" defer></script>
</svelte:head>


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