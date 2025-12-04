<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
  
	let bigBall: HTMLDivElement | null = null;
	let smallBall: HTMLDivElement | null = null;
  
	let gsap: any;
	let hoverables: NodeListOf<HTMLElement> | null = null;
  
	function onMouseMove(e: MouseEvent) {
	  if (!gsap || !bigBall || !smallBall) return;
  
	  gsap.to(bigBall, {
		duration: 0.4,
		x: e.pageX - 15,
		y: e.pageY - 15
	  });
  
	  gsap.to(smallBall, {
		duration: 0.1,
		x: e.pageX - 5,
		y: e.pageY - 7
	  });
	}
  
	function onMouseHover() {
	  if (!gsap || !bigBall) return;
	  gsap.to(bigBall, {
		duration: 0.3,
		scale: 4
	  });
	}
  
	function onMouseHoverOut() {
	  if (!gsap || !bigBall) return;
	  gsap.to(bigBall, {
		duration: 0.3,
		scale: 1
	  });
	}
  
	onMount(async () => {
	  if (!browser) return;
  
	  // gsap をクライアント側でだけ import
	  const mod = await import('gsap');
	  gsap = mod.gsap ?? mod.default ?? mod;
  
	  hoverables = document.querySelectorAll<HTMLElement>('.hoverable');
  
	  document.body.addEventListener('mousemove', onMouseMove);
  
	  hoverables.forEach((el) => {
		el.addEventListener('mouseenter', onMouseHover);
		el.addEventListener('mouseleave', onMouseHoverOut);
	  });
	});
  
	onDestroy(() => {
	  if (!browser) return;
  
	  document.body.removeEventListener('mousemove', onMouseMove);
  
	  hoverables?.forEach((el) => {
		el.removeEventListener('mouseenter', onMouseHover);
		el.removeEventListener('mouseleave', onMouseHoverOut);
	  });
	});
  </script>
  
  <div class="cursor">
	<div bind:this={bigBall} class="cursor__ball cursor__ball--big"></div>
	<div bind:this={smallBall} class="cursor__ball cursor__ball--small"></div>
  </div>
  
  <style>
	.cursor {
	  position: fixed;
	  inset: 0;
	  pointer-events: none;
	  z-index: 9999;
	}
  
	.cursor__ball {
	  position: absolute;
	  border-radius: 50%;
	  transform: translate3d(0, 0, 0);
	  will-change: transform;
	  pointer-events: none;
	}
  
	.cursor__ball--big {
	  width: 30px;
	  height: 30px;
	  border: 1px solid rgba(255, 255, 255, 0.6);
	  mix-blend-mode: difference;
	}
  
	.cursor__ball--small {
	  width: 10px;
	  height: 10px;
	  background: white;
	  mix-blend-mode: difference;
	}
  
	@media (pointer: coarse) {
	  /* タッチデバイスでは邪魔なので非表示にしてもOK */
	  .cursor {
		display: none;
	  }
	}
  </style>