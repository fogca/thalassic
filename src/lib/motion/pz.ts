import { browser } from '$app/environment';

type Opts = {
  selector?: string;
  start?: string;
  end?: string;
  defaultY?: [number, number];
  defaultScale?: [number, number];
  /** Lenis を外で作っているなら渡す。未指定なら window を使う */
  lenis?: any;
};

function parseAspect(s: string | null | undefined) {
  if (!s) return null;
  if (s.includes('/')) {
    const [w, h] = s.split('/').map(Number);
    return w > 0 && h > 0 ? w / h : null;
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
    defaultScale = [1.25, 1.1],
    lenis
  } = opts;

  let ctx: any;
  let gsap: any;
  let ScrollTrigger: any;
  // scroller は Lenis があれば <html>、なければ window
  const scrollerEl: HTMLElement | Window = lenis ? document.documentElement : window;

  const setup = async () => {
    ({ default: gsap } = await import('gsap'));
    ({ ScrollTrigger } = await import('gsap/ScrollTrigger'));
    gsap.registerPlugin(ScrollTrigger);

    // ✅ Lenis 併用時の scrollerProxy（これが無いと詰まる）
    if (lenis) {
      ScrollTrigger.scrollerProxy(scrollerEl, {
        scrollTop(value?: number) {
          if (arguments.length) {
            lenis.scrollTo(value!, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0, left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        // iOS などで transform pin と競合しないように
        pinType: 'transform'
      });
      // Lenis が動いたら ST 更新
      lenis.on('scroll', () => ScrollTrigger.update());
    }

    ctx = gsap.context(async () => {
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(selector));

      for (const img of imgs) {
        // ラップが無ければ作る
        if (!img.closest('.pz-wrap')) {
          try { await img.decode?.(); } catch {}

          const rect = img.getBoundingClientRect();
          let frameW = rect.width;
          let frameH = rect.height;

          const aspect = parseAspect(img.dataset.aspect);
          const frameWAttr = img.dataset.frameW ? Number(img.dataset.frameW) : null;
          const frameHAttr = img.dataset.frameH ? Number(img.dataset.frameH) : null;

          if (frameWAttr && frameHAttr) {
            frameW = frameWAttr; frameH = frameHAttr;
          } else if (frameWAttr && (aspect || img.naturalWidth)) {
            const ar = aspect ?? (img.naturalWidth / img.naturalHeight);
            frameW = frameWAttr; frameH = Math.round(frameW / ar);
          } else if (frameHAttr && (aspect || img.naturalWidth)) {
            const ar = aspect ?? (img.naturalWidth / img.naturalHeight);
            frameH = frameHAttr; frameW = Math.round(frameH * ar);
          } else if (aspect) {
            frameW = rect.width;
            frameH = Math.round(frameW / aspect);
          }

          const wrap = document.createElement('div');
          wrap.className = 'pz-wrap';
          wrap.style.position = 'relative';
          wrap.style.overflow = 'hidden';
          wrap.style.display = 'block';
          // 幅はレイアウト任せ。高さは aspect があればそちら優先
          wrap.style.width = '100%';
          if (aspect) {
            (wrap.style as any).aspectRatio = String(aspect);
            wrap.style.height = 'auto';
          } else {
            wrap.style.height = `${frameH}px`;
          }
          wrap.style.contain = 'paint';

          const parent = img.parentElement!;
          parent.insertBefore(wrap, img);
          wrap.appendChild(img);

          // 画像スタイル
          img.style.position = 'absolute';
          img.style.inset = '0';
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          img.style.willChange = 'transform';
          img.style.transformOrigin = 'center center';
        }

        const y = (img.dataset.y ?? `${defaultY[0]},${defaultY[1]}`)
          .split(',').map((n) => Number(n.trim())) as [number, number];

        const sc = (img.dataset.scale ?? `${defaultScale[0]},${defaultScale[1]}`)
          .split(',').map((n) => Number(n.trim())) as [number, number];

        img.style.transform = `scale(${sc[0]}) translateY(${y[0]}%)`;

        gsap.fromTo(
          img,
          { yPercent: y[0], scale: sc[0] },
          {
            yPercent: y[1],
            scale: sc[1],
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.pz-wrap')!,
              start, end, scrub: true,
              scroller: scrollerEl,              // ✅ 重要
              invalidateOnRefresh: true,
              fastScrollEnd: true
            }
          }
        );
      }
    });

    ScrollTrigger.refresh();
  };

  setup();

  // 破棄
  return () => {
    ctx?.revert?.();
    if (ScrollTrigger) {
      // この機能が作った分だけ消す（サイト全消しはしない）
      ScrollTrigger.getAll().forEach((st: any) => {
        if ((st.vars?.trigger as Element)?.classList?.contains('pz-wrap')) st.kill();
      });
      ScrollTrigger.refresh();
    }
  };
}