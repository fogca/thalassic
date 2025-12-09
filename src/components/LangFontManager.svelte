<script>
  import { onMount, onDestroy } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { lang } from '$lib/utils/lang';

  // Font families for each language (exact names from FONTPLUS)
  const fonts = {
    ja: ['TazuganeGothicStdN-Medium', 'TazuganeGothicStdN-Regular'],
    zh: ['FZFW-ZhuZiHeiS-B--GB1', 'FZFW-ZhuZiHeiS-D--GB1'],
    en: ['NeueHaasUnicaPro-Medium', 'NeueHaasUnicaPro-Regular']
  };

  let cleanup = [];
  let currentLang = 'en';

  onMount(() => {
    // Initialize language
    currentLang = lang.init();
    document.documentElement.setAttribute('lang', currentLang);
    console.log('[LangFontManager] Initial lang:', currentLang);
    
    // Set fonts when FONTPLUS is ready
    const checkFontPlus = setInterval(() => {
      if (window.FONTPLUS) {
        clearInterval(checkFontPlus);
        console.log('[FONTPLUS] Library loaded');
        if (fonts[currentLang].length > 0) {
          console.log('[FONTPLUS] setFonts:', fonts[currentLang]);
          window.FONTPLUS.setFonts(fonts[currentLang]);
          console.log('[FONTPLUS] start() - initial');
          window.FONTPLUS.start();
        }
      }
    }, 100);
    
    // Subscribe to language changes
    const unsubLang = lang.subscribe(newLang => {
      if (newLang !== currentLang) {
        console.log('[LangFontManager] Language changed:', currentLang, '->', newLang);
        currentLang = newLang;
        document.documentElement.setAttribute('lang', newLang);
        
        // Update fonts and restart
        if (window.FONTPLUS && fonts[newLang].length > 0) {
          console.log('[FONTPLUS] setFonts on lang change:', fonts[newLang]);
          window.FONTPLUS.setFonts(fonts[newLang]);
          console.log('[FONTPLUS] reload() on lang change');
          window.FONTPLUS.reload(() => {
            console.log('[FONTPLUS] start() after lang change');
            window.FONTPLUS.start();
          });
        }
      }
    });
    cleanup.push(unsubLang);

    // Fire FONTPLUS on every route change (SPA navigation)
    const unsubNav = afterNavigate(() => {
      console.log('[LangFontManager] Navigation detected');
      if (window.FONTPLUS) {
        // Immediate execution for new page content
        requestAnimationFrame(() => {
          console.log('[FONTPLUS] Route change - current lang:', currentLang);
          if (fonts[currentLang].length > 0) {
            console.log('[FONTPLUS] setFonts on route:', fonts[currentLang]);
            window.FONTPLUS.setFonts(fonts[currentLang]);
          }
          console.log('[FONTPLUS] reload() on route change');
          window.FONTPLUS.reload();
          console.log('[FONTPLUS] start() on route change');
          window.FONTPLUS.start();
        });
      } else {
        console.warn('[FONTPLUS] Not available on route change');
      }
    });
    cleanup.push(unsubNav);
  });

  onDestroy(() => {
    cleanup.forEach(fn => fn());
  });
</script>

<svelte:head>
  <script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?kqbwQX--jVA%3D&box=9boKdvabiOQ%3D&aa=1&ab=2&nolist=1"></script>
</svelte:head>