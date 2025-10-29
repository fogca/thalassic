import Lenis from '@studio-freight/lenis';
import { readable, writable } from 'svelte/store';

let _lenis: any;

const _progress = writable(0);  // 0..1
const _scrollY  = writable(0);  // px
const _velocity = writable(0);  // px/s

export const mProgress = readable(0, (set) => _progress.subscribe(set));
export const mScrollY  = readable(0, (set) => _scrollY.subscribe(set));
export const mVelocity = readable(0, (set) => _velocity.subscribe(set));

export function initMotionLenis(opts: any = { lerp: 0.08, smoothWheel: true }) {
  if (_lenis) return _lenis;
  _lenis = new Lenis(opts);
  _lenis.on('scroll', (e: any) => {
    _progress.set(e.progress);
    _scrollY.set(e.scroll);
    _velocity.set(e.velocity);
  });
  return _lenis;
}

export function motionRaf(t: number) { _lenis?.raf(t); }
export function getMotionLenis() { return _lenis; }