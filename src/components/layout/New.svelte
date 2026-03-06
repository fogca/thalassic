<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import Lenis from 'lenis';
    import Logo from '../snippets/Logo.svelte';
    
    gsap.registerPlugin(ScrollTrigger);
    
    let showOP = $state(true);
    let lenisInstance: Lenis;
    
    onMount(() => {
      // ============================================================
      // Lenis セットアップ
      // ============================================================
      lenisInstance = new Lenis({
        duration: 2.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
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
      
      // ✅ ロゴアニメーションをスキップ
      // opTimeline
      //   .to('.op-logo', {
      //     opacity: 1,
      //     duration: 1.5,
      //     ease: 'power2.inOut',
      //   })
      //   .to('.op-logo', {
      //     opacity: 0,
      //     duration: 1,
      //     delay: 1,
      //     ease: 'power2.inOut',
      //   });
      
      // ✅ 画像4分割タイルの初期設定
      const tiles = document.querySelectorAll('.image-tile');
      gsap.set(tiles, { y: '100%' }); // ✅ 最初は下に隠す
      
      // ✅ 画像4分割タイルがstaggerで下から上にスライドイン
      tiles.forEach((tile, index) => {
        opTimeline.to(tile, {
          y: '0%',
          duration: 1.5,
          ease: 'expo.inOut',
        }, index * 0.05); // ✅ すぐスタート
      });
      
      // ✅ テキストアニメーション（行ごとにstagger）
      const lines = document.querySelectorAll('.hero-title .line');
      const textStartTime = opTimeline.duration() - 0.3;
      
      lines.forEach((line, lineIndex) => {
        const lineChars = line.querySelectorAll('.char');
        opTimeline.to(lineChars, {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          ease: 'expo.inOut',
          stagger: 0.015,
        }, textStartTime + (lineIndex * 0.1));
      });
      
      // ✅ サブタイトル
      opTimeline.to('.hero-title p', {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out',
      }, '-=0.2');
      
      // ============================================================
      // スクロールアニメーション
      // ============================================================
      function initScrollAnimation() {
        const heroSection = document.querySelector('.hero-section') as HTMLElement;
        const imageGrid = document.querySelector('.image-grid') as HTMLElement;
        
        if (!heroSection || !imageGrid) return;
        
        // 画像を内部スクロール（残り80-100vhを見せる）
        ScrollTrigger.create({
          trigger: heroSection,
          start: 'top top',
          end: '+=100vh',
          pin: true,
          pinSpacing: false, // ✅ 余白を作らない
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            // 画像を上にスクロール
            imageGrid.style.transform = `translateY(-${progress * 80}vh)`;
          },
        });
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
  <!-- {#if showOP}
    <div class="op-overlay">
      <Logo class="op-logo" width={600} height={150} />
    </div>
  {/if} -->
  
  <!-- ============================================================
       ヒーローセクション
       ============================================================ -->
  <div class="hero-section">
    <!-- ✅ 画像分割グリッド（横4分割） -->
    <div class="image-grid">
      {#each Array(4) as _, i}
        <div class="image-tile" data-index={i}></div>
      {/each}
    </div>
    
    <div class="hero-title">
      <h1>
        <div class="line">
          <span class="word">
            {#each 'ECHOING'.split('') as char}<span class="char">{char}</span>{/each}
          </span>
          <span class="word">
            {#each 'THE'.split('') as char}<span class="char">{char}</span>{/each}
          </span>
          <span class="word">
            {#each "LAND'S".split('') as char}<span class="char">{char}</span>{/each}
          </span>
        </div>
        <div class="line">
          <span class="word">
            {#each 'ESSENCE,'.split('') as char}<span class="char">{char}</span>{/each}
          </span>
          <span class="word">
            {#each 'SHAPING'.split('') as char}<span class="char">{char}</span>{/each}
          </span>
          <span class="word">
            {#each 'THE'.split('') as char}<span class="char">{char}</span>{/each}
          </span>
          <span class="word">
            {#each 'NEXT'.split('') as char}<span class="char">{char}</span>{/each}
          </span>
        </div>
        <div class="line">
          <span class="word">
            {#each "CENTURY'S".split('') as char}<span class="char">{char}</span>{/each}
          </span>
          <span class="word">
            {#each 'FORM'.split('') as char}<span class="char">{char}</span>{/each}
          </span>
        </div>
      </h1>
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
      background: white;
      overflow: hidden;
    }
    
    /* ✅ 画像分割グリッド（横4分割） */
    .image-grid {
      position: absolute;
      width: 100vw;
      height: 180vh; /* ✅ 画像の実際の高さ */
      top: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 1fr;
      z-index: 2;
    }
    
    .image-tile {
      width: 100%;
      height: 100%;
      background-image: url('/images/top_02.jpg');
      background-size: 400% 100%; /* ✅ 横4分割 */
      background-position: top center;
    }
    
    /* 各タイルの背景位置 */
    .image-tile[data-index="0"] { background-position: 0% 0%; }
    .image-tile[data-index="1"] { background-position: 33.333% 0%; }
    .image-tile[data-index="2"] { background-position: 66.666% 0%; }
    .image-tile[data-index="3"] { background-position: 100% 0%; }
    
    /* ============================================================
       テキスト
       ============================================================ */
    .hero-title {
      position: absolute;
      text-align: center;
      color: white;
      z-index: 10;
    }
    
    .hero-title h1 {
      font-size: clamp(1.5rem, 4vw, 3rem);
      font-weight: 300;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }
    
    .hero-title .line {
      display: flex;
      justify-content: center;
      gap: 0.3em;
      overflow: hidden;
      padding-bottom: 0.1em;
    }
    
    .hero-title .word {
      display: inline-block;
      overflow: hidden;
      padding-bottom: 0.1em;
    }
    
    .hero-title .char {
      display: inline-block;
      transform: translateY(100%);
      opacity: 0;
    }
    
    .hero-title p {
      font-size: clamp(0.875rem, 1.5vw, 1rem);
      font-weight: 300;
      letter-spacing: 0.2em;
      opacity: 0;
      transform: translateY(10px);
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