<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import Lenis from 'lenis';
    import Logo from '../snippets/Logo.svelte';
    import { lang } from '$lib/utils/lang';
    import { t } from './New.dict';
    
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
          // ✅ スクロールアニメーションは削除、固定表示のまま
        }
      });
      
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
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        lenisInstance.destroy();
      };
    });
  </script>
  
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
        <!-- ✅ PC版 (768px以上) -->
        <div class="desktop-text">
          <div class="line">
            <span class="word">
              {#each 'SHAPED'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'BY'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each "TIME".split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each "AND".split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each "TIDES".split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
          </div>
  
          <div class="line">
            <span class="word">
              {#each "GUIDING".split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'THE'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'NEXT'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'CENTURYS'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'FORM'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
          </div>
        </div>
  
        <!-- ✅ モバイル版 (767px以下) -->
        <div class="mobile-text">
          <div class="line">
            <span class="word">
              {#each 'SHAPED'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'BY'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
          </div>
  
          <div class="line">
            <span class="word">
              {#each "TIME".split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each "AND".split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each "TIDES".split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
          </div>
  
          <div class="line">
            <span class="word">
              {#each "GUIDING".split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'THE'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'NEXT'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
          </div>
  
          <div class="line">
            <span class="word">
              {#each 'CENTURYS'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
            <span class="word">
              {#each 'FORM'.split('') as char}<span class="char" lang="en">{char}</span>{/each}
            </span>
          </div>
        </div>
      </h1>
      <p class="white">{@html t('heroBody', $lang)}</p>
    </div>
  </div>
  
  <style lang="css">
    /* ============================================================
       ヒーローセクション
       ============================================================ */
    .hero-section {
      position: relative;
      width: 100vw;
      min-height: 100vh;
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
      height: 100vh;
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
      background-size: 400% 100%;
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
  
    /* ✅ PC/モバイル切り替え */
    .desktop-text {
      display: block;
    }
    
    .mobile-text {
      display: none;
    }
    
    @media (max-width: 767px) {
      .desktop-text {
        display: none;
      }
      
      .mobile-text {
        display: block;
      }
    }
    
    .hero-title .line {
      display: flex;
      justify-content: center;
      gap: 0.15em;
      overflow: hidden;
      padding-bottom: 0;
    }
    
    .hero-title .word {
      display: inline-block;
      overflow: hidden;
      padding-bottom: 0;
    }
    
    .hero-title .char {
      display: inline-block;
      transform: translateY(100%);
      opacity: 0;
    }
    
    .hero-title p {
        font-size: 16px;
        letter-spacing: 0.05em;
      opacity: 0;
      transform: translateY(10px);
    }

    @media screen and (max-width: 834px) {
    .hero-title p {
        font-size: 13px;
    }
    }

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
      min-height: 100vh; /* ✅ 固定表示、スクロールしない */
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      background: white;
      overflow: hidden;
    }
    
    /* ✅ 画像分割グリッド（横4分割） */
    .image-grid {
      position: absolute;
      width: 100vw;
      height: 100vh; /* ✅ 100vhに変更（スクロールなし） */
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
      
          padding: calc(var(--padding) * 2) var(--padding);
      color: white;
      z-index: 10;
    }
    
    .hero-title h1,
    .hero-title h1 * {
      font-size: clamp(28px, 4vw, 64px);
      line-height: 1.0;
      color: white;
        -webkit-text-stroke: calc(0.1px + 0.01em) white;
    }
    
    .hero-title .line {
      display: flex;
      justify-content: flex-start;
      gap: 0.3em;
      overflow: hidden;
      padding-bottom: 0.1em;
    }
    
    .hero-title .word {
      display: inline-block;
      overflow: hidden;
      
    }
    
    .hero-title .char {
      display: inline-block;
      transform: translateY(100%);
      opacity: 0;
    }

    .hero-title p {
      opacity: 0;
      transform: translateY(10px);
    }



    @media screen and (max-width: 834px) {


        .hero-title {
            padding: 0 var(--padding);
            top: 52%;
            transform: translateY(-50%);
        }

    }
  </style>