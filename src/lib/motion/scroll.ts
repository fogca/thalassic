import { browser } from '$app/environment';
import Lenis from '@studio-freight/lenis';

let lenis: any;

export async function initScrollSystem() {
  if (!browser) return;

  const { default: gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);

  // Lenis 初期化
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  function raf(time: number) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return { gsap, ScrollTrigger, lenis };
}

// ------------------------------------------------------------------
// 🧱 stack cards effect (自動高さ計測 + pin固定)
// ------------------------------------------------------------------

export function initStackCards({ selector = '.card', headerOffset = 50, overlapRatio = 0.15 } = {}) {
  if (!browser) return () => {};
  let ScrollTrigger: any;
  let ctx: any;

  (async () => {
    const { default: gsap } = await import('gsap');
    const mod = await import('gsap/ScrollTrigger');
    ScrollTrigger = mod.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(selector);

    cards.forEach((card, i) => {
      const stage = document.createElement('div');
      stage.className = 'card-stage';
      stage.style.position = 'relative';
      stage.style.width = '100%';
      card.parentElement?.insertBefore(stage, card);
      stage.appendChild(card);

      const zIndex = cards.length - i;
      card.style.zIndex = String(zIndex);

      const layout = () => {
        const h = card.offsetHeight;
        const end = h;
        stage.style.height = `${end}px`;

        ScrollTrigger.getById(`card-${i}`)?.kill();

        gsap.to(card, {
          ease: 'none',
          scrollTrigger: {
            id: `card-${i}`,
            trigger: stage,
            start: `top top+=${headerOffset}`,
            end: `+=${end}`,
            scrub: true,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            pinType: 'fixed',
          },
        });
      };

      layout();
      new ResizeObserver(layout).observe(card);
      window.addEventListener('resize', layout);
    });

    setTimeout(() => ScrollTrigger.refresh(), 100);
  })();

  return () => {
    const { ScrollTrigger } = (globalThis as any).gsap?.plugins ?? {};
    ScrollTrigger?.getAll?.().forEach((st: any) => st.kill());
    ctx?.revert?.();
  };
}