<script lang="ts">
  import Logo from "../snippets/Logo.svelte";
  import { slide } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { afterNavigate } from '$app/navigation';
  import Links from "../snippets/pageLinks.svelte";
  import Fontplus from '../utilities/Fontplus.svelte';
  import { reloadFontPlus } from '../../lib/utils/fontplus'; // ← これ追加
 
  let y: number = 0

  import { lang } from '$lib/utils/lang'; // NEW path, not '$lib/lang'
  import { t } from './Header.dict';

  let hotelHeroEndY = browser ? window.innerHeight : 800;

  function updateHotelHeroEndY() {
    if (!browser) return;
    if ($page.url.pathname !== '/hotel') {
      hotelHeroEndY = window.innerHeight;
      return;
    }

    const accommodationSection = document.querySelector('section.accomodation') as HTMLElement | null;
    hotelHeroEndY = accommodationSection
      ? accommodationSection.getBoundingClientRect().top + window.scrollY
      : window.innerHeight;
  }

  // White header mode on dark hero sections.
  // For /hotel, keep white until the accommodation section starts.
  $: isHero =
    $page.url.pathname === '/contact' ||
    $page.url.pathname === '/about' ||
    ((['/'].includes($page.url.pathname) && y < (browser ? window.innerHeight : 800)) ||
      ($page.url.pathname === '/hotel' && y < hotelHeroEndY));

let opens = false;

const langLabel = (l: 'ja' | 'zh' | 'en') => {
  if (l === 'ja') return '日本語';
  if (l === 'zh') return '中文';
  return 'English';
};

function select(newLang) {
  lang.set(newLang); // This saves to localStorage
  opens = false;
  open = false; // ✅ メニューを閉じる
  reloadFontPlus(); // ✅ 追加
}


let open = false;
const toggle = () => (open = !open);

// Close SP menu after any navigation (cross-page)
afterNavigate(() => {
  open = false;
  if (browser) {
    requestAnimationFrame(updateHotelHeroEndY);
  }
});

// Close SP menu immediately when any link inside is clicked (handles same-page hash)
function handleMenuLinkClick(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('a')) {
    open = false;
  }
}

onMount(() => {
  if (!browser) return;
  updateHotelHeroEndY();
  window.addEventListener('resize', updateHotelHeroEndY);
});

onDestroy(() => {
  if (!browser) return;
  window.removeEventListener('resize', updateHotelHeroEndY);
});

</script>
  
<svelte:window bind:scrollY={y} />

  <header class:scrolled={y > 100} class:hero={isHero}>
  
      <div class="left">
          <a href="/" class="logo"><Logo /></a>
          
      </div>

      

      <div class="right">

          <nav class="pc">
              <ul>
              
                  <li><a class="h5" href="/real-estate">{t('realestate', $lang)}</a></li>
                  <li><a class="h5" href="/hotel"   >{t('hotel', $lang)}</a></li>
                  <li><a class="h5" href="/about"      >{t('about', $lang)}</a></li>
                  <li><a class="h5" href="/about#Recruitment">{t('recruit', $lang)}</a></li>
                  <li><a class="h5" href="/contact"    >{t('contact', $lang)}</a></li>
                  <li>
                      <div class="lang-switch">
                          <!-- toggle button -->
                          <button class="current" on:click={() => (opens = !opens)}>
                            <span>{langLabel($lang)}</span>
                            <span class="arrow" class:open={opens}>▾</span>
                          </button>
                        
                          {#if opens}
                            <div class="dropdown">
                              <button class="item" on:click={() => select('ja')}>日本語</button>
                              <button class="item" on:click={() => select('zh')}>中文</button>
                              <button class="item" on:click={() => select('en')}>English</button>
                            </div>
                          {/if}
                        </div>
                  </li>
              </ul>
          </nav>

          
          <a href="/about#recruitment" class="pc" style="display: none;">
            <img src="/images/top-header_01.webp" alt="" class="" loading="eager" decoding="async" />
          </a>
          
          <button class="menu-btn sp" on:click={toggle} aria-label="menu">
              <span class:open={open}></span>
              <span class:open={open}></span>
          </button>

      </div>
      
      
  
      <!-- オーバーレイメニュー -->
      <div class="overlay" class:open={open} on:click={toggle}>
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <nav class="menu" on:click|stopPropagation on:click={handleMenuLinkClick}>
             <Links />

             <div class="lang">
              <button class="item" class:active={$lang === 'ja'} on:click={() => select('ja')}>日本語</button>
              <button class="item" class:active={$lang === 'zh'} on:click={() => select('zh')}>中文</button>
              <button class="sans item" class:active={$lang === 'en'} on:click={() => select('en')}>English</button>
             </div>
          </nav>
      </div>

      



  
  </header>


  
<style>
  
header {
  width: 100vw;
  height: 50px;
  padding: .5rem var(--padding) 0;
  position: fixed;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  background-color: var(--backgroundColor);
  background-color: transparent;
  border-bottom: .5px solid rgba(0,0,0,0.1);
  border-bottom: none;
}


header .left {
  display: flex;
  white-space: nowrap;
  width: auto;
  opacity: 1;
}

header img {
  width: auto;
  height: 45px;
  margin-right: 8px;   
}


header, header * {transition: all 1000ms cubic-bezier(0.19, 1, 0.22, 1);}


header .right {
  display: flex;
  align-items: center;
}
.menu-btn {
position: relative;
width: 25px;
height: 8px;
display: flex;
flex-direction: column;
justify-content: space-between;
border: none;
background: none;
cursor: pointer;
z-index: 10;
  margin-right: -15px;
}
.menu-btn span {
display: block;
width: 100%;
height: 1.5px;
background: #000;
border-radius: 2px;
transition: all 0.3s ease;
}
.menu-btn span.open:first-child {
transform: translateY(3.5px) rotate(30deg);
}
.menu-btn span.open:last-child {
transform: translateY(-3.5px) rotate(-30deg);
}

/* --- overlay --- */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}
.overlay.open {
  background: rgba(0, 0, 0, 0.6);
  opacity: 1;
  pointer-events: auto;
}

