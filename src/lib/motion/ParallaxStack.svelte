<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { browser } from '$app/environment';

  /** 使い方: <ParallaxStack layers={[S1,S2,S3]} headerOffset={50} minPinPx={480}/> */
  export let layers: Array<typeof import('svelte').SvelteComponent> = [];
  export let headerOffset = 50;   // ヘッダー高ぶん、上端の固定開始位置
  export let minPinPx = 480;      // 次セクが極端に小さい場合の最低ピン距離

  let wrap: HTMLElement;
  const panelEls: (HTMLElement | undefined)[] = [];  // sticky箱
  const slideEls: (HTMLElement | undefined)[] = [];  // transform対象

  // index付きアクション（bind:this の代替）
  function panelRef(node: HTMLElement, i: number) {
    panelEls[i] = node;
    return { destroy(){ panelEls[i] = undefined; } };
  }
  function slideRef(node: HTMLElement, i: number) {
    slideEls[i] = node;
    return { destroy(){ slideEls[i] = undefined; } };
  }

  // 計測値
  let wrapTop = 0;       // wrap のページ上位置
  let viewH = 0;         // 表示枠の高さ = vh - headerOffset
  let starts: number[] = []; // 各レイヤー固定開始スクロール位置
  let pins: number[] = [];   // 各レイヤーのピン距離（次セクの外形高）

  const clamp = (v:number,a:number,b:number)=>Math.min(b,Math.max(a,v));

  // ---- 計測ユーティリティ ----
  function doubleRaf() {
    return new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  }
  function freezeTransforms(on = true) {
    for (const s of slideEls) {
      if (!s) continue;
      if (on) {
        s.setAttribute('data-prev-tf', s.style.transform || '');
        s.style.transform = 'none';
      } else {
        const prev = s.getAttribute('data-prev-tf') || '';
        s.style.transform = prev;
        s.removeAttribute('data-prev-tf');
      }
    }
  }
  function outerHeightStrong(el: HTMLElement | null): number {
    if (!el) return 0;
    const cs = getComputedStyle(el);
    const mt = parseFloat(cs.marginTop) || 0;
    const mb = parseFloat(cs.marginBottom) || 0;
    const rect = el.getBoundingClientRect();
    const rectH = rect.height;
    const scrollH = el.scrollHeight;
    const clientH = el.clientHeight;
    const maxH = Math.max(rectH, scrollH, clientH);
    return Math.max(0, maxH + mt + mb);
  }

  // ---- 採寸 ----
  async function measure() {
    if (!browser) return;
    await tick();

    freezeTransforms(true);
    await doubleRaf(); // レイアウト確定待ち

    const rect = wrap.getBoundingClientRect();
    wrapTop = (window.scrollY || 0) + rect.top;
    viewH = Math.max(1, window.innerHeight - headerOffset);

    // sticky箱の “見せ枠” を統一
    for (const p of panelEls) if (p) p.style.height = `${viewH}px`;

    // ピン距離 = 次パネル .content の外形高（最後は自分 or 最低値）
    pins = layers.map((_, i) => {
      const nextPanel   = panelEls[i + 1];
      const nextContent = nextPanel?.querySelector('.content') as HTMLElement | null;
      let pin = outerHeightStrong(nextContent);
      if (pin <= 0) {
        const selfContent = panelEls[i]?.querySelector('.content') as HTMLElement | null;
        pin = outerHeightStrong(selfContent);
      }
      return Math.max(minPinPx, pin || 0);
    });

    // 固定開始位置 = wrapTop + 累積ピン
    starts = [];
    let acc = wrapTop;
    for (let i = 0; i < layers.length; i++) {
      starts[i] = acc;
      acc += pins[i];
    }

    // 総スクロール長 = ∑pins + viewH（最後の抜け分）
    const total = pins.reduce((a,b)=>a+b, 0) + viewH;
    wrap.style.height = `${total}px`;

    freezeTransforms(false);

    // デバッグしたいとき:
    // console.table({ wrapTop, viewH, pins, starts, totalHeight: wrap.style.height });
  }

  // ---- 描画ループ（慣性なし＝バウンス回避） ----
  let raf = 0;
  function update() {
    const y = window.scrollY || 0;
    for (let i = 0; i < layers.length; i++) {
      const slide = slideEls[i];
      if (!slide) continue;
      const start = starts[i];
      const end   = start + pins[i];
      const p     = clamp((y - start) / Math.max(1, end - start), 0, 1);
      const ty    = -p * viewH; // 次の面が viewH 分覆い上げる
      slide.style.transform = `translate3d(0, ${ty}px, 0)`;
    }
    raf = requestAnimationFrame(update);
  }

  // ---- 画像ロードや動的変化を監視 ----
  let ros: ResizeObserver[] = [];
  function observeHeights() {
    cleanupRO();
    for (const p of panelEls) {
      if (!p) continue;
      const cnt = p.querySelector('.content') as HTMLElement | null;
      if (!cnt) continue;
      const ro = new ResizeObserver(() => measure());
      ro.observe(cnt);
      ros.push(ro);
    }
  }
  function cleanupRO(){ ros.forEach(ro => ro.disconnect()); ros = []; }

  onMount(() => {
    if (!browser) return;
    measure();
    observeHeights();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure); // 画像/フォント後に再採寸
    raf = requestAnimationFrame(update);
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener('resize', measure);
    window.removeEventListener('load', measure);
    cancelAnimationFrame(raf);
    cleanupRO();
  });
</script>

<div class="stack-wrap" bind:this={wrap}>
  {#each layers as Layer, i (i)}
    <!-- sticky する箱: transform は当てない -->
    <section class="panel" use:panelRef={i} style={`top:${headerOffset}px`}>
      <!-- 動かすのは内側だけ -->
      <div class="slide" use:slideRef={i}>
        <!-- 外形高の採寸用。marginはここに付けるとピン距離に反映 -->
        <div class="content">
          <svelte:component this={Layer} />
        </div>
      </div>
    </section>
  {/each}
</div>

<style>
  .stack-wrap{
    position: relative;
    width: 100%;
    isolation: isolate;
    display: flow-root;
    margin: 0;
    padding: 0;
  }
  .panel{
    position: sticky;
    /* top は style 属性で headerOffset を反映 */
    height: 60vh;       /* 初期値（JSが viewH に置換） */
    z-index: 0;         /* 必要に応じて各セクション側で上書き */
    margin: 0;
    padding: 0;
  }
  .slide{
    position: relative;
    height: 100%;
    will-change: transform; /* ここにだけ transform を適用 */
  }
  .content{
    min-height: 100%;
    /* セクション固有の余白はここに */
  }
</style>