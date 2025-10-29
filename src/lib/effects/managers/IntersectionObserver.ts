// src/lib/effects/managers/IntersectionObserver.ts
type Entry = {
    el: Element;
    onEnter: (entry: IntersectionObserverEntry) => void;
    onLeave: (entry: IntersectionObserverEntry) => void;
  };
  
  class IOManager {
    private map = new Map<string, Entry>();
    private observer: IntersectionObserver | null = null;
  
    private ensureObserver() {
      // SSR では window が無い / Polyfill が無いときは何もしない
      if (this.observer) return;
      if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
  
      this.observer = new IntersectionObserver(this.onObserved, { threshold: 0.3 });
    }
  
    observe(id: string, el: Element, onEnter: Entry['onEnter'], onLeave: Entry['onLeave']) {
      this.ensureObserver();
      (el as HTMLElement).dataset.intersectId = id;
      this.map.set(id, { el, onEnter, onLeave });
      this.observer?.observe(el); // SSR時はnullなので無視される
    }
  
    unobserve(id: string) {
      const e = this.map.get(id);
      if (!e) return;
      this.observer?.unobserve(e.el);
      this.map.delete(id);
    }
  
    private onObserved = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.intersectId;
        if (!id) continue;
        const item = this.map.get(id);
        if (!item) continue;
        if (entry.isIntersecting) item.onEnter(entry);
        else item.onLeave(entry);
      }
    };
  }
  
  // ⚠️ ここで即生成しない（SSRで落ちるため）
  // 代わりに遅延シングルトンを返す関数をエクスポート
  let _io: IOManager | null = null;
  export default function getIO() {
    if (!_io) _io = new IOManager();
    return _io;
  }