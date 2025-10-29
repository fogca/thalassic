import { inview } from './inview';
export function reveal(node: HTMLElement, { y = 16, dur = 500, delay = 0 } = {}) {
  node.style.opacity = '0';
  node.style.transform = `translate3d(0, ${y}px, 0)`;
  return inview(node, {
    threshold: 0.2, once: true,
    enter() {
      setTimeout(() => {
        node.animate(
          [
            { opacity: 0, transform: `translate3d(0, ${y}px, 0)` },
            { opacity: 1, transform: 'translate3d(0,0,0)' }
          ],
          { duration: dur, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }
        );
      }, delay);
    }
  });
}