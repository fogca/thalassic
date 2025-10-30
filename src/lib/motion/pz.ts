import { browser } from '$app/environment';

type Opts = {
  selector?: string;
  start?: string;
  end?: string;
  defaultY?: [number, number];
  defaultScale?: [number, number];
};

function parseAspect(s: string) {
  // "16/9" or "1.777..." → number
  if (!s) return null;
  if (s.includes('/')) {
    const [w, h] = s.split('/').map(Number);
    if (w > 0 && h > 0) return w / h;
    return null;
  }
  const n = Number(s);
  return isFinite(n) && n > 0 ? n : null;
}

export function initParallaxZoom(opts: Opts = {}) {
  if (!browser) return () => {};
  const {
    selector = '.pz',
    start = 'top bottom',
    end = 'bottom top',
    defaultY = [-4, 10],
    defaultScale = [1.25, 1.1]
  } = opts;

  let ctx: any;
  let ScrollTrigger: any;

  const setup = async () => {
    // GSAP動的読み込み（SSR回避）
    const { default: gsap } = await import('gsap');
    const mod = await import('gsap/ScrollTrigger');
    ScrollTrigger = mod.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // レデュースモーション対応
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
      ScrollTrigger?.getAll().forEach((st: any) => st.disable());
      return () => {};
    });

    // スコープ
    ctx = gsap.context(async () => {
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(selector));

      // 画像毎に処理
      for (const img of imgs) {
        // まだラップされていなければラップ作成
        if (!img.closest('.pz-wrap')) {
          try { await img.decode?.(); } catch { /* noop */ }

          // 現在の表示サイズを取得
          const rect = img.getBoundingClientRect();
          const curW = rect.width;
          const curH = rect.height;

          // フレームサイズ決定ロジック
          const frameHAttr = img.dataset.frameH ? Number(img.dataset.frameH) : null;
          const frameWAttr = img.dataset.frameW ? Number(img.dataset.frameW) : null;
          const aspect = img.dataset.aspect ? parseAspect(img.dataset.aspect) : null;

          let frameW = curW;
          let frameH = curH;

          if (frameWAttr && frameHAttr) {
            frameW = frameWAttr;
            frameH = frameHAttr;
          } else if (frameWAttr && (aspect || img.naturalWidth)) {
            const ar = aspect ?? (img.naturalWidth / img.naturalHeight);
            frameW = frameWAttr;
            frameH = Math.round(frameW / ar);
          } else if (frameHAttr && (aspect || img.naturalWidth)) {
            const ar = aspect ?? (img.naturalWidth / img.naturalHeight);
            frameH = frameHAttr;
            frameW = Math.round(frameH * ar);
          } else if (aspect) {
            // 現在の幅を尊重しつつ比率で高さ算出
            frameW = curW;
            frameH = Math.round(frameW / aspect);
          } else {
            // 既存表示をそのままロック
            frameW = curW;
            frameH = curH;
          }

          // ラッパDOM作成
          const wrap = document.createElement('div');
          wrap.className = 'pz-wrap';
          // フレーム固定（pxロック）
          wrap.style.position = 'relative';
          wrap.style.overflow = 'hidden';
          wrap.style.width = `${frameW}px`;
          wrap.style.height = `${frameH}px`;
          wrap.style.display = 'block';
          // レイアウト/ペイントの分離で微最適化
          wrap.style.contain = 'layout paint size';

          // DOM入れ替え
          const parent = img.parentElement!;
          parent.insertBefore(wrap, img);
          wrap.appendChild(img);

          // 画像のスタイル（フレーム内でオブジェクトカバー＋絶対配置）
          img.style.position = 'absolute';
          img.style.inset = '0';
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          img.style.willChange = 'transform';
          img.style.transformOrigin = 'center center';
        }

        // アニメーション設定
        const y = (img.dataset.y ?? `${defaultY[0]},${defaultY[1]}`)
          .split(',').map((n) => Number(n.trim())) as [number, number];

        const sc = (img.dataset.scale ?? `${defaultScale[0]},${defaultScale[1]}`)
          .split(',').map((n) => Number(n.trim())) as [number, number];

        // 初期transform
        img.style.transform = `scale(${sc[0]}) translateY(${y[0]}%)`;

        // ScrollTriggerでパン＋ズーム
        gsap.fromTo(
          img,
          { yPercent: y[0], scale: sc[0] },
          {
            yPercent: y[1],
            scale: sc[1],
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.pz-wrap')!, // フレーム基準で発火
              start,
              end,
              scrub: true
            }
          }
        );
      }
    });

    // レイアウト確定後に再計測
    queueMicrotask(() => ScrollTrigger.refresh());
  };

  setup();

  // 破棄
  return () => {
    try {
      const { ScrollTrigger } = (globalThis as any).gsap?.plugins ?? {};
      ScrollTrigger?.killAll?.();
    } catch {}
    ctx?.revert?.();
  };
}