<script lang="ts">
import { onMount} from 'svelte';
import Link from "../components/snippets/Link.svelte"
import Top from "../components/layout/Top.svelte"
import New from "../components/layout/New.svelte"
import Hotel from "../components/snippets/Hotel.svelte"

  import { t } from './top.dict';
  import { lang } from '$lib/utils/lang';

  
  
  
</script>

<main>

  <New />
  <Top />
  <section class="TopBusiness">
    <div class="l-Contents">
      <div class="heading">
        <h3 class="h1" lang="en">Our Hotels</h3>
        <h5>国内不動産事業</h5>
      </div>
      <div class="wrapper">
        <Hotel />
      </div>
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