/* --- menu --- */
.menu {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px var(--padding) 45px;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}
.overlay.open .menu {
transform: translateX(0);
}
.menu a {
text-decoration: none;
color: #000;
font-size: 1.2rem;
margin-bottom: 1.2rem;
}

.menu .lang {
display: flex;
gap: 15px;
}

.menu .lang button.item {
padding: 0;
font-size: 16px;
opacity: 0.3; /* ✅ デフォルトで薄く */
transition: opacity 0.3s ease;
}

.menu .lang button.item.active {
opacity: 1; /* ✅ 選択中の言語は不透明 */
}


.lang-switch {
  position: relative;
  display: inline-block;
  user-select: none;
  font-size: 14px;
}

button {
  all: unset;
  cursor: pointer;
}

.current {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 4px;
  background: #f3f3f3;
}

.arrow {
  transition: transform 0.2s;
  display: inline-block;
}
.arrow.open {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-radius: 4px;
  padding: 4px 0;
  width: 80px;
  z-index: 10;
}

.item {
  padding: 8px 12px;
  cursor: pointer;
}
.item:hover {
  background: #f0f0f0;
}


/* --- hero mode (top page, before 100vh scroll) --- */
header.hero {
  background-color: transparent;
  border-bottom-color: transparent;
}
header.hero :global(a),
header.hero :global(a *),
header.hero :global(button),
header.hero :global(button *),
header.hero :global(span) {
  color: #fff !important;
  -webkit-text-stroke-color: #fff !important;
}
/* SP overlay menu has white background — keep text dark regardless of hero mode */
header.hero .overlay :global(a),
header.hero .overlay :global(a *),
header.hero .overlay :global(button),
header.hero .overlay :global(button *),
header.hero .overlay :global(span) {
  color: var(--textColor) !important;
  -webkit-text-stroke-color: var(--textColor) !important;
}
header.hero .menu-btn span {
  background: #fff;
}
header.hero .menu-btn span.open {
  background: var(--textColor);
}
header.hero :global(svg path) {
  fill: #fff;
}
header.hero .current {
  background: rgba(255,255,255,0.2);
}
header.hero .dropdown {
  background: #fff;
}
header.hero .dropdown button,
header.hero .dropdown :global(button *),
header.hero .dropdown :global(span) {
  color: var(--textColor) !important;
  -webkit-text-stroke-color: var(--textColor) !important;
}

@media screen and (min-width: 720px) {

  
  header {
      height: 60px;
      padding: 2.8rem 25px 2rem;
      background-color: transparent;
      border-bottom: 0;
  }

  header .right nav li {
      display: inline;
      margin: 0 1rem;
  }

  header img {
      height: 55px;
      margin-right: -15px;
      margin-left: 15px;
  }
  header .logo {margin-left: 10px;}

  .menu-btn.sp {display: none;}


}
  
  
  
</style>