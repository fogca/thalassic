<script lang="ts">
	import Header from "../components/Header.svelte";
	import favicon from '$lib/assets/favicon.svg';
	import { onMount, onDestroy } from 'svelte';

	import { initMotionLenis, motionRaf, getLenisInstance } from '$lib/motion/lenisCore';
	import { initParallaxZoom } from '$lib/motion/pz';

	let destroyPZ: () => void;
	let raf = 0;

	onMount(() => {
	  // --- Lenis 初期化 ---
	  initMotionLenis({ lerp: 0.09, smoothWheel: true });

	  // --- LenisのrequestAnimationFrameループ ---
	  const loop = (t: number) => {
	    raf = requestAnimationFrame(loop);
	    motionRaf(t);
	  };
	  loop(0);

	  // --- ScrollTrigger と同期 ---
	  import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
	    const lenis = getLenisInstance?.(); // ← lenisCore 側でexportしておくと便利
	    lenis?.on('scroll', () => ScrollTrigger.update());
	  });

	  // --- Parallax Zoom 初期化 ---
	  destroyPZ = initParallaxZoom({
	    // optional: defaultY: [-6, 6], defaultScale: [1.1, 1.0],
	  });

	  return () => {
	    cancelAnimationFrame(raf);
	    destroyPZ?.();
	  };
	});


	let { children } = $props();
</script>



<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="../css/base.css?var=1.01">
	<script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?kqbwQX--jVA%3D&box=2bQkUFfZnEc%3D&aa=1&ab=2"></script>
	<link rel="stylesheet" href="https://use.typekit.net/vps5ddr.css">
</svelte:head>

<div>
<Header />
{@render children?.()}

</div>
