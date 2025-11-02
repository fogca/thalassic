<script lang="ts">
  import { onMount} from 'svelte';
  import Footer from "../../components/Footer.svelte"

</script>


<main>

<section class="About">

  <div class="wrapper">

    <div class="container">
      <h1 class="h1 serif uppercase" lang="en">About Us</h1>
      <div class="h6 half" lang="en">Building futures together</div>
      <p>
        THALASSIC CAPITALは、名古屋を拠点に不動産売買・賃貸管理・不動産仲介を手掛けるプロフェッショナルチームです。<br><br>
        私たちは「土地に根ざす」ことを価値の源泉とし、地域文化や感性を再発見することで、
        人と都市がともに未来へ進むための新しい不動産のかたちを探求しています。
        <br><br>
        不動産の枠を越え、宿泊事業や海外展開（主にオーストラリア）など、
        多様な分野で「場所の可能性」を開いていく。
        それがTHALASSIC CAPITALのビジネスの中核です。
      </p>
    </div>

    <div class="container">
      <h1 class="h1 serif uppercase" lang="en">Philosophy</h1>
      <div class="h6 half" lang="en">Building futures together</div>
      <p>
        THALASSIC CAPITALは、名古屋を拠点に不動産売買・賃貸管理・不動産仲介を手掛けるプロフェッショナルチームです。<br><br>
        私たちは「土地に根ざす」ことを価値の源泉とし、地域文化や感性を再発見することで、
        人と都市がともに未来へ進むための新しい不動産のかたちを探求しています。
      </p>
    </div>

    <div class="container" id="AboutCompany">
      <h1 class="h1 serif uppercase" lang="en">Company</h1>
      <div class="h6 half" lang="en">Building futures together</div>
      <p>
        住所<br>
        Level 4, 524 Hay st, Perth, WA 6000
        <br><br>
        TEL<br>
        +61 426285325
        <br><br>
        設立<br>
        2022年8月

      </p>
    </div>



  </div>

</section>

</main>



<style>

.About .wrapper {
  margin-top: 30vh;
  width: 85%;
}
.About .wrapper .container {margin-bottom: 12rem;}
.About .wrapper p {margin-top: 1.5rem;}


@media screen and (min-width:720px) {

  .About {}
  .About .wrapper {
  margin-top: 30vh;
  width: 65%;
  margin-left: auto;
  /*padding-left: calc(3 * var(--pcPadding));*/
}
}


</style>