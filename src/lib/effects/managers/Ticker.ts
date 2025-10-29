type Subscriber = (t: number) => void;

class Ticker {
  private subs = new Set<Subscriber>();
  private raf = 0;
  private start = 0;

  add(fn: Subscriber) {
    this.subs.add(fn);
    if (!this.raf) this.loop(performance.now());
  }
  remove(fn: Subscriber) {
    this.subs.delete(fn);
    if (!this.subs.size && this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  private loop = (t: number) => {
    if (!this.start) this.start = t;
    for (const fn of this.subs) fn(t - this.start);
    this.raf = requestAnimationFrame(this.loop);
  };
}

let _ticker: Ticker | null = null;
export default function getTicker() {
  if (!_ticker) _ticker = new Ticker();
  return _ticker;
}