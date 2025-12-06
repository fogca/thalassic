// src/lib/utils/fontplus.ts

declare global {
  interface Window {
    FONTPLUS?: {
      reload: (callback?: () => void) => void;
      attachCompleteEvent: (callback: () => void) => void;
      targetSelector: (selector: string) => void;
      async: () => void;
      start: () => void;
      load: (fontData: any[], callback?: () => void, tagId?: string) => void;
      isloading?: () => boolean;
      setFonts: (families: string[]) => void;
    };
  }
}

export type Lang = 'ja' | 'zh' | 'en';

// Font families per language
const FONT_FAMILIES: Record<Lang, string[]> = {
  ja: [
    'TazuganeGothicStdN-Medium',
    'TazuganeGothicStdN-Book',
    'TsukuGoPr5-B',
    'TsukuGoPr5-M'
  ],
  zh: [
    'FZFW-ZhuZiHeiS-B--GB1',
    'FZFW-ZhuZiHeiS-M--GB1',
    'TsukuGoPr5-B',
    'TsukuGoPr5-M'
  ],
  en: [] // English uses system fonts
};

interface FontPlusOptions {
  selector?: string;
  lang?: Lang;
  async?: boolean;
}

/**
 * Initialize FONTPLUS with language-specific fonts
 */
export function fontplusInit(options: FontPlusOptions = {}): Promise<void> {
  const {
    selector = 'body, h1, h2, h3, h4, h5, h6, p, a, span, div, li, button, label, input, textarea, select, td, th',
    lang = 'en',
    async = true
  } = options;

  return new Promise((resolve) => {
    const families = FONT_FAMILIES[lang];
    
    // No fonts needed for English
    if (families.length === 0) {
      resolve();
      return;
    }

    // Wait for FONTPLUS to be available
    const checkInterval = setInterval(() => {
      if (window.FONTPLUS) {
        clearInterval(checkInterval);
        
        try {
          // Configure FONTPLUS
          if (async) {
            window.FONTPLUS.async();
          }
          
          window.FONTPLUS.targetSelector(selector);
          window.FONTPLUS.setFonts(families);
          
          // Complete callback
          window.FONTPLUS.attachCompleteEvent(() => {
            console.log(`[FONTPLUS] Fonts loaded for ${lang}`);
            resolve();
          });
          
          // Start loading
          window.FONTPLUS.start();
        } catch (error) {
          console.error('[FONTPLUS] Initialization error:', error);
          resolve(); // Resolve anyway to not block
        }
      }
    }, 50);

    // Timeout fallback
    setTimeout(() => {
      clearInterval(checkInterval);
      resolve();
    }, 5000);
  });
}

/**
 * Refresh FONTPLUS after DOM changes or navigation
 */
export function fontplusRefresh(lang?: Lang): void {
  if (!window.FONTPLUS) {
    console.warn('[FONTPLUS] Not available');
    return;
  }

  // Check if already loading
  if (window.FONTPLUS.isloading?.()) {
    console.log('[FONTPLUS] Already loading, skipping refresh');
    return;
  }

  try {
    // Update fonts if language specified
    if (lang) {
      const families = FONT_FAMILIES[lang];
      if (families.length > 0) {
        window.FONTPLUS.setFonts(families);
      }
    }

    // Reload fonts
    window.FONTPLUS.reload(() => {
      console.log('[FONTPLUS] Fonts refreshed');
    });
  } catch (error) {
    console.error('[FONTPLUS] Refresh error:', error);
  }
}

/**
 * Check if FONTPLUS is ready
 */
export function isFontPlusReady(): boolean {
  return typeof window !== 'undefined' && !!window.FONTPLUS;
}

/**
 * Get font families for a language
 */
export function getFontFamilies(lang: Lang): string[] {
  return FONT_FAMILIES[lang];
}