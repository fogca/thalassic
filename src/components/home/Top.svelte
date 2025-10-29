<script>
	import Arrow from "../../components/Arrow.svelte"
</script>

<section class="" id="HomeTop" lang="jp">
    <!-- モバイル用：テキストブロック -->
    <div class="texts-container">
      <div>
      <h2 class="hero__title bold">出会いを大切に、<br>
        広がる未来を共に築く。</h2>
      <p class="h7 half"lang="en">Building futures together<br>
        with THALASSIC CAPITAL</p>
  
      <a href="#" class="h5 serif underline" lang="en">
        <span lang="en">Discover More</span>
        <Arrow />
      </a>
      </div>
    </div>
  
    
    <div class="image-container w100">
      <img src="../../image/TC_top@sp.png" alt="" loading="eager" decoding="async" />
      <!-- PC時のみ有効化されるオーバーレイ -->
      <div class="hero__overlay" aria-hidden="true"></div>
  
      <!-- PC用：画像の上に重ねるテキストブロック -->
      <div class="hero__texts hero__texts--overlay">
        <h2 class="hero__title"></h2>
        <p class="hero__subtitle"></p>
        <p class="hero__body"></p>
  
        <a href="#" class="hero__link">
          <span>Discover More</span>
          <svg class="hero__arrow" viewBox="0 0 22 10" aria-hidden="true">
            <path d="M0 5h18M14 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </section>



  <style>
:root{
  --hero-pad: clamp(16px, 4vw, 32px);
  --hero-max: 1280px;
  --hero-text-w: 560px;         /* PC：テキスト幅 */
  --overlay-from: rgba(0,0,0,0.55);
  --overlay-to: rgba(0,0,0,0.0);
  --link-underline: currentColor;
  --hero-ratio: 56.25%;         /* 16:9 -> PCで見出しが重なる比率に調整可 */
}



#HomeTop {
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#HomeTop .texts-container {
    margin-top: 50px;
  height: 50vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#HomeTop .texts-container p {margin: 8px 0 20px;}

#HomeTop .image-container {
  width: 100vw;
  height: 50vh;
  height: 50svh;
}

#HomeTop .image-container img {height: 100%;}












.hero{
  width: 100%;
  margin-inline: auto;
  padding: var(--hero-pad);
  container-type: inline-size; /* 将来の微調整用（オプション） */
}

/* --------- SP：テキスト -> 画像の縦並び --------- */
.hero__texts--overlay{ display: none; } /* SPでは重ねテキスト非表示 */

.hero__texts--stack{
  max-width: 680px;
  margin-inline: auto;
  display: grid;
  gap: .8rem;
}



.hero__arrow{ width: 1.1em; height: auto; }

/* 画像ボックス */
.hero__media{
  position: relative;
  margin-top: min(6vw, 28px);
  overflow: hidden;
  isolation: isolate; /* overlayとブレンドさせない */
}

.hero__media img{
  width: 100%;
  height: 50vh;
  height: 50svh;
  display: block;
  object-fit: cover;
}

/* --------- PC：画像全面・左下にオーバーレイ＋テキスト重ね --------- */
@media (min-width: 960px){
  .hero{
    padding: clamp(24px, 4vw, 40px);
    max-width: calc(var(--hero-max) + 2*var(--hero-pad));
  }

  /* SPのスタックテキストはPCで非表示 */
  .hero__texts--stack{ display: none; }

  .hero__media{
    margin-top: 0;
    aspect-ratio: auto;
    height: auto;
    /* 枠いっぱいで見せたい場合はコメント解除
    width: min(100%, var(--hero-max));
    */
  }

  /* 比率固定（16:9など）で画像面を確保したいとき */
  .hero__media::before{
    content: "";
    display: block;
    padding-top: var(--hero-ratio);
  }
  .hero__media > img,
  .hero__overlay,
  .hero__texts--overlay{
    position: absolute;
    inset: 0;
  }

  .hero__media > img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 左下→右上に向かうグラデ */
  .hero__overlay{
    background: linear-gradient(135deg, var(--overlay-from) 0%, var(--overlay-to) 55%);
    pointer-events: none;
  }

  /* テキストを左下に寄せる */
  .hero__texts--overlay{
    display: grid;
    align-content: end;
    padding: clamp(24px, 6vw, 64px);
    gap: 1rem;
    color: #fff;
    max-width: none;
  }

  .hero__texts--overlay > *{
    max-width: var(--hero-text-w);
  }

  .hero__link::after{ opacity: .8; }
}


  </style>
  