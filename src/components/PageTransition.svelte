<script>
	import { beforeNavigate, goto, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	
	let container;
	let isTransitioning = false;
	
	const colorPalette = ['#f1af9b', '#005fac', '#8ac5db', '#ced1c8'];
	let currentColors = ['#f1af9b', '#005fac', '#8ac5db']; // Initial colors
	
	function getRandomColors() {
	  // Shuffle and pick 3 random colors
	  const shuffled = [...colorPalette].sort(() => Math.random() - 0.5);
	  return shuffled.slice(0, 3);
	}
  
	onMount(() => {
	  // Pre-position layers below viewport for smooth start
	  gsap.set('.transition-layer', { yPercent: 100 });
	});
  
	beforeNavigate((navigation) => {
	  if (isTransitioning) return;
	  
	  navigation.cancel();
	  isTransitioning = true;
	  
	  // Get new random colors for this transition
	  currentColors = getRandomColors();
	  
	  // Small delay to ensure layers are rendered before animating
	  requestAnimationFrame(() => {
		requestAnimationFrame(() => {
		  const tl = gsap.timeline();
		  
		  // Stagger layers sliding up from bottom
		  tl.to('.transition-layer', {
			yPercent: 0,
			duration: 0.9,
			ease: 'power3.inOut',
			stagger: 0.08
		  })
		  .call(() => {
			goto(navigation.to.url.pathname);
		  });
		});
	  });
	});
  
	afterNavigate(() => {
	  if (!isTransitioning) return;
	  
	  const tl = gsap.timeline();
	  
	  // Exit upwards
	  tl.to('.transition-layer', {
		yPercent: -100,
		duration: 0.9,
		ease: 'power3.inOut',
		stagger: 0.08,
		delay: 0.15
	  })
	  .call(() => {
		isTransitioning = false;
		gsap.set('.transition-layer', { yPercent: 100 });
	  });
	});
  </script>
  
  <div class="transition-container" bind:this={container}>
	{#each currentColors as color, i}
	  <div class="transition-layer" style="background-color: {color}; z-index: {9999 - i}">
	  </div>
	{/each}
  </div>
  
  <style>
	.transition-container {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100vw;
	  height: 100vh;
	  pointer-events: none;
	  z-index: 9999;
	}
  
	.transition-layer {
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  will-change: transform;
	  overflow: hidden;
	}
  </style>