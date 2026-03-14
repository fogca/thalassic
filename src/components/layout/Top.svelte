<script lang="ts">
import { onMount } from 'svelte';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lang } from '$lib/utils/lang';
import { t } from './New.dict';
import Ball from '../snippets/Ball.svelte';

gsap.registerPlugin(ScrollTrigger);

/** Ball diameter in pixels (used in Identity section). */
const ballSize = 1200;

const cards = [
  { image: '/images/hotel-accommodation_01.webp', category: '宿泊事業', title: 'HOTEL', link: '/hotel' },
  { image: '/images/recruit-career_01.webp', category: '採用情報', title: 'RECRUITMENT', link: '/about#Recruitment' },
  { image: '/images/top-about_01.webp', category: '会社情報', title: 'ABOUT US', link: '/about' },
  { image: '/images/property-global_01.webp', category: '不動産事業', title: 'REAL ESTATE', link: '/real-estate' }
];

// Hero title: word/char split for animation (from TopHead)
interface CharData { char: string; globalIndex: number; }
interface WordData { word: string; wordIndex: number; chars: CharData[]; }
interface LineData { words: WordData[]; isWhitespace: boolean[]; }

const rawLines = [
  "Echoing the land's",
  "essence, Shaping the next",
  "century's form"
];

let heroTitleEl: HTMLElement | null = null;
let charTotal = 0;
let wordTotal = 0;
const heroTitleLines: LineData[] = rawLines.map((line) => {
  const wordStrings = line.split(' ');
  const words: WordData[] = wordStrings.map((w) => {
    const chars: CharData[] = w.split('').map((c) => ({ char: c, globalIndex: charTotal++ }));
    return { word: w, wordIndex: wordTotal++, chars };
  });
  const isWhitespace = wordStrings.map((_, i) => i < wordStrings.length - 1);
  return { words, isWhitespace };
});

onMount(() => {
  const el = heroTitleEl as HTMLElement | null;
  if (el) {
    const chars = el.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      { opacity: 0, y: 5, rotateX: -90, transformPerspective: 1000 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transformPerspective: 1000,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.0025,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  gsap.to('.Marquee p', {
    xPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.TopSection',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.25,
    }
  });

  gsap.from('.InlineText h1', {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.InlineText',
      start: 'top bottom',
      toggleActions: 'play none none reverse',
    }
  });

  const images = gsap.utils.toArray('.InlineText .image');
  gsap.set(images, { width: 0, height: 0, scale: 0, opacity: 0, margin: 0 });
  gsap.to(images, {
    width: 140,
    height: 80,
    scale: 1,
    opacity: 1,
    margin: '-20px -25px 0',
    duration: 1,
    ease: 'power3.out',
    stagger: 0.2,
    delay: 0.5,
    scrollTrigger: {
      trigger: '.InlineText',
      start: 'top bottom',
      toggleActions: 'play none none reverse',
    }
  });

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
});
</script>







<section class="Identity mt-160 mb-160">
  <div class="wrapper">
    <div class="container">
      <div class="h5 sans" lang="en">Group Company</div>
      <h2 class="h1" lang="en">Three Identities,<br />One Collective Vision.</h2>
      <h3 class="h4">「土地の本質を読み解き、未来へつながる価値を設計する」</h3>
      <p>{t('identityBody', $lang)}</p>
      <a class="button white mt-40" href="/about" lang="en">About Us</a>
    </div>
    <div class="container">
      <Ball size={ballSize} />
    </div>
  </div>
</section>

