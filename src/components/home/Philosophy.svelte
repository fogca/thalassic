<script lang="ts">
	import Link from "../../components/Link.svelte"

    import { lang } from '$lib/lang';
    import { t } from './Philosophy.dict';
</script>

<section class="" id="HomePhilosophy">

    <div class="wrapper">
        <div class="heading-header">
            <p class="h7 bold">{@html t('subheading', $lang)}</p>
            <h2 class="h1 uppercase serif" lang="en">Philosophy</h2> 
        </div>

        <p>{@html t('paragraph', $lang)}</p>
        <h3 class="h2 bold">{@html t('heading', $lang)}</h3>
        <a href="/about"><Link /></a>
    </div>

    <img src="../../image/TC_top@sp.webp" alt="" class="pc pz" loading="eager" decoding="async" />

</section>


<style>
#HomePhilosophy {
    padding: 80px var(--padding) 100px;
}

#HomePhilosophy .heading-header {margin-bottom: 30px;}
#HomePhilosophy .wrapper h3 {margin: 25px 0 30px;}




@media (min-width: 960px){

    #HomePhilosophy {
        width: 100%;
        padding: 180px calc(2 * var(--pcPadding)) 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #HomePhilosophy img {
        width: 40vw;
        height: 30vw;
    }

}

</style>