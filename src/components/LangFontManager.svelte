<script>
  import { onMount, onDestroy } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { lang } from '$lib/utils/lang';
  import { fontplusInit, fontplusRefresh } from '$lib/utils/fontplus';

  let cleanup = [];
  let currentLang = 'en';

  onMount(() => {
    // Initialize language FIRST (auto-detect or use stored)
    currentLang = lang.init();
    console.log('[LangFontManager] Detected language:', currentLang);
    
    // Set HTML lang attribute immediately
    document.documentElement.setAttribute('lang', currentLang);
    
    // Then subscribe to future changes
    const unsubLang = lang.subscribe(newLang => {
      console.log('[LangFontManager] Language changed to:', newLang);
      if (newLang !== currentLang) {
        currentLang = newLang;
        document.documentElement.setAttribute('lang', newLang);
        
        // Refresh fonts when language changes
        requestAnimationFrame(() => {
          fontplusRefresh(newLang);
        });
      }
    });
    cleanup.push(unsubLang);

    // Initialize FONTPLUS for current language
    fontplusInit({
      lang: currentLang,
      async: true
    }).then(() => {
      console.log(`[LangFontManager] FONTPLUS initialized with lang: ${currentLang}`);
      // Multiple refresh attempts to ensure fonts load
      requestAnimationFrame(() => fontplusRefresh(currentLang));
      setTimeout(() => fontplusRefresh(currentLang), 500);
      setTimeout(() => fontplusRefresh(currentLang), 1000);
    });

    // Refresh fonts after navigation
    const unsubNav = afterNavigate(() => {
      requestAnimationFrame(() => {
        fontplusRefresh(currentLang);
      });
    });
    cleanup.push(unsubNav);
  });

  onDestroy(() => {
    cleanup.forEach(fn => fn());
  });
</script>

<svelte:head>
  <script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?kqbwQX--jVA%3D&box=9boKdvabiOQ%3D&aa=1&ab=2" defer></script>
</svelte:head>