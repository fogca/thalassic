<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
  
    let cursorDot;
    let cursorCircle;
    let isHovering = false;
  
    onMount(() => {
      // Only show on desktop
      if (window.innerWidth < 1024) return;
  
      const posDot = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const posCircle = { x: posDot.x, y: posDot.y };
      const mouse = { x: posDot.x, y: posDot.y };
  
      // Update positions
      const updatePosition = () => {
        // Dot follows with slight smooth easing (not instant, but fast)
        const dotSpeed = 0.25;
        posDot.x += (mouse.x - posDot.x) * dotSpeed;
        posDot.y += (mouse.y - posDot.y) * dotSpeed;
        
        // Circle follows with more delay
        const speed = isHovering ? 0.15 : 0.1;
        posCircle.x += (mouse.x - posCircle.x) * speed;
        posCircle.y += (mouse.y - posCircle.y) * speed;
        
        gsap.set(cursorDot, {
          x: posDot.x,
          y: posDot.y,
        });
        
        gsap.set(cursorCircle, {
          x: posCircle.x,
          y: posCircle.y,
        });
      };
  
      // Track mouse movement
      const handleMouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
  
      // Hover effects
      const handleMouseEnter = () => {
        isHovering = true;
        gsap.to(cursorCircle, {
          scale: 2.5,
          backgroundColor: '#3B82F6',
          duration: 0.3,
          ease: 'power2.out'
        });
        cursorCircle.style.mixBlendMode = 'difference';
        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
  
      const handleMouseLeave = () => {
        isHovering = false;
        gsap.to(cursorCircle, {
          scale: 1,
          backgroundColor: 'rgba(59, 130, 246, 0.4)',
          duration: 0.3,
          ease: 'power2.out'
        });
        cursorCircle.style.mixBlendMode = 'normal';
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
  
      // Event listeners
      window.addEventListener('mousemove', handleMouseMove);
      
      const hoverElements = 'a, button, [role="button"], input, textarea, select, .hoverable';
      document.querySelectorAll(hoverElements).forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
  
      // Animation loop
      gsap.ticker.add(updatePosition);
  
      // Hide default cursor
      document.body.style.cursor = 'none';
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        gsap.ticker.remove(updatePosition);
        document.body.style.cursor = 'auto';
      };
    });
  </script>
  
  <div class="cursor-dot" bind:this={cursorDot}></div>
  <div class="cursor-circle" bind:this={cursorCircle}></div>
  
  <style>
    .cursor-dot {
      position: fixed;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #000;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      will-change: transform;
    }
  
    .cursor-circle {
      position: fixed;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgb(8, 71, 171);
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      will-change: transform;
    }
  
    @media (max-width: 1024px) {
      .cursor-dot,
      .cursor-circle {
        display: none;
      }
    }
  
    :global(body) {
      cursor: none !important;
    }
  
    :global(a, button, input, textarea, select) {
      cursor: none !important;
    }
  </style>