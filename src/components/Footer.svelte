<script>
    import Logo from "./Logo.svelte";
    import Links from "./pageLinks.svelte";
    import Link from "./Link.svelte";
</script>




<footer>

    <section class="navigation">
        <div class="container">
            <img src="../../image/THALASSIC_Career.webp" alt="">
            <div class="contents white">
                <p class="h6 bold center white">キャリア・採用に関して</p>
                <h2 class="white" lang="en">Recruitment</h2>
                <a href="/career" class=""><Link /></a>
            </div>
        </div>
        <div class="container">
            <div class="gradation">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="contents white">
                <p class="h6 bold center white">会社概要</p>
                <h2 class="white" lang="en">About Company</h2>
                <a href="/about" class=""><Link /></a>
            </div>
        </div>
    </section>

    

    <section class="footer">

    


    <div class="top">

        <ul>
            <li class="container">
                <a class="h2" lang="en" href="/about">About</a>
            </li>
            <li class="container">
                <a class="h2" lang="en" href="/real-estate">Real Estate</a>
            </li>
            <li class="container">
                <a class="h2" lang="en" href="/services">Services</a>
            </li>
            <li class="container">
                <a class="h2" lang="en" href="/recruit">Recruitment</a>
            </li>
            <li class="container">
                <a class="h2" lang="en" href="/contact">Contact</a>
            </li>

        </ul>

    </div>
    <div class="h7 half" lang="en">@Thalassic Capital, 2026</div>
    </section>

</footer>

<style>
    footer {
        background-color: white;
        position: relative;
    }


    footer .navigation {
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    footer .navigation .container {
        width: calc(50% - 2.5px);
        height: 100%;
        position: relative;
    }
    footer .navigation .container .contents {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;

    }
    footer .navigation .container img {height: 50vh; filter: brightness(.9);}
    .gradation {
    width: 100%;
    height: 50vh;
    position: relative;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    }
    .gradation div {
        position: absolute;
        border-radius: 50%;
        animation: gradient 4s infinite;
    }   




    footer .footer {

    }

    footer .footer li a {font-size: 1.4rem;}
    
    





@keyframes gradient {
    70% {
        transform: scale(1.5) translate(30px);
    }
}

.gradation div:nth-child(1) {
    height: 90%;
    width: 80%;
    background-color: #ced1c8;
    left: -29%;
    top: -10%;
}

.gradation div:nth-child(2) {
    height: 80%;
    width: 70%;
    background-color: #73bdda;
    top: -12%;
    right: -12%;
    animation-delay: .8s;
}

.gradation div:nth-child(3) {
    height: 65%;
    width: 80%;
    background-color: #0664a3;
    bottom: -15%;
    right: -20%;
    animation-delay: 0.3s;
}

.gradation div:nth-child(4) {
    height: 50%;
    width: 75%;
    background-color: #d3aea3;
    bottom: -10%;
    left: -18%;
    animation-delay: 1.2s;
}

.gradation::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    backdrop-filter: blur(80px);
}


    
    

    footer svg {
        width: 100%;
        height: auto;
        margin-bottom: 5px;
    }
</style>