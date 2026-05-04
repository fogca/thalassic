<script lang="ts">
    import { lang } from '$lib/utils/lang';
    import { t } from './New.dict';
  </script>
  
  <!-- ============================================================
       ヒーローセクション
       ============================================================ -->
  <div class="hero-section">
    <div class="image-wrap">
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
      inset: 0;
      width: 100vw;
      height: 100lvh;
      overflow: hidden;
      z-index: 1;
    }

    .image-bg {
      position: absolute;
      inset: 0;
      width: 100vw;
      height: 100lvh;
      object-fit: cover;
      object-position: center center;
      display: block;
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
      padding-bottom: 0.1em;
    }

    .hero-title .word {
      display: inline-block;
    }

    .hero-title .char {
      display: inline-block;
    }

    .hero-title h1 {
      margin-bottom: 10px;
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