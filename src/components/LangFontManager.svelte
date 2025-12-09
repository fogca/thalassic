<script>
  import { onMount, onDestroy } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { lang } from '$lib/utils/lang';

  let cleanup = [];
  let currentLang = 'en';

  onMount(() => {
    // Initialize language
    currentLang = lang.init();
    console.log('[LangFontManager] Detected language:', currentLang);
    
    // Set HTML lang attribute immediately
    document.documentElement.setAttribute('lang', currentLang);
    
    // Subscribe to language changes
    const unsubLang = lang.subscribe(newLang => {
      console.log('[LangFontManager] Language changed to:', newLang);
      if (newLang !== currentLang) {
        currentLang = newLang;
        document.documentElement.setAttribute('lang', newLang);
        
        // Reload FONTPLUS when language changes
        if (window.FONTPLUS) {
          setTimeout(() => {
            window.FONTPLUS.reload();
          }, 100);
        }
      }
    });
    cleanup.push(unsubLang);

    // Reload FONTPLUS after navigation (during transition)
    const unsubNav = afterNavigate(() => {
      if (window.FONTPLUS) {
        // Wait for transition to cover screen, then reload
        setTimeout(() => {
          window.FONTPLUS.reload();
        }, 800); // During your page transition
      }
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