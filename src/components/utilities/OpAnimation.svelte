<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import Gradation from '../snippets/Gradation.svelte';
  import Logo from '../snippets/Logo.svelte';
  import { opDone } from '$lib/stores/opDone';

  let visible = $state(true);
  let overlayEl = $state<HTMLElement>();
  let logoEl = $state<HTMLElement>();

  onMount(() => {
    sessionStorage.setItem('thalassic-op-done', 'true');

    if (!overlayEl || !logoEl) return;

    const tl = gsap.timeline({
      onComplete: () => {
        visible = false;
        opDone.set(true);
      }
    });

    gsap.set(logoEl, { opacity: 0, y: 12 });

    tl
      // 1. Gradation is immediately visible — hold briefly
      .to({}, { duration: 0.8 })

      // 2. Logo fades in
      .to(logoEl, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      })

      // 3. Hold with logo visible
      .to({}, { duration: 1.0 })

      // 4. Overlay fades out, revealing page content
      .to(overlayEl, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in'
      });

    return () => {
      tl.kill();
    };
  });
</script>

{#if visible}
  <div class="op-overlay" bind:this={overlayEl}>
    <div class="op-gradation">
      <Gradation />
    </div>

    <div class="op-logo" bind:this={logoEl}>
      <Logo />
    </div>
  </div>
{/if}

<style>
  .op-overlay {
    position: fixed;
    inset: 0;
    z-index: 9900;
    pointer-events: none;
  }

  .op-gradation {
    position: absolute;
    inset: 0;
  }

  .op-logo {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .op-logo :global(svg) {
    width: 25vw;
    height: auto;
    filter: brightness(0) invert(1);
  }

  @media (max-width: 768px) {
    .op-logo :global(svg) {
      width: 75vw;
    }
  }
</style>
