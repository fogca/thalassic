<script lang="ts">
    export let size: number = 1500;
  </script>
  
  <div class="container" style="--size: {size}px;">
    <div class="container-inner"></div>
    <div class="circle circle-main"></div>
    <div class="circle circle-small-1"></div>
    <div class="circle circle-small-2"></div>
  </div>
  
  <!-- SVG Filter for Gooey/Metaball effect -->
  <svg style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix 
          in="blur" 
          mode="matrix" 
          values="1 0 0 0 0  
                  0 1 0 0 0  
                  0 0 1 0 0  
                  0 0 0 35 -14" 
          result="goo" 
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
      </filter>
    </defs>
  </svg>
  
  <style>
    .container {
      position: relative;
      width: var(--size);
      height: var(--size);
      filter: url(#goo);
    }

   
  
    .circle {
      position: absolute;
      background: var(--mainColor);
      border-radius: 50%;
      will-change: transform;
    }
  
    /* Main large circle - 28% of container */
    .circle-main {
      width: calc(var(--size) * 0.28);
      height: calc(var(--size) * 0.28);
      top: calc(var(--size) * 0.5);
      left: calc(var(--size) * 0.5);
      margin-top: calc(var(--size) * -0.14);
      margin-left: calc(var(--size) * -0.14);
      animation: 
        splitMain 2s ease-out forwards,
        bobMain 4s ease-in-out 2s infinite;
    }
  
    /* Small circle 1 - 18% of container */
    .circle-small-1 {
      width: calc(var(--size) * 0.18);
      height: calc(var(--size) * 0.18);
      top: calc(var(--size) * 0.5);
      left: calc(var(--size) * 0.5);
      margin-top: calc(var(--size) * -0.09);
      margin-left: calc(var(--size) * -0.09);
      animation: 
        splitSmall1 2s ease-out forwards,
        bobSmall1 5s ease-in-out 2s infinite;
    }
  
    /* Small circle 2 - 16% of container */
    .circle-small-2 {
      width: calc(var(--size) * 0.16);
      height: calc(var(--size) * 0.16);
      top: calc(var(--size) * 0.5);
      left: calc(var(--size) * 0.5);
      margin-top: calc(var(--size) * -0.08);
      margin-left: calc(var(--size) * -0.08);
      animation: 
        splitSmall2 2s ease-out forwards,
        bobSmall2 4.5s ease-in-out 2s infinite;
    }
  
    /* Phase 1: Split apart */
    @keyframes splitMain {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(0, calc(var(--size) * -0.12));
      }
    }
  
    @keyframes splitSmall1 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(calc(var(--size) * -0.1), calc(var(--size) * 0.12));
      }
    }
  
    @keyframes splitSmall2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(calc(var(--size) * 0.2), calc(var(--size) * 0.06));
      }
    }
  
    /* Phase 2: Bob */
    @keyframes bobMain {
      0%, 100% {
        transform: translate(0, calc(var(--size) * -0.12));
      }
      50% {
        transform: translate(0, calc(var(--size) * -0.16));
      }
    }
  
    @keyframes bobSmall1 {
      0%, 100% {
        transform: translate(calc(var(--size) * -0.15), calc(var(--size) * 0.05));
      }
      50% {
        transform: translate(calc(var(--size) * -0.13), calc(var(--size) * 0.07));
      }
    }
  
    @keyframes bobSmall2 {
      0%, 100% {
        transform: translate(calc(var(--size) * 0.1), calc(var(--size) * 0.03));
      }
      50% {
        transform: translate(calc(var(--size) * 0.15), calc(var(--size) * 0.05));
      }
    }
  </style>