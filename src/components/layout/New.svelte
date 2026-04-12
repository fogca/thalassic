<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { CustomEase } from 'gsap/CustomEase';
    import { get } from 'svelte/store';
    import { opDone } from '$lib/stores/opDone';
    import { lang } from '$lib/utils/lang';
    import { t } from './New.dict';

    gsap.registerPlugin(ScrollTrigger, CustomEase);

    // Fast in (power1-like) → slow expo-style deceleration at the end
    const imageRevealEase = CustomEase.create('imageReveal', 'M0,0 C0.4,0 0.2,1 1,1');

    let sectionEl  = $state<HTMLElement>();
    let imageWrapEl = $state<HTMLElement>();
    let ctx: gsap.Context | null = null;

    function runAnimation() {
      if (!sectionEl || !imageWrapEl) return;
      ctx?.revert();

      ctx = gsap.context(() => {
        // ── Image reveal: wrapper grows from bottom → 100vh ───────
        // The image inside is always 100vw×100vh (object-fit:cover).
        // Only the wrapper height clips it — so the image never scales.
        gsap.set(imageWrapEl!, { height: 0 });
        gsap.set(sectionEl!.querySelector('.image-bg'), { y: '18%' });

        const tl = gsap.timeline({ delay: 0.8 });

        tl.to(imageWrapEl!, {
          height: '100%',
          duration: 1.6,
          ease: imageRevealEase,
        });

        tl.to(sectionEl!.querySelector('.image-bg'), {
          y: '0%',
          duration: 1.6,
          ease: imageRevealEase,
        }, '<');

        // ── Text chars ────────────────────────────────────────────
        const lines = sectionEl!.querySelectorAll('.hero-title .line');
        lines.forEach((line, i) => {
          tl.to(line.querySelectorAll('.char'), {
            y: '0%',
            opacity: 1,
            duration: 1.0,
            ease: 'expo.out',
            stagger: 0.012,
          }, 0.8 + i * 0.08);
        });

        tl.to(sectionEl!.querySelector('.hero-title p'), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.3');

      }, sectionEl);
    }

    onMount(() => {
      // Run immediately if OP already done (e.g. non-first visit)
      if (get(opDone)) {
        runAnimation();
      } else {
        // Wait for OpAnimation to complete, then run
        const unsub = opDone.subscribe((done) => {
          if (!done) return;
          unsub();
          runAnimation();
        });
      }

      return () => ctx?.revert();
    });
  </script>
  
  <!-- ============================================================
       ヒーローセクション
       ============================================================ -->
  <div class="hero-section" bind:this={sectionEl}>
    <!-- Image: overflow:hidden on wrap, img is 120% tall for parallax room -->
    <div class="image-wrap" bind:this={imageWrapEl}>
      <img
        class="image-bg"
        src="/images/top_02.webp"
        alt=""
        loading="eager"
        decoding="async"
      />
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
    /* ── Hero section ───────────────────────────────────────────── */
    .hero-section {
      position: relative;
      width: 100vw;
      height: 100lvh;
      overflow: hidden;
      background: #fff;
    }

    /* ── Image wrap: anchored to bottom, height animated 0→100lvh ─ */
    /* overflow:hidden clips the img; img never changes size.         */
    .image-wrap {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 0; /* GSAP animates this to 100% */
      overflow: hidden;
      z-index: 1;
    }

    .image-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 120lvh; /* extra 20dvh gives room for translate animation */
      object-fit: cover;
      object-position: center center;
      display: block;
      will-change: transform;
      filter: contrast(1.15) brightness(0.9);
    }

    /* ── Text ───────────────────────────────────────────────────── */
    .hero-title {
      position: absolute;
      top: 17.5vh;
      left: 0;
      padding: 0 var(--padding);
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

    .hero-title h1 {
      margin-bottom: 10px;
    }

    .hero-title p {
      opacity: 0;
      transform: translateY(10px);
    }

    /* ── PC/SP text switch ──────────────────────────────────────── */
    .desktop-text { display: block; }
    .mobile-text  { display: none; }

    @media (max-width: 767px) {
      .desktop-text { display: none; }
      .mobile-text  { display: block; }
    }

    @media screen and (max-width: 834px) {

      .hero-title {
        top: 20vh;
        padding: 0 var(--padding);
      }
      .hero-title h1 * {
        line-height: 1.15;
      }
      .hero-title p {
        font-size: 13.5px;
      }
    }
  </style>