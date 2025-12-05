<script>
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import Lenis from '@studio-freight/lenis';
  
    let lenis;
  
    // Elements to animate
    const selectors = 'section, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, p, img, .card';
  
    // 1. First view animation (immediate on page load)
    function animateFirstView() {
      const elements = gsap.utils.toArray(selectors);
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          gsap.to(el, { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: 'power2.out' 
          });
        }
      });
    }
  
    // 2. Scroll animation (triggers as you scroll down)
    function setupScrollAnimations() {
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      gsap.utils.toArray(selectors).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          }
        });
      });
  
      ScrollTrigger.refresh();
    }
  
    onMount(() => {
      gsap.registerPlugin(ScrollTrigger);
  
      // Setup smooth scroll
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
  
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
  
      // Initial setup
      animateFirstView();
      setupScrollAnimations();
  
      return () => {
        lenis?.destroy();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });
  
    // After navigation: reset and animate
    afterNavigate(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, { immediate: true });
        
        setTimeout(() => {
          animateFirstView();
          setupScrollAnimations();
        }, 100);
      }, 950);
    });
  </script>
  
  <style>
    :global(section),
    :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6),
    :global(.h1), :global(.h2), :global(.h3), :global(.h4), :global(.h5), :global(.h6),
    :global(p), :global(img), :global(.card) {
      opacity: 0;
      transform: translateY(15px);
    }
  </style>