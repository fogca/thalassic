// src/lib/lenis.ts (任意)
import Lenis from '@studio-freight/lenis';

export function initLenis() {
  const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.1,          // 慣性（0〜1、低いほどねっとり）
    wheelMultiplier: 1, // スクロール感度
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}