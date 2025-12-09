<script lang="ts">
	import { page } from '$app/stores';
	import Header from "../components/Header.svelte";
	import Footer from "../components/Footer.svelte";
	import favicon from '$lib/assets/favicon.svg';
  
	import PageTransition from '../components/PageTransition.svelte';
	import ScrollAnimations from '../components/ScrollAnimations.svelte';
	import CustomCursor from '../components/CustomCursor.svelte';
	import OpeningAnimation from '../components/OpeningAnimation.svelte';
	import Leave from '../components/Leave.svelte';
	import LangFontManager from '../components/LangFontManager.svelte';

	let { children } = $props();
	
</script>


<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.13">
	<link rel="stylesheet" href="../css/layout.css?var=1.08">
	
	<link rel="stylesheet" href="https://use.typekit.net/vps5ddr.css">
</svelte:head>




<div class="main">
<LangFontManager />
<OpeningAnimation />
<PageTransition />
<ScrollAnimations />
<CustomCursor />
<Leave />

<Header />
{@render children?.()}
<Footer />

</div>



<style>


</style>