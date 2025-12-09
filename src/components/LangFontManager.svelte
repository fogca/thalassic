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
    
    // Set fonts when FONTPLUS is ready
    const checkFontPlus = setInterval(() => {
      if (window.FONTPLUS) {
        clearInterval(checkFontPlus);
        if (fonts[currentLang].length > 0) {
          window.FONTPLUS.setFonts(fonts[currentLang]);
          window.FONTPLUS.start();
        }
      }
    }, 100);
    
    // Subscribe to language changes
    const unsubLang = lang.subscribe(newLang => {
      if (newLang !== currentLang) {
        currentLang = newLang;
        document.documentElement.setAttribute('lang', newLang);
        
        // Update fonts and restart
        if (window.FONTPLUS && fonts[newLang].length > 0) {
          window.FONTPLUS.setFonts(fonts[newLang]);
          window.FONTPLUS.reload(() => {
            window.FONTPLUS.start();
          });
        }
      }
    });
    cleanup.push(unsubLang);

    // Reload and restart after navigation
    const unsubNav = afterNavigate(() => {
      if (window.FONTPLUS) {
        setTimeout(() => {
          window.FONTPLUS.reload(() => {
            window.FONTPLUS.start();
          });
        }, 800);
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