<script>
	import Arrow from "../components/Arrow.svelte"

    export let className = "";

</script>

<div class={`underline ${className}`}>
    <span class="h5 serif" lang="en">Discover More</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="8.997" height="7.2" viewBox="0 0 8.997 7.2">
        <path id="パス_102" data-name="パス 102" d="M.272.013l8.5,3.249a.367.367,0,0,1,0,.677L.272,7.188c-.19.072-.349-.177-.231-.362l1.83-2.878a.651.651,0,0,0,0-.694L.04.375C-.077.19.082-.059.272.013" transform="translate(0 0)" fill="#212b41"/>
    </svg>
</div>


<style>
    .underline {margin-top: 15px;}
    .underline{
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    text-decoration: none;
    position: relative;
  }
  
  .underline::after{
    content: "";
    position: absolute;
    left: 0; right: 0; bottom: -2px;
    height: 1px;
    background: var(--link-underline);
    opacity: .6;
  }

    :global(.white) .underline * {
        color: white;
        fill: white;
    }
    :global(.white) .underline::after {background: white;}
</style>