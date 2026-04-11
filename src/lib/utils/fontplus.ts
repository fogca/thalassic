// src/lib/utils/fontplus.ts
export function reloadFontPlus() {
    if (typeof window !== 'undefined' && window.FONTPLUS) {
      setTimeout(() => {
        if (!window.FONTPLUS?.isloading()) {
          console.log('[FontPlus] Reloading for language change');
          window.FONTPLUS?.reload(true);
        }
      }, 300);
    }
  }