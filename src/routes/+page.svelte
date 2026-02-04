<script lang="ts">
import { onMount} from 'svelte';
import Link from "../components/Link.svelte"
import Top from "../components/home/Top.svelte"
import Business from "../components/home/Business.svelte"
import Texts from "../components/home/Texts.svelte"
import Hotel from "../components/snippet/Hotel.svelte"
import Recruit from "../components/home/Recruit.svelte"
import Wavy from "../components/Wavy.svelte"
//import Company from "../components/home/Company.svelte"

  import { t } from './top.dict';
  import { lang } from '$lib/utils/lang';

  
  
  
</script>

<main>

  <Top />
  <Business />
  <Texts />
  <section class="TopBusiness">

    <div class="l-Contents">
      <div class="heading">
        <h3 class="" lang="en">Our Hotels</h3>
        <h5>国内不動産事業</h5>
      </div>
      <div class="wrapper">
        <Hotel />
      </div>
    </div>

  </section>

  <section class="TopContact">
    <div class="wrapper">
      <h2 class="texts" lang="en">Let’s build what’s<br>next, together!</h2>
      <p>プロジェクトへの参画や事業提携、不動産活用のお悩みなど、<br>ぜひお気軽にご相談ください。</p>
      <a href="/contact" class="h2" lang="en" aria-label="Link">Contact Us</a>
    </div>
  </section>

</main>


<style>

.TopBusiness .l-Contents .heading {width: 50%;}
.TopBusiness .l-Contents .wrapper {width: 50%;}

.TopContact {margin: 300px 0 200px;}
.TopContact h2 {
  font-size: 100px;
  line-height: 1;
}
.TopContact p {margin: 20px 0 30px;}
.TopContact a {text-decoration: underline;}


</style>