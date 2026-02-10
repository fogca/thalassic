<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
    gsap.registerPlugin(ScrollTrigger);
  
    onMount(() => {
      // テキスト全体のフェードイン
      gsap.from('.InlineText h1', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.InlineText',
          start: 'top bottom', // 要素のtopが画面のbottomに入った瞬間
          toggleActions: 'play none none reverse',
        }
      });
  
      // 画像とスペースのアニメーション
      const images = gsap.utils.toArray('.InlineText .image');
      
      images.forEach((img, index) => {
        // 画像の初期状態を設定
        gsap.set(images, {
          width: 0,
          height: 0,
          scale: 0,
          opacity: 0,
          margin: 0
        });
  
        // アニメーション
        gsap.to(images, {
          width: index === 0 ? 140 : 140,
          height: 80,
          scale: 1,
          opacity: 1,
          margin: index === 0 ? '-20px -25px 0' : '-20px 5px 0 -25px',
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.2 + 0.5,
          scrollTrigger: {
            trigger: '.InlineText',
            start: 'top bottom', // 要素のtopが画面のbottomに入った瞬間
            toggleActions: 'play none none reverse',
          }
        });
      });
    });
  </script>
  
  <section class="InlineText">
    <div class="wrapper">
      <h1 class="center uppercase" lang="en">
        Rooted in nature,
        <br />
        Forging <img src="/image/THALASSIC_Ocean.webp" alt="" class="image" /> the next
        <br />
        century's form <img src="/image/TC_top.webp" alt="" class="image" />.
      </h1>
    </div>
  </section>
  
  <style>
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
      .InlineText {
        padding: 120px 0;
      }
  
      .InlineText .wrapper {
        padding: 0 20px;
      }
  
      .InlineText h1 {
        font-size: 48px;
        line-height: 1.4;
      }
  
      .InlineText .image {
        width: 80px;
        height: 50px;
        margin: 0 4px;
      }
    }
  </style>