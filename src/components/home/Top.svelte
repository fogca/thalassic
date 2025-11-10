<script lang="ts">
	import Link from "../../components/Link.svelte"

  import { lang } from '$lib/lang';
  import { t } from './Top.dict';

</script>

<section class="topLayout" id="HomeTop" lang="jp">
    <!-- モバイル用：テキストブロック -->
    <div class="texts-container">
      <div>
      <h2 class="hero__title bold">{@html t('heading', $lang)}</h2>
      <p class="h7 half"lang="en">Building futures together<br>with THALASSIC CAPITAL</p>
      <a href="/about"><Link /></a>
      </div>
    </div>
  
    
    <div class="image-container w100">
      <img class="" src="../../image/TC_top.webp" alt="" loading="eager" decoding="async" />
      <!-- PC時のみ有効化されるオーバーレイ -->
      <div class="hero__overlay" aria-hidden="true"></div>
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

#HomeTop .image-container img {
  height: 100%;
  object-position: top;
}









/* --------- PC：画像全面・左下にオーバーレイ＋テキスト重ね --------- */
@media (min-width: 960px){


  #HomeTop .texts-container{
    position: absolute;
    top: auto;
    bottom: 90px;
    left: 90px;
    z-index: 1;
    height: auto;
  }
  #HomeTop .texts-container * {color: white;fill:white;}


  #HomeTop .image-container {
    width: calc(100vw - 60px);
    height: calc(100vh - 65px - 60px);
    height: calc(100dvh - 65px - 60px);
    margin-left: 0;
    position: absolute;
    top: auto;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0%);
  }


  #HomeTop .image-container .hero__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, var(--overlay-from) 0%, var(--overlay-to) 55%);
    pointer-events: none;
  }

  


}

  </style>
  