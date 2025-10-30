<script>
	import Link from "../../components/Link.svelte"
</script>

<section class="" id="HomePhilosophy">

    <div class="wrapper">
        <div class="heading-header">
            <p class="h7 bold">ビジネスフィロソフィー</p>
            <h2 class="h1 uppercase serif" lang="en">Philosophy</h2> 
        </div>

        <p>サラシックキャピタルは、日本、中国、<br>
            オーストラリアを中心に、パートナー企業と<br>
            世界各地をつなぐ架け橋を築きます。
        </p>
        <h3 class="h2 bold">
            お客様とのひとつひとつの<br>
            出会いを大切にし、<br>
            常にお客様と共に。
        </h3>
        <a href="/about"><Link /></a>
    </div>

    <img src="../../image/TC_top@sp.png" alt="" class="pc pz" loading="eager" decoding="async" />

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