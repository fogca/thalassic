<script>
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    
    let fontsLoaded = false;
    let showContent = false;
  
    onMount(() => {
      // Wait for FONTPLUS to be available
      const waitForFontPlus = setInterval(() => {
        if (window.FONTPLUS) {
          clearInterval(waitForFontPlus);
          initializeFonts();
        }
      }, 50);
  
      return () => clearInterval(waitForFontPlus);
    });
  
    function initializeFonts() {
      // Set async mode to control loading
      window.FONTPLUS.async();
      
      // Target all text selectors
      window.FONTPLUS.targetSelector('body, h1, h2, h3, h4, h5, h6, p, a, span, div, li, td, th, label, button, input, textarea, select');
      
      // Attach complete event handler
      window.FONTPLUS.attachCompleteEvent(() => {
        fontsLoaded = true;
        showContent = true;
      });
      
      // Start loading fonts
      window.FONTPLUS.start();
    }
  
    // Reload fonts after navigation
    afterNavigate(() => {
      if (window.FONTPLUS && fontsLoaded) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          window.FONTPLUS.reload(() => {
            console.log('Fonts reloaded after navigation');
          });
        }, 100);
      }
    });
  </script>
  
  <!-- Hide content until fonts are loaded -->
  {#if !showContent}
    <div class="font-loading">
      <!-- Optional: Add a subtle loading indicator -->
    </div>
  {/if}
  
  <div class="content-wrapper" class:loaded={showContent}>
    <slot />
  </div>
  
  <style>
    .font-loading {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #ffffff;
      z-index: 99998;
    }
  
    .content-wrapper {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  
    .content-wrapper.loaded {
      opacity: 1;
    }
  </style>