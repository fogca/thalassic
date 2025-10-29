<script>
    import Logo from "./Logo.svelte";
    import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
    import { page } from '$app/stores'; 
    import { browser } from '$app/environment';

    let y


    let clicked = false;
	let isExpanded = false
	function clickHandler() {
		isExpanded = !isExpanded  
    }
    $: $page.url && (isExpanded = false)



</script>
    
<svelte:window bind:scrollY={y} />

    <header class:scrolled={y > 100}>
    
        <div class="left">
            <a href="/" class="logo"><Logo /></a>
            
        </div>

        <img src="../image/header_career.png" alt="" class="" loading="eager" decoding="async" />

        <div class="right pc">
            
            
            <div
            class="h3 bold menu"
            class:clicked={clicked} 
            lang="en"
            on:click="{() => clicked = !clicked}"
            on:click|preventDefault={clickHandler}
            ></div>
            <a href="/works" class="h3 bold" lang="en">Work</a>
        </div>
        




        <!--
        <div class="right">
            <div
            class="h6"
            class:clicked={clicked} 
            on:click="{() => clicked = !clicked}"
            on:click|preventDefault={clickHandler}
            >メニュー</div>
        </div>
        -->
    
    </header>

    {#if isExpanded}
    <div class:clicked={clicked} class="MenuWrapper">
    <Menu />
    </div>
    {/if}
    
    
<style>
    
header {
    width: 100vw;
    height: 4.8rem;
    padding: .5rem var(--padding) 0;
    position: fixed;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    background-color: var(--backgroundColor);
    border-bottom: .5px solid rgba(0,0,0,0.1);
}


header .left {
    display: flex;
    white-space: nowrap;
    width: auto;
    opacity: 1;
}

header img {
    width: 100px;
    margin-right: -10px;   
}




header .left .menu::after {
    width: 4rem;
    display: block;
    content: "Menu";
}
header .left .menu.clicked::after {content: "Close";}

header .center, header .logo {line-height: 1;}

header, header * {transition: all 1000ms cubic-bezier(0.19, 1, 0.22, 1);}


/*
.MenuWrapper {
    height: 85vh;
    transform: translateY(85vh);
}
.MenuWrapper.clicked {transform: translateY(85vh);}

*/







@media screen and (min-width: 720px) {

    
    header {
        padding: 2.5rem var(--pcPadding) 1.8rem;
    }


}
    
    
    
</style>