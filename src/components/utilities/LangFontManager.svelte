<script>
  import { onMount, onDestroy } from 'svelte';
  import { lang } from '$lib/utils/lang';

  let cleanup = [];
  let currentLang = 'en';

  onMount(() => {
    // Initialize language
    currentLang = lang.init();
    document.documentElement.setAttribute('lang', currentLang);
    console.log('[LangManager] Initial lang:', currentLang);
    
    // Subscribe to language changes
    const unsubLang = lang.subscribe(newLang => {
      if (newLang !== currentLang) {
        console.log('[LangManager] Language changed:', currentLang, '->', newLang);
        currentLang = newLang;
        document.documentElement.setAttribute('lang', newLang);
      }
    });
    cleanup.push(unsubLang);
  });

  onDestroy(() => {
    cleanup.forEach(fn => fn());
  });
</script>