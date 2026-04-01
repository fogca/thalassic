<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { gsap } from 'gsap';
	import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
	
	let { children } = $props();
	
	// GSAPプラグイン登録
	gsap.registerPlugin(ScrollToPlugin);
	
	// ============================================================
	// State
	// ============================================================
	let isTransitioning = $state(false);
	let showGradient = $state(false);
	let currentHTML = $state('');
	let nextHTML = $state('');
	let showDual = $state(false);
	let savedScrollY = 0; // ✅ スクロール位置を保存
	
	// DOM refs
	let wrapperEl: HTMLElement;
	let gradientEl: HTMLElement;
	let currentContainerEl: HTMLElement;
	let nextContainerEl: HTMLElement;
	let whiteOverlayEl: HTMLElement;
	let grayOverlayEl: HTMLElement;
	let outerWrapperEl: HTMLElement; // ✅ 縮小対象の親
	let innerBodyEl: HTMLElement; // ✅ スクロール可能な子
	
	// ============================================================
	// Ciel Rose Style Transition（参考サイトのロジック完全移植）
	// ============================================================
	async function cielRoseTransition() {
	  if (!currentContainerEl || !nextContainerEl || !whiteOverlayEl || !outerWrapperEl || !innerBodyEl || !grayOverlayEl) return;
	  
	  console.log('🎬 Ciel Rose transition start');
	  console.log('📊 Saved scroll position:', savedScrollY);
	  
	  // 次ページは最初から100%サイズで準備（非表示）
	  gsap.set(nextContainerEl, {
		scale: 1,
		opacity: 0,
		zIndex: 1,
	  });
	  
	  // 白オーバーレイの初期設定
	  gsap.set(whiteOverlayEl, {
		y: '100%',
		opacity: 1,
		zIndex: 100,
	  });
	  
	  // グレーオーバーレイの初期設定
	  gsap.set(grayOverlayEl, {
		opacity: 0,
		zIndex: 50,
	  });
	  
	  const tl = gsap.timeline();
	  
	  // ============================================================
	  // Phase 1: innerBodyを固定 + outerWrapperを縮小
	  // ============================================================
	  tl.set(innerBodyEl, {
		overflow: 'hidden',
		height: '100vh',
		scrollTo: savedScrollY, // ✅ スクロール位置を固定
	  }, 0);
	  
	  // ✅ outer-wrapperを縮小（オーバーレイも一緒に縮小される）
	  tl.to(outerWrapperEl, {
		scale: 0.8,
		duration: 0.5,
		ease: 'power2.inOut',
		transformOrigin: 'center center',
	  }, 0);
	  
	  // グレーオーバーレイをフェードイン
	  tl.to(grayOverlayEl, {
		opacity: 1,
		duration: 0.5,
		ease: 'power2.inOut',
	  }, 0);
	  
	  // ============================================================
	  // Phase 2: オーバーレイが下から上へ
	  // ============================================================
	  tl.to(whiteOverlayEl, {
		y: '0%',
		duration: 0.5,
		ease: 'power2.inOut',
	  }, 0.5);
	  
	  // ============================================================
	  // Phase 3: 画面を元に戻す
	  // ============================================================
	  tl.to(outerWrapperEl, {
		scale: 1,
		duration: 0.8,
		ease: 'power2.inOut',
		onComplete: () => {
		  console.log('📄 Switching to next page');
		  gsap.set(currentContainerEl, { opacity: 0 });
		  gsap.set(nextContainerEl, { opacity: 1 });
		}
	  }, 0.5);
	  
	  // グレーオーバーレイをフェードアウト
	  tl.to(grayOverlayEl, {
		opacity: 0,
		duration: 0.8,
		ease: 'power2.inOut',
	  }, 0.5);
	  
	  // ============================================================
	  // Phase 4: オーバーレイが上に抜ける
	  // ============================================================
	  tl.to(whiteOverlayEl, {
		y: '-100%',
		duration: 0.5,
		ease: 'power2.in',
	  }, 1.3);
	  
	  await tl.then();
	  
	  console.log('✅ Transition complete');
	}
	
	// ============================================================
	// Navigation Handlers
	// ============================================================
	beforeNavigate(({ from, to, cancel }) => {
	  if (!from || from.url.pathname === to?.url.pathname) return;
	  
	  if (isTransitioning) {
		cancel();
		return;
	  }
	  
	  console.log('🔵 beforeNavigate');
	  
	  // ✅ スクロール位置を保存（参考サイトと同じ）
	  savedScrollY = window.scrollY;
	  console.log('📊 Current scroll position:', savedScrollY);
	  
	  isTransitioning = true;
	  showGradient = true;
	  
	  // 現在のHTMLをキャプチャ
	  const current = wrapperEl?.querySelector('[data-page]');
	  if (current) {
		currentHTML = current.innerHTML;
		console.log('✅ Captured currentHTML length:', currentHTML.length);
		console.log('📦 Current container height:', current.offsetHeight);
	  }
	});
	
	afterNavigate(async ({ from, to }) => {
	  if (!from) {
		isTransitioning = false;
		showGradient = false;
		return;
	  }
	  
	  console.log('🟢 afterNavigate');
	  
	  // 新しいHTMLをキャプチャ
	  await tick();
	  await new Promise(resolve => setTimeout(resolve, 50));
	  
	  const next = wrapperEl?.querySelector('[data-page]');
	  if (next) {
		nextHTML = next.innerHTML;
	  }
	  
	  // 両方のコンテナを表示
	  showDual = true;
	  
	  await tick();
	  await new Promise(resolve => setTimeout(resolve, 50));
	  
	  // トランジション実行
	  await cielRoseTransition();
	  
	  // Cleanup（参考サイトと同じ）
	  if (currentContainerEl) {
		currentContainerEl.remove();
		console.log('🗑️ Removed currentContainer');
	  }
	  
	  if (nextContainerEl) {
		gsap.set(nextContainerEl, { clearProps: 'all' });
		nextContainerEl.remove(); // ✅ 強制削除
		console.log('🗑️ Removed nextContainer');
	  }
	  
	  // ✅ outer-wrapperをリセット
	  if (outerWrapperEl) {
		gsap.set(outerWrapperEl, {
		  clearProps: 'transform',
		});
	  }
	  
	  // ✅ innerBodyをリセット（参考サイトと同じ）
	  if (innerBodyEl) {
		gsap.set(innerBodyEl, {
		  overflow: '',
		  height: '',
		  scrollTo: 0, // ✅ 次ページは必ずトップから
		});
		console.log('🔄 Reset innerBody');
	  }
	  
	  // ✅ オーバーレイをリセット
	  if (whiteOverlayEl) {
		gsap.set(whiteOverlayEl, {
		  y: '100%', // 元の位置に戻す
		});
	  }
	  
	  // Svelte reactivityを待つ
	  await tick();
	  
	  showDual = false;
	  showGradient = false;
	  currentHTML = '';
	  nextHTML = '';
	  
	  await tick();
	  
	  isTransitioning = false;
	  
	  console.log('🏁 Cleanup complete');
	  
	  // DOM確認
	  setTimeout(() => {
		const remaining = document.querySelectorAll('[data-page]');
		console.log('📍 Remaining [data-page] elements:', remaining.length);
		remaining.forEach((el, i) => {
		  console.log(`  ${i}: ${el.getAttribute('data-page')}`);
		});
	  }, 100);
	});
  </script>
  
  <!-- ============================================================
	   THALASSICグラデーション背景（固定・最背面）
	   ============================================================ -->
  {#if showGradient}
	<div class="gradation" bind:this={gradientEl}>
	  <div></div>
	  <div></div>
	  <div></div>
	  <div></div>
	</div>
  {/if}
  
  <!-- ============================================================
	   Outer Wrapper（縮小されるラッパー）
	   ============================================================ -->
  <div class="outer-wrapper" bind:this={outerWrapperEl}>
	
	<!-- ✅ 薄いグレーオーバーレイ -->
	{#if showDual}
	  <div class="gray-overlay" bind:this={grayOverlayEl}></div>
	{/if}
	
	<!-- ✅ 白いオーバーレイ -->
	{#if showDual}
	  <div class="white-overlay" bind:this={whiteOverlayEl}></div>
	{/if}
	
	<!-- Inner Body（スクロール可能） -->
	<div class="inner-body" bind:this={innerBodyEl}>
	  <div class="transition-wrapper" bind:this={wrapperEl}>
		{#if showDual}
		  <!-- Current page -->
		  <div 
			class="page-container" 
			data-page="current"
			bind:this={currentContainerEl}
		  >
			{@html currentHTML}
		  </div>
		  
		  <!-- Next page -->
		  <div 
			class="page-container" 
			data-page="next"
			bind:this={nextContainerEl}
		  >
			{@html nextHTML}
		  </div>
		{:else}
		  <div class="page-container" data-page="single">
			{@render children()}
		  </div>
		{/if}
	  </div>
	</div>
	
  </div>
  
  <style lang="scss">
	/* THALASSICグラデーション */
	.gradation {
	  width: 100vw;
	  height: 100vh;
	  position: fixed;
	  left: 0;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  overflow: hidden;
	  z-index: 0;
	  opacity: 1;
	}
  
	.gradation div {
	  position: absolute;
	  border-radius: 50%;
	  animation: gradient 4s infinite;
	  filter: blur(100px);
	}
  
	@keyframes gradient {
	  70% {
		transform: scale(1.5) translate(80px);
	  }
	}
  
	.gradation div:nth-child(1) {
	  height: 90%;
	  width: 80%;
	  background-color: #ced1c8;
	  left: -30%;
	  top: -10%;
	}
  
	.gradation div:nth-child(2) {
	  height: 80%;
	  width: 60%;
	  background-color: #8ac5db;
	  top: -10%;
	  right: 0%;
	  animation-delay: 0.8s;
	}
  
	.gradation div:nth-child(3) {
	  height: 65%;
	  width: 80%;
	  background-color: #0a1a8f;
	  bottom: -15%;
	  right: -20%;
	  animation-delay: 0.3s;
	}
  
	.gradation div:nth-child(4) {
	  height: 50%;
	  width: 75%;
	  background-color: #f1af9b;
	  bottom: -10%;
	  left: -50%;
	  animation-delay: 1.2s;
	}
  
	.gradation::after {
	  position: absolute;
	  content: "";
	  height: 100%;
	  width: 100%;
	  z-index: 1;
	}
	


	
	.outer-wrapper {
		position: relative;
		width: 100%;
		min-height: 100vh;
		min-height: 100dvh; /* ✅ Dynamic viewport height */
		z-index: 10;
		transform-origin: center center;
		overflow: hidden;
		background: #ffffff; /* ✅ 背景を白に追加 */
	}

	/* ✅ inner-bodyも同様 */
	.inner-body {
		position: relative;
		width: 100%;
		min-height: 100vh;
		min-height: 100dvh; /* ✅ dvh対応 */
		background: #ffffff; /* ✅ 追加 */
	}

	/* ✅ グラデーションも dvh 対応 */
	.gradation {
		width: 100vw;
		height: 100vh;
		height: 100dvh; /* ✅ dvh対応 */
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 0;
		opacity: 1;
	}

	/* ✅ ページコンテナ */
	.page-container {
		width: 100%;
		min-height: 100vh;
		min-height: 100dvh; /* ✅ dvh対応 */
		background: #ffffff;
		transform-origin: center center;
	}

	[data-page="next"] {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		height: 100dvh; /* ✅ dvh対応 */
		min-height: 100vh;
		min-height: 100dvh;
		z-index: 2;
	}

	/* ✅ 白オーバーレイも dvh */
	.white-overlay {
		position: absolute;
		inset: 0;
		height: 100%;
		min-height: 100vh;
		min-height: 100dvh;
		background: #ffffff;
		z-index: 200;
		pointer-events: none;
		transform: translateY(100%);
	}
  </style>