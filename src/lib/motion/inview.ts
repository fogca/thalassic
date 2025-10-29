export function inview(
    node: HTMLElement,
    { threshold = 0.2, once = false, enter = () => {}, leave = () => {} } = {}
  ) {
    if (typeof IntersectionObserver === 'undefined') return { destroy(){} };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { enter(e); if (once) io.unobserve(node); }
        else { leave(e); }
      }
    }, { threshold });
    io.observe(node);
    return { destroy(){ io.disconnect(); } };
  }