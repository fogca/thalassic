<script lang="ts">
	import Link from "../../components/Link.svelte"

    import { lang } from '$lib/lang';
    import { t } from './Business.dict';
</script>


<section class="" id="HomeBusiness">

    <div class="heading-header">
        <p class="h7 bold">{@html t('subheading', $lang)}</p>
        <h2 class="h1 uppercase serif" lang="en">Business</h2> 
    </div>

    <div class="wrapper">

        <div class="container">
            <img class="pz" src="../../image/TC_business_international.webp" alt="" loading="eager" decoding="async" data-aspect="3/2" />
            <h3 class="h3 serif uppercase" lang="en">Real Estate</h3>
            <h4 class="h6">{@html t('business1', $lang)}</h4>
            <a href="/real-estate"><Link /></a>
        </div>

        <div class="container">
            <img class="pz" src="../../image/TC_business_international_1.webp" alt="" loading="eager" decoding="async" data-aspect="3/2" />
            <h3 class="h3 serif uppercase" lang="en">International</h3>
            <h4 class="h6">{@html t('business2', $lang)}</h4>
            <a href="/international"><Link /></a>
        </div>

        <div class="container">
            <img class="pz" src="../../image/TC_business_service.webp" alt="" loading="eager" decoding="async" data-aspect="3/2" />
            <h3 class="h3 serif uppercase" lang="en">Service</h3>
            <h4 class="h6">{@html t('business3', $lang)}</h4>
            <a href="/business"><Link /></a>
        </div>

    </div>
    <hr class="w100">

</section>



<style>
    .panel { height: 50vh; }
    .panzoom { position: relative; overflow: hidden; height: 40vh; }
    .panzoom img {
      width: 100%; height: 100%; object-fit: cover;
      transform: scale(1.15) translateY(-10%); /* 初期ズーム & 上からスタート */
      will-change: transform;
    }

#HomeBusiness {margin-top: 100px;}

#HomeBusiness .wrapper {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 60px;
}
#HomeBusiness .container {margin-bottom: 0;}
#HomeBusiness .container h3 {margin: 15px 0 5px;}

#HomeBusiness hr {
    margin-top: 100px;
    background-color: #ccc;
    height: .5px;
    border: none;
}


@media screen and (min-width:720px) {

    #HomeBusiness .wrapper {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 30px;
    }

    #HomeBusiness .wrapper img {height: 18vw;}

}

</style>