<script lang="ts">
import Link from "../components/snippets/Link.svelte"
import Top from "../components/layout/Top.svelte"
import New from "../components/layout/New.svelte"
import Hotel from "../components/snippets/Hotel.svelte"
import Orbit from "../components/snippets/Orbit.svelte"
  import { t } from './top.dict';
  import { t as tNumber } from './topNumber.dict';
  import { lang } from '$lib/utils/lang';
</script>

<svelte:head>
  <title>Thalassic Capital</title>
  <meta name="description" content="Thalassic Capital is a real estate and hospitality group based in Japan and Australia, transforming potential into long-term value." />
  <meta property="og:title" content="Thalassic Capital" />
  <meta property="og:description" content="Thalassic Capital is a real estate and hospitality group based in Japan and Australia, transforming potential into long-term value." />
  <meta property="og:url" content="https://thalassiccapital.com" />
</svelte:head>

<main>

  <New />
  <Top />

  <section class="TopNumber my-80">
    <div class="wrapper">
      <div class="container" data-animate="fade-up">
        <p class="body">{tNumber('item1Body', $lang)}</p>
        <span class="title sans" lang="en">120+</span>
      </div>
      <div class="container" data-animate="fade-up">
        <p class="body">{tNumber('item2Body', $lang)}</p>
        <span class="title sans" lang="en">48%</span>
      </div>
      <div class="container" data-animate="fade-up">
        <p class="body">{tNumber('item3Body', $lang)}</p>
        <span class="title sans" lang="en">¥1.3B+</span>
      </div>
    </div>
  </section>

  <section class="TopBusiness mt-120">
    <div class="l-Contents">
      <div class="heading" data-animate="fade-up">
        <h3 class="h1 mb-10" lang="en">Our Hotels</h3>
        <h5 class="h5 sans">{t('ourHotels', $lang)}</h5>
      </div>
      <div class="wrapper" data-animate="fade-up">
        <Hotel />
      </div>
    </div>
  </section>





</main>


<style>






.TopBusiness .l-Contents .heading {width: 50%;}
.TopBusiness .l-Contents .wrapper {width: 50%;}


.TopNumber .wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.TopNumber .container {
  min-height: 250px;
  padding: 30px 25px;
  background-color: #F6F6F6;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.TopNumber .title {
  font-size: 72px;
  line-height: 1;
  letter-spacing: -0.001em;
}
.TopNumber .body {
  font-family: var(--text-font);
  font-size: var(--p-font-size);
  line-height: 1.7;
  color: var(--textColor);
  margin: 0;
}
@media screen and (min-width: 720px) {
  .TopNumber .wrapper {
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
  .TopNumber .container {
    flex: 1;
    min-width: 0;
  }
}




@media screen and (max-width: 834px) {

  .TopNumber .wrapper {gap: 15px;}
  .TopNumber .container {
      min-height: 160px;
      padding: 20px 25px 10px;
  }

  .TopBusiness .l-Contents {margin-bottom: 0;}
  .TopBusiness .l-Contents .heading {
    width: 100%;
    text-align: center;
  }
  .TopBusiness .l-Contents .heading h3 {font-size: 28px;}


}




</style>