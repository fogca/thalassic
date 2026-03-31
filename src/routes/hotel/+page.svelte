<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { gsap } from 'gsap';

    import Hotel from '../../components/snippets/Hotel.svelte';
  
    import { t } from './services.dict';
    import { lang } from '$lib/utils/lang';
  
    // ============================================================
    // 画像データ - static/images/ から参照
    // ============================================================
    const imageData = [
      { src: '/images/hotel_01.webp' },
      { src: '/images/hotel_02.webp' },
      { src: '/images/hotel-accommodation_01.webp' },
      { src: '/images/hotel-accommodation_01.webp' },
      { src: '/images/hotel-accommodation_01.webp' },
    ];
  
    // ============================================================
    // 画像切り替えのスクロール位置（px）
    // imageBreakpoints[i] を超えたら imageData[i] に切り替わる
    // ============================================================
    const imageBreakpoints = [0, 500, 1000, 1500, 2000];
  
    // ============================================================
    // state
    // ============================================================
    type ImgState = {
      el: HTMLImageElement | null;
      loaded: boolean;
      loading: boolean;
    };
  
    let imgStates: ImgState[] = imageData.map(() => ({
      el: null,
      loaded: false,
      loading: false,
    }));
  
    let imageRefs: (HTMLImageElement | null)[] = [];
    let activeIndex = -1;
    let ticking = false;
  
    // ============================================================
    // スクロール量 → 画像インデックスを決定
    // ============================================================
    function resolveIndex(scrollY: number): number {
      let matched = 0;
      for (let i = 0; i < imageBreakpoints.length; i++) {
        if (scrollY >= imageBreakpoints[i]) matched = i;
        else break;
      }
      return matched;
    }
  
    // ============================================================
    // スクロールハンドラ（rAFでスロットル）
    // ============================================================
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const idx = resolveIndex(window.scrollY);
        if (idx !== activeIndex) {
          if (imgStates[idx]?.loaded) {
            switchImage(idx);
          } else {
            preloadImage(idx, () => switchImage(idx));
          }
        }
        ticking = false;
      });
    }
  
    // ============================================================
    // 画像切り替え
    // ============================================================
    function switchImage(index: number, instant = false) {
      if (index === activeIndex) return;
  
      const prev = imgStates[activeIndex];
      const next = imgStates[index];
      if (!next?.el) return;
  
      if (prev?.el) {
        gsap.killTweensOf(prev.el);
        gsap.to(prev.el, {
          opacity: 0,
          duration: instant ? 0 : 0.8,
          ease: 'power2.inOut',
          onComplete: () => { prev.el!.style.zIndex = '0'; },
        });
      }
  
      gsap.killTweensOf(next.el);
      next.el.style.zIndex = '1';
      gsap.to(next.el, {
        opacity: 1,
        duration: instant ? 0 : 0.8,
        ease: 'power2.out',
      });
  
      activeIndex = index;
  
      // 次の画像を先読み
      if (imgStates[index + 1] && !imgStates[index + 1].loaded) {
        preloadImage(index + 1);
      }
    }
  
    // ============================================================
    // 画像プリロード
    // ============================================================
    function preloadImage(index: number, callback?: () => void) {
      const state = imgStates[index];
      if (!state || state.loading) { callback?.(); return; }
      if (state.loaded) { callback?.(); return; }
  
      state.loading = true;
      const el = state.el;
      if (!el) return;
  
      const done = () => {
        state.loaded = true;
        state.loading = false;
        callback?.();
      };
  
      if (el.complete && el.naturalWidth !== 0) { done(); return; }
      el.onload  = done;
      el.onerror = done;
    }
  
    // ============================================================
    // onMount / onDestroy
    // ブラウザ環境でのみ実行（SSR対策）
    // ============================================================
    onMount(() => {
      if (!browser) return;
  
      // DOM参照をセット・全画像を opacity:0 で初期化
      imageRefs.forEach((el, i) => {
        if (el) {
          imgStates[i].el = el;
          gsap.set(el, { opacity: 0 });
        }
      });
  
      // 最初の画像を即表示
      preloadImage(0, () => switchImage(0, true));
      // 2枚目を先読み
      preloadImage(1);
  
      window.addEventListener('scroll', onScroll, { passive: true });
    });
  
    onDestroy(() => {
      if (!browser) return;
      window.removeEventListener('scroll', onScroll);
    });
  </script>
  
  <!-- ============================================================
       Markup
       ============================================================ -->
  
  <div class="ScrollStory">
  
    <!-- 背景（fixed） -->
    <div class="bg">
      <div class="bg-images">
        {#each imageData as img, i}
          <img
            class="bg-img"
            src={img.src}
            alt=""
            bind:this={imageRefs[i]}
            draggable="false"
          />
        {/each}
      </div>
      <div class="bg-overlay"></div>
    </div>
  
    <!-- コンテンツ（通常スクロール） -->
    <div class="content">
  
      <section class="topLayout topLayoutPages">
        <div class="texts-container">
          <div></div>
          <div>
            <h1 class="h2 hero__title uppercase white" lang="en">Woven with<br>local soul.</h1>
            <h2 class="h5 hero__subtitle serif vertical">{@html t('heading', $lang)}</h2>
          </div>
          
        </div>
        
      </section>
  
      <section class="serviceBody mt-200">
        <div class="l-Contents">
          <div class="heading">
            <h2 class="h3 white mb-10" lang="en">Hotel<br>Business</h2>
            <h5 class="serif">{t('business', $lang)}</h5>
          </div>
          <div class="container">
            <p class="serif">{@html t('concept', $lang)}</p>
          </div>
        </div>
      </section>

      <section class="serviceBody">
        <div class="l-Contents">
          <div class="heading">
            <h2 class="h3 white mb-10" lang="en">What is<br>Mokuseki</h2>
            <h5 class="serif">{t('philosophy', $lang)}</h5>
          </div>
          <div class="container">
            <p class="serif">{@html t('mokuseki', $lang)}</p>
          </div>
        </div>
      </section>
  
    </div>
  </div>



  <section class="accomodation">

    <Hotel />

    <div class="accomodation__wrapper" style="display: none;">

      <a href="/hotel/mokuseki" class="accomodation__container">
        <img class="accomodation__image" src="/images/hotel-accommodation_01.webp" alt=""/>
        <div class="accomodation__overlay"></div>
        <div class="accomodation__texts">
          <h2 class="accomodation__title" lang="en">Nagoya Kamejima</h2>
          <p class="accomodation__subtitle">名古屋白壁に構える和風建築</p>
        </div>
      </a>
      <a href="/hotel/mokuseki" class="accomodation__container">
        <img class="accomodation__image" src="/images/hotel-accommodation_02.webp" alt=""/>
        <div class="accomodation__overlay"></div>
        <div class="accomodation__texts">
          <h2 class="accomodation__title" lang="en">Nagoya Castle I</h2>
          <p class="accomodation__subtitle">名古屋白壁に構える和風建築</p>
        </div>
      </a>
      <a href="/hotel/mokuseki" class="accomodation__container">
        <img class="accomodation__image" src="/images/hotel-accommodation_04.webp" alt=""/>
        <div class="accomodation__overlay"></div>
        <div class="accomodation__texts">
          <h2 class="accomodation__title" lang="en">Nagoya Castle II</h2>
          <p class="accomodation__subtitle">名古屋白壁に構える和風建築</p>
        </div>
      </a>
      <a href="/hotel/mokuseki" class="accomodation__container">
        <img class="accomodation__image" src="" alt=""/>
        <div class="accomodation__overlay"></div>
        <div class="accomodation__texts">
          <h2 class="accomodation__title" lang="en">Coming Soon</h2>
          <p class="accomodation__subtitle">名古屋白壁に構える和風建築</p>
        </div>
      </a>
    </div>
  </section>
  
  <!-- ============================================================
       Styles
       ============================================================ -->
  <style lang="css">
    .content * { color: white; }

    
    .l-Contents .heading h2 {
      line-height: 1.25;
      margin-bottom: 10px;}
      
    
    .serif {
        font-size: 18px;
        font-family: "FOT-筑紫Aオールド明朝 Pr6 M", "TsukuAOldMinPr6-M", TsukuAOldMinPr6-M, "fot-tsukuaoldmin-pr6n", serif;
        font-weight: 300;
        font-style: normal;
    }

    .vertical {
      -ms-writing-mode: tb-rl;
        writing-mode: vertical-rl;
        font-feature-settings: "palt" 0;
    }

    .serif:lang(en) {
        font-size: 18px;
        font-family: var(--heading-font);
        -ms-writing-mode: horizontal-tb;
        writing-mode: horizontal-tb;
        -webkit-text-stroke: 0;
    }

    :global(.topLayout) .texts-container {
      height: 100vh;
      height: 100dvh;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    :global(.topLayout) .texts-container h1 {
      font-size: 24px;
    position: absolute;
    top: auto;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    }
    :global(.topLayout) .texts-container h2 {
      font-size: 24px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .serviceBody p {height: 60vh;}
  
    .ScrollStory {
      position: relative;
      width: 100%;
    }
  
    /* --- 背景（fixed） --- */
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100lvh;
      z-index: 0;
      pointer-events: none;
    }
  
    .bg-images {
      position: absolute;
      inset: 0;
    }
  
    .bg-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      will-change: opacity;
      backface-visibility: hidden;
      user-select: none;
      pointer-events: none;
      display: block;
    }
  
    /* 暗幕 */
    .bg-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.75) 50%,
        rgba(0, 0, 0, 0.9) 100%
      );
      pointer-events: none;
      z-index: 1;
    }
  
    /* --- コンテンツ --- */
    .content {
      position: relative;
      z-index: 1;
    }

    /* --- Accommodation banner --- */
    .accomodation {
      position: relative;
      z-index: 1;
      width: 100%;
      background-color: white;
      padding: 160px var(--pcPadding);
      padding-bottom: 1px;
    }

    .accomodation__wrapper {
      width: 100%;
      margin-top: 40px;
    }

    .accomodation__container {
      display: block;
      position: relative;
      width: 100%;
      height: 50vh;
      overflow: hidden;
      margin-bottom: 1px;
    }

    .accomodation__image {
      display: block;
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .accomodation__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.2) 50%,
        transparent 100%
      );
      pointer-events: none;
    }

    .accomodation__texts {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem 8rem;
      pointer-events: none;
    }

    .accomodation__title,
    .accomodation__subtitle {
      color: white;
      margin: 0;
    }

    .accomodation__title {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 500;
      letter-spacing: 0.05em;
    }

    .accomodation__subtitle {
      margin-top: 0.5em;
      font-size: clamp(0.875rem, 2vw, 1rem);
      font-weight: 300;
    }
  </style>