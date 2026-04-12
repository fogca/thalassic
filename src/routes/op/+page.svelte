<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import Lenis from 'lenis';
    import ThalassicLogo from '../../components/snippets/Logo.svelte';
    
    gsap.registerPlugin(ScrollTrigger);
    
    let showOP = $state(true);
    let lenisInstance: Lenis;
    
    onMount(() => {
      // ============================================================
      // Lenis セットアップ
      // ============================================================
      lenisInstance = new Lenis({
        duration: 2.5, // ✅ 1.5 → 2.5 に変更（よりゆっくり）
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false, // ✅ タッチデバイスではスムーススクロール無効
      });
      
      function raf(time: number) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
      
      // ============================================================
      // OPアニメーション
      // ============================================================
      const opTimeline = gsap.timeline({
        onComplete: () => {
          showOP = false;
          initScrollAnimation();
        }
      });
      
      // ロゴ fade in → fade out
      opTimeline
        .to('.op-logo', {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        })
        .to('.op-logo', {
          opacity: 0,
          duration: 1,
          delay: 1,
          ease: 'power2.inOut',
        });
      
      // ✅ 画像分割アニメーション
      // 4x4 = 16タイルに分割して、各タイルが別方向からスライドイン
      const tiles = document.querySelectorAll('.image-tile');
      
      tiles.forEach((tile, index) => {
        const row = Math.floor(index / 4); // 0-3
        const col = index % 4; // 0-3
        
        // タイルごとに異なる開始位置を設定
        let xStart = 0;
        let yStart = 0;
        
        if (row === 0 && col === 0) { xStart = -100; yStart = -100; } // 左上から
        if (row === 0 && col === 1) { xStart = 0; yStart = -100; }    // 上から
        if (row === 0 && col === 2) { xStart = 0; yStart = -100; }    // 上から
        if (row === 0 && col === 3) { xStart = 100; yStart = -100; }  // 右上から
        
        if (row === 1 && col === 0) { xStart = -100; yStart = 0; }    // 左から
        if (row === 1 && col === 1) { xStart = -50; yStart = -50; }   // 左上から
        if (row === 1 && col === 2) { xStart = 50; yStart = -50; }    // 右上から
        if (row === 1 && col === 3) { xStart = 100; yStart = 0; }     // 右から
        
        if (row === 2 && col === 0) { xStart = -100; yStart = 0; }    // 左から
        if (row === 2 && col === 1) { xStart = -50; yStart = 50; }    // 左下から
        if (row === 2 && col === 2) { xStart = 50; yStart = 50; }     // 右下から
        if (row === 2 && col === 3) { xStart = 100; yStart = 0; }     // 右から
        
        if (row === 3 && col === 0) { xStart = -100; yStart = 100; }  // 左下から
        if (row === 3 && col === 1) { xStart = 0; yStart = 100; }     // 下から
        if (row === 3 && col === 2) { xStart = 0; yStart = 100; }     // 下から
        if (row === 3 && col === 3) { xStart = 100; yStart = 100; }   // 右下から
        
        // 初期位置設定
        gsap.set(tile, {
          x: `${xStart}%`,
          y: `${yStart}%`,
          opacity: 0,
        });
        
        // スライドインアニメーション（ずらしながら）
        opTimeline.to(tile, {
          x: '0%',
          y: '0%',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, `-=0.8`); // 少しずつずらして実行
      });
      
      // ============================================================
      // スクロールアニメーション
      // ============================================================
      function initScrollAnimation() {
        const heroSection = document.querySelector('.hero-section') as HTMLElement;
        const imageGrid = document.querySelector('.image-grid') as HTMLElement;
        const heroTitle = document.querySelector('.hero-title') as HTMLElement;
        const gradientOverlay = document.querySelector('.gradient-overlay') as HTMLElement;
        
        if (!heroSection || !imageGrid || !heroTitle || !gradientOverlay) return;
        
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: '+=100vh',
            pin: true,
            pinSpacing: true,
            scrub: 1,
          }
        });
        
        // ✅ テキストをフェードイン
        scrollTl.fromTo(heroTitle,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 100, ease: 'none' },
          0
        );
        
        // ✅ グラデーションをフェードイン
        scrollTl.to(gradientOverlay, {
          opacity: 1,
          duration: 50,
          ease: 'none',
        }, 50);
      }
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        lenisInstance.destroy();
      };
    });
  </script>
  
  <!-- ============================================================
       OPアニメーション
       ============================================================ -->
  {#if showOP}
    <div class="op-overlay">
      <ThalassicLogo class="op-logo" width={600} height={150} />
    </div>
  {/if}
  
  <!-- ============================================================
       ヒーローセクション
       ============================================================ -->
  <div class="hero-section">
    <!-- ✅ グラデーションオーバーレイ（最初は非表示） -->
    <div class="gradient-overlay"></div>
    
    <!-- ✅ 画像分割グリッド（4x4 = 16タイル） -->
    <div class="image-grid">
      {#each Array(16) as _, i}
        <div class="image-tile" data-index={i}></div>
      {/each}
    </div>
    
    <div class="hero-title">
      <h1 lang="en">ECHOING THE LAND'S ESSENCE, SHAPING THE NEXT CENTURY'S FORM</h1>
      <p>土地の豊かさを知り、次の100年を形作る</p>
    </div>
  </div>
  
  <!-- ============================================================
       次のコンテンツ（通常スクロール）
       ============================================================ -->
  <div class="content-section">
    <div class="content-inner">
      <h2>Next Section</h2>
      <p>ここから通常のスクロールになります</p>
      <p style="height: 200vh;">Scroll content...</p>
    </div>
  </div>
  
  <style lang="scss">
    /* ============================================================
       OPオーバーレイ
       ============================================================ */
    .op-overlay {
      position: fixed;
      inset: 0;
      background: #ffffff;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .op-overlay :global(.op-logo) {
      opacity: 0;
    }
    
    /* ============================================================
       ヒーローセクション
       ============================================================ */
    .hero-section {
      position: relative;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white; /* ✅ 白背景 */
      overflow: hidden;
    }
    
    /* ✅ グラデーションオーバーレイ */
    .gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, #1a3a5c 0%, #4a7ba7 100%);
      opacity: 0; /* ✅ 初期値は0（OPアニメーションで1になる） */
      z-index: 1;
      pointer-events: none;
    }
    
    /* ✅ 画像分割グリッド */
    .image-grid {
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      z-index: 2;
    }
    
    .image-tile {
      width: 100%;
      height: 100%;
      background-image: url('/images/top_02.webp');
      background-size: 400% 400%; /* ✅ 4x4グリッドなので400% */
      opacity: 0;
    }
    
    /* ✅ 各タイルの背景位置を設定（4x4グリッド） */
    .image-tile[data-index="0"] { background-position: 0% 0%; }
    .image-tile[data-index="1"] { background-position: 33.333% 0%; }
    .image-tile[data-index="2"] { background-position: 66.666% 0%; }
    .image-tile[data-index="3"] { background-position: 100% 0%; }
    
    .image-tile[data-index="4"] { background-position: 0% 33.333%; }
    .image-tile[data-index="5"] { background-position: 33.333% 33.333%; }
    .image-tile[data-index="6"] { background-position: 66.666% 33.333%; }
    .image-tile[data-index="7"] { background-position: 100% 33.333%; }
    
    .image-tile[data-index="8"] { background-position: 0% 66.666%; }
    .image-tile[data-index="9"] { background-position: 33.333% 66.666%; }
    .image-tile[data-index="10"] { background-position: 66.666% 66.666%; }
    .image-tile[data-index="11"] { background-position: 100% 66.666%; }
    
    .image-tile[data-index="12"] { background-position: 0% 100%; }
    .image-tile[data-index="13"] { background-position: 33.333% 100%; }
    .image-tile[data-index="14"] { background-position: 66.666% 100%; }
    .image-tile[data-index="15"] { background-position: 100% 100%; }
    
    .hero-title {
      position: absolute;
      text-align: center;
      color: #ffffff;
      z-index: 10;
      transform: scale(0.6);
      opacity: 0;
      transform-origin: center center;
      pointer-events: none;
    }
    
    .hero-title h1 {
      font-size: clamp(1.5rem, 4vw, 3rem);
      font-weight: 300;
      letter-spacing: 0.1em;
      margin: 0 0 1rem 0;
      line-height: 1.3;
      max-width: 1200px;
      padding: 0 2rem;
    }
    
    .hero-title p {
      font-size: clamp(0.875rem, 1.5vw, 1rem);
      font-weight: 300;
      letter-spacing: 0.2em;
      margin: 0;
    }
    
    /* ============================================================
       次のコンテンツ
       ============================================================ */
    .content-section {
      background: #ffffff;
      min-height: 100vh;
      padding: 4rem 2rem;
    }
    
    .content-inner {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .content-inner h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  </style>