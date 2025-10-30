<script lang="ts">
    import { parallax } from '$lib/motion/parallax';
    import { reveal } from '$lib/motion/reveal';
	import Link from "../../components/Link.svelte"
</script>

<section class="" id="HomeCompany">

    <div class="wrapper">
        <div class="heading-header">
            <p class="h7 bold">会社概要</p>
            <h2 class="h1 uppercase serif" lang="en">About Company</h2> 
        </div>

        <p>サラシックキャピタルは、日本、中国、<br>
            オーストラリアを中心に、パートナー企業と<br>
            世界各地をつなぐ架け橋を築きます。
        </p>
        <h3 class="h2 bold">
            世界をつなぐ架け橋を<br>
            築く会社。
        </h3>
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