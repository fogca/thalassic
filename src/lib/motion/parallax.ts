import { mScrollY } from './lenisCore';
export function parallax(node: HTMLElement, { speed = 0.15 } = {}) {
  const unsub = mScrollY.subscribe((y) => {
    node.style.transform = `translate3d(0, ${-y * speed}px, 0)`;
  });
  return { destroy(){ unsub(); } };
}