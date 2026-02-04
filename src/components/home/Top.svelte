<script lang="ts">
import { onMount } from 'svelte';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMount(() => {
  // スクロール量に応じてマーキーをアニメーション
  gsap.to('.Marquee p', {
    xPercent: -50, // マーキーの移動量
    ease: 'none',
    scrollTrigger: {
      trigger: '.TopSection',
      start: 'top bottom',
      end: 'bottom top',
      scrub: .25, // スクロールに完全に連動（数字が大きいほど遅延）
    }
  });

  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
});
</script>


<div class="TopSection">
  <div class="bg_wrapper">
    <div class="bg"></div>
    <div class="cloud">
      <img src="/image/THALASSIC_KVa.png" alt="" class="" />
    </div>
  </div>


  <section class="Sky">
    <div class="wrapper">
      <div class="container">
        <h1 class="h0 white center" lang="en">
          Echoing the land's<br>essence, Shaping<br>the next century's form
        </h1>
        <h2 class="white h4 center">土地の豊かさを知り、次の100年を形作る</h2>
      </div>
    </div>
    <div class="Marquee">
      <p lang="en">Thalassic Capital Shaping The Next</p>
    </div>
  </section>

  <section class="Identity">
    <div class="wrapper">
      <div class="container">
        <div class="h4" lang="en">Company</div>
        <h2 class="h1" lang="en">Three Identities,<br>One Collective Vision.</h2>
        <h3 class="h4">「土地の本質を読み解き、未来へつながる価値を設計する」</h3>
        <p>サラシックキャピタルは、日本とオーストラリアを拠点に、<br>
          不動産事業と宿泊事業を展開するグループ企業です。<br>
          多様で国際的なプロフェッショナルが集い、<br>
          国境を越えたまだ見ぬ可能性を開拓します。<br>
          地域に根ざした価値を未来へと繋ぐことを目指し、<br>
          地域の未来が輝く不動産・宿泊体験を創造していきます。
        </p>
      </div>
      <div class="container">
        
      </div>
    </div>
  </section>

</div>

<style>
  .TopSection {
    position: relative;
    overflow: hidden;
    margin-bottom: 180px;
  }

  .TopSection .bg_wrapper {
    position: absolute;
    top: 0;
    z-index: 0;
    width: 100vw;
    height: 100%;
    height: 133.2vw;
    overflow: hidden;
    z-index: 0;
  }

  .TopSection .bg_wrapper .bg {
    aspect-ratio: 3 / 4;
    background-image: url('/image/THALASSIC_KV.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  @media screen and (min-width: 720px) {
    .TopSection .bg_wrapper {height: 100vw;}
    .TopSection .bg_wrapper .bg {
    aspect-ratio: 1 / 1;
    background-image: url('/image/THALASSIC_KV_PC.jpg');}
  }

  .TopSection .bg_wrapper .cloud {
    position: absolute;
    top: -70vh;
    left: 40vw;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
  }

  .TopSection .bg_wrapper .cloud img {
    position: absolute;
    top: 5%;
    left: 0;
    width: 100%;
    height: auto;
    opacity: 0.9;
  }

  .Sky .wrapper {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }
  .Marquee {
    position: fixed;
    bottom: -20px;
    left: 0;
    width: 100%;
    z-index: 2;
    pointer-events: none;
    overflow: hidden;
    display: none;
  }

  .Marquee p {
    font-size: 128px;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0);
    white-space: nowrap;
    text-transform: uppercase;
    margin: 0;
    will-change: transform;
    line-height: 1;
    -webkit-text-stroke: 1px #FFF;
    transition: color .5s ease-in-out;
  }

  .Marquee p:hover {color:rgba(255, 255, 255, 1);}

  @media screen and (max-width: 834px) {
    .Marquee {
      bottom: 40px;
    }

    .Marquee p {
      font-size: 48px;
      letter-spacing: 0;
    }
  }

  .Identity {
    padding-top: 60px;
    height: 100vh;
    position: relative;
    z-index: 1;
  }
  .Identity h2 {margin-top: 2rem;}
  .Identity h3 {margin: 2rem 0 1.5rem;}
  .Identity * {color: white;}



  @media screen and (max-width: 834px) {
    .Hero {
      height: 150vh;
    }

    .Hero .container {
      padding: 0 20px;
    }

    .Hero .container .h1 {
      font-size: 32px;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .Hero .container p {
      font-size: 14px;
      letter-spacing: 0.1em;
    }

    .Hero .largeTextWrap {
      bottom: 40px;
    }

    .Hero .largeText {
      font-size: 48px;
      letter-spacing: 0;
    }
  }
</style>