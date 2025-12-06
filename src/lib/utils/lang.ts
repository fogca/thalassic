// src/lib/utils/lang.ts
import { writable } from 'svelte/store';

export type Lang = 'ja' | 'zh' | 'en';

const STORAGE_KEY = 'user-lang';

// Create language store
function createLangStore() {
  const { subscribe, set: sveltSet, update } = writable<Lang>('en');

  return {
    subscribe,
    set: (value: Lang) => {
      // Save to localStorage when manually set
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, value);
      }
      sveltSet(value);
    },
    init: () => {
      const stored = getStoredLang();
      const detected = stored || detectLang();
      sveltSet(detected);
      return detected;
    }
  };
}

export const lang = createLangStore();

/**
 * Detect browser language preference
 */
export function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'en';
  
  const prefs = navigator.languages?.length 
    ? navigator.languages 
    : [navigator.language];

  for (const l of prefs) {
    const lower = l.toLowerCase();
    if (lower.startsWith('ja')) return 'ja';
    if (lower.startsWith('zh')) return 'zh';
    // Default to 'en' for all others
  }
  
  return 'en';
}

/**
 * Get stored language preference from localStorage
 */
export function getStoredLang(): Lang | null {
  if (typeof localStorage === 'undefined') return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ja' || stored === 'zh' || stored === 'en') {
    return stored;
  }
  
  return null;
}

/**
 * Clear stored language (revert to auto-detect)
 */
export function clearStoredLang(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}