<section class="Business">
  <div class="wrapper">
    {#each cards as card}
      <a class="container" href={card.link}>
        <img src={card.image} alt={card.title} />
        <div class="overlay"></div>
        <div class="texts">
          <h6 class="white">{card.category}</h6>
          <h2 class="h2 uppercase white" lang="en">{card.title}</h2>
          <div class="button" lang="en">READ MORE</div>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="InlineText">
  <div class="wrapper">
    <h1 class="center uppercase" lang="en">
      Rooted in nature,
      <br />
      Forging <img src="/images/top_04.webp" alt="" class="image" /> the next
      <br />
      century's form <img src="/images/top_05.webp" alt="" class="image" />.
    </h1>
  </div>
</section>

<style lang="scss">
  .Identity {
    padding-top: 0;
    padding-bottom: 0;
    position: relative;
    z-index: 1;
  }

  .Identity .wrapper {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .Identity .wrapper .container:nth-of-type(1) { width: 42.5%; }
  .Identity .wrapper .container:nth-of-type(2) {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: auto;
    right: 0;
  }

  .Identity h2 {
    margin-top: 2rem;
  }

  .Identity h3 {
    margin: 2rem 0 1.5rem;
  }

  @media screen and (max-width: 834px) {
    .Identity {
      margin: 80px 0;
    }

    .Identity .wrapper {
      flex-direction: column;
    }

    .Identity .wrapper .container:nth-of-type(2) {
      position: static;
      width: 100%;
      height: auto;
      margin-top: 2rem;
      right: auto;
      top: auto;
    }
  }





  @media screen and (max-width: 834px) {
    .Hero { height: 150vh; }
    .Hero .container { padding: 0 20px; }
    .Hero .container .h1 { font-size: 32px; margin-bottom: 24px; line-height: 1.5; }
    .Hero .container p { font-size: 14px; letter-spacing: 0.1em; }
    .Hero .largeTextWrap { bottom: 40px; }
    .Hero .largeText { font-size: 48px; letter-spacing: 0; }
  }

  .Business .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 5px;
    width: 100%;
    height: 70vh;
    border-radius: 10px;
    overflow: hidden;
  }

  .Business .container:nth-of-type(1) {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }

  .Business .container:nth-of-type(2) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  .Business .container:nth-of-type(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  .Business .container:nth-of-type(4) {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
  }

  .Business .container {
    position: relative;
    overflow: hidden;
    display: block;
    text-decoration: none;
  }

  .Business .container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .Business .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
  }

  .Business .texts {
    position: absolute;
    bottom: 50px;
    left: 30px;
    z-index: 2;
    color: #ffffff;
  }

  .Business .texts h6 { margin-bottom: 12px; opacity: 0.9; }
  .Business .texts h2 { margin-bottom: 24px; }

  .Business .button {
    display: inline-block;
    padding: 12px 32px;
    background: #ffffff;
    color: #000000;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    border-radius: 24px;
  }

  @media screen and (max-width: 834px) {
    .Business .wrapper {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
      height: auto;
      min-height: 100vh;
    }

    .Business .container:nth-of-type(1),
    .Business .container:nth-of-type(2),
    .Business .container:nth-of-type(3),
    .Business .container:nth-of-type(4) {
      grid-column: 1 / 2;
      grid-row: auto;
    }

    .Business .texts { bottom: 40px; left: 40px; }
    .Business .texts h6 { font-size: 12px; margin-bottom: 8px; }
    .Business .texts h2 { font-size: 32px; margin-bottom: 16px; }
    .Business .button { padding: 10px 24px; font-size: 11px; }
  }

  .InlineText {
    padding: 200px 0 80px;
  }

  .InlineText .wrapper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .InlineText h1 {
    font-size: 100px;
    line-height: 1;
    position: relative;
  }

  .InlineText .image {
    display: inline-block;
    width: 140px;
    height: 80px;
    object-fit: cover;
    vertical-align: middle;
    margin: -20px -25px 0;
    transform-origin: center;
  }

  .InlineText .image:nth-of-type(2) {
    margin-right: 5px;
  }

  @media screen and (max-width: 834px) {
    .InlineText { padding: 120px 0; }
    .InlineText .wrapper { padding: 0 20px; }
    .InlineText h1 { font-size: 48px; line-height: 1.4; }
    .InlineText .image {
      width: 80px;
      height: 50px;
      margin: 0 4px;
    }
  }
</style>
