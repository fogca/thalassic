<script>
    import Logo from "./Logo.svelte";
    import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
    import { page } from '$app/stores'; 
    import { browser } from '$app/environment';
    import Links from "./pageLinks.svelte";

    let y


    let open = false;
	const toggle = () => (open = !open);

</script>
    
<svelte:window bind:scrollY={y} />

    <header class:scrolled={y > 100}>
    
        <div class="left">
            <a href="/" class="logo"><Logo /></a>
            
        </div>

        

        <div class="right">

            <nav class="pc">
                <ul>
                    <li><a class="h5 serif uppercase" href="/real-estate">Real Estate</a></li>
                    <li><a class="h5 serif uppercase" href="/international">International</a></li>
                    <li><a class="h5 serif uppercase" href="/service">Service</a></li>
                    <li><a class="h5 serif uppercase" href="/about">About</a></li>
                    <li><a class="h5 serif uppercase" href="/recruit">Recruitment</a></li>
                    <li><a class="h5 serif uppercase" href="/">Contact</a></li>
                </ul>
            </nav>

            <img src="../image/header_career.png" alt="" class="" loading="eager" decoding="async" />
            
            <button class="menu-btn sp" on:click={toggle} aria-label="menu">
                <span class:open={open}></span>
                <span class:open={open}></span>
            </button>

        </div>
        
        
    
        <!-- オーバーレイメニュー -->
        <div class="overlay" class:open={open} on:click={toggle}>
            <nav class="menu" on:click|stopPropagation>
               <Links />
            </nav>
        </div>

        



    
    </header>


    
<style>
    
header {
    width: 100vw;
    height: 50px;
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
    width: auto;
    height: 45px;
    margin-right: 8px;   
}


header, header * {transition: all 1000ms cubic-bezier(0.19, 1, 0.22, 1);}


header .right {
    display: flex;
    align-items: center;
}
.menu-btn {
	position: relative;
	width: 25px;
	height: 8px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: none;
	background: none;
	cursor: pointer;
	z-index: 10;
    margin-right: -15px;
}
.menu-btn span {
	display: block;
	width: 100%;
	height: 1.5px;
	background: #000;
	border-radius: 2px;
	transition: all 0.3s ease;
}
.menu-btn span.open:first-child {
	transform: translateY(3.5px) rotate(30deg);
}
.menu-btn span.open:last-child {
	transform: translateY(-3.5px) rotate(-30deg);
}

/* --- overlay --- */
.overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0);
	opacity: 0;
	pointer-events: none;
	transition: all 0.3s ease;
    width: 100vw;
    height: calc(100vh - 50px);
    top: 50px;
}
.overlay.open {
	background: rgba(0, 0, 0, 0.6);
	opacity: 1;
	pointer-events: auto;
}

/* --- menu --- */
.menu {
	position: absolute;
	top: 0px;
	right: 0;
	width: 80vw;
	height: calc(100vh - 50px);
	background: white;
	display: flex;
	flex-direction: column;
	padding: 40px 45px;
	transform: translateX(100%);
	transition: transform 0.3s ease;
}
.overlay.open .menu {
	transform: translateX(0);
}
.menu a {
	text-decoration: none;
	color: #000;
	font-size: 1.2rem;
	margin-bottom: 1.2rem;
}





@media screen and (min-width: 720px) {

    
    header {
        height: 60px;
        padding: 2.5rem 50px 1.8rem;
    }

    header .right nav li {
        display: inline;
        margin: 0 .5rem;
    }

    header img {
        height: 55px;
        margin-right: -15px;
        margin-left: 15px;
    }
    header .logo {margin-left: 10px;}

    .menu-btn.sp {display: none;}


}
    
    
    
</style>