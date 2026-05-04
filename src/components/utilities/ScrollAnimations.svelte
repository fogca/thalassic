<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Lenis from 'lenis';
	import { lenisStore } from '$lib/stores/lenis';

	// Lenis-only smooth scroll. Entrance animations were removed; new logic
	// can be reintroduced here later.

	let lenis: Lenis | null = null;
	let rafId: number | null = null;

	function initLenis() {
		lenis = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
		});
		lenisStore.set(lenis);

		const raf = (time: number) => {
			lenis?.raf(time);
			rafId = requestAnimationFrame(raf);
		};
		rafId = requestAnimationFrame(raf);
	}

	onMount(() => {
		initLenis();
	});

	onDestroy(() => {
		if (rafId !== null) cancelAnimationFrame(rafId);
		lenis?.destroy();
		lenis = null;
		lenisStore.set(null);
	});
</script>
