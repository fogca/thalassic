<script lang="ts">
    
	import Link from "../../components/Link.svelte"

    import { lang } from '$lib/utils/lang';
    import { t } from './About.dict';
</script>

<section class="" id="HomeCompany">

    <div class="wrapper">
        <div class="heading-header">
            <p class="h7 bold">{@html t('subheading', $lang)}</p>
            <h2 class="h1 uppercase serif" lang="en">About Company</h2> 
        </div>

        <p>{@html t('paragraph', $lang)}</p>
        <h3 class="h2 bold">{@html t('heading', $lang)}</h3>

        <a href="/about"><Link /></a>
    </div>


</section>


<style>

#HomeCompany .heading-header {margin-bottom: 30px;}
#HomeCompany .wrapper h3 {margin: 25px 0 30px;}

#HomeCompany {
    padding: 120px 0 100px;
    padding-left: calc(2*var(--padding));
    background-color: #232a40;
}
#HomeCompany * {color: white;}


@media (min-width: 960px){

    #HomeCompany {
        padding-top: 180px;
        padding-bottom: 180px;
    }

}

</style>