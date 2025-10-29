// src/lib/effects/utils/isTouch.js
export function isTouch() {
    // iOS PWA 対応
    if ('standalone' in navigator) return true;
  
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return true;
  
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (fine) return false; // マウス優先
  
    // 後方互換
    return 'ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0);
  }