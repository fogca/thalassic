import Lenis from '@studio-freight/lenis';

let lenis: any;

export const initLenis = (onScroll: (e: { progress: number }) => void) => {
  lenis = new Lenis({ infinite: false, lerp: 0.08 });
  lenis.on('scroll', onScroll);
  return lenis;
};

export const lenisRaf = (time: number) => {
  if (lenis) lenis.raf(time);
};