<script lang="ts">
    import { onMount } from 'svelte';
    import GUI from 'lil-gui';
    import Card from '$lib/effects/components/Card.svelte';
    import Background from '$lib/effects/components/Background.svelte';
    import { initLenis, lenisRaf } from '$lib/effects/utils/lenis';
  
    // static/image 配下 → /image/... でOK
    const ASSETS = [
    '/image/TC_home_business1.jpg',
    '/image/TC_home_business2.jpg',
    '/image/TC_top@sp.png',
    '/image/TC_top@pc.png',
      '/image/image.png',
      '/image/imageef.png',
      '/image/image.png',
      
      '/image/image.png',
      '/image/image.png'
    ];
  
    // GUI 用のパラメータ（カード全体で共有）
    const guiCard = {
      radius: 0.95,
      strength: 1.1,
      bulge: 0.0
    };
  
    let rafId = 0;
  
    onMount(() => {
      // Lenis 初期化
      const lenis = initLenis(() => {
        // IntersectionObserver 方式なので progress コールバック不要
      });
  
      // RAF ループで Lenis を更新
      const raf = (time: number) => {
        rafId = requestAnimationFrame(raf);
        lenisRaf(time * 1000);
      };
      raf(0);
  
      // GUI 初期化
      const gui = new GUI();
      const folder = gui.addFolder('Card Uniforms');
      folder.add(guiCard, 'radius', 0, 1, 0.01);
      folder.add(guiCard, 'strength', 0, 3, 0.01);
      folder.add(guiCard, 'bulge', 0, 2, 0.01);
      folder.open();
  
      // クリーンアップ
      return () => {
        cancelAnimationFrame(rafId);
        gui.destroy();
        // lenis.destroy?.();
      };
    });
  </script>
  
  <section class="scroll">
    <Background />
    <div class="grid">
        {#each ASSETS as src, i}
  <Card index={i} src={src} resetOnLeave={true} />
{/each}
    </div>
  </section>
  
  <style>
    .scroll { min-height: 300vh; }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      width: min(1200px, 90vw);
      margin: 10vh auto 40vh;
    }
    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
    }
  </style>