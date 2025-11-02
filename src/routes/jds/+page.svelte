


<main>


  


</main>



<style>


  

@charset "UTF-8";

:root {
    --padding: 7.5vw;/* W395px * .075 = 30px */
    --productPadding: 11.5vw;
    --pcPaddingLeft: 20px;
    --pcPaddingRight: 18.75vw;
    --backgroundColor: #fff;
    --textColor: #000;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {font-size: 62.5%;}
html, body {
    width: 100vw;
    background-color: var(--backgroundColor);
}


div, h1, h2, h3, h4, h5, h6, p, a, span, input, button, tspan, tr, td,th {
    font-family: NHaasGroteskDSPro-55Rg, FP-HiraKakuStdN-W4, sans-serif;
    font-weight: 400;
    color: var(--textColor);
    font-display: swap;
    font-feature-settings: "palt";
    letter-spacing: 0.05em;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
}


:lang(en){
    font-family: NHaasGroteskDSPro-65Md, sans-serif;
    letter-spacing: 0.01em;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
}

.bold {font-family: NHaasGroteskDSPro-65Md, FP-HiraKakuProN-W6, sans-serif;}

.h0 {font-size: 3.2rem;}
h1, .h1 {font-size: 2.4rem;}
h2, .h2 {font-size: 2.0rem;}
h3, .h3 {font-size: 1.6rem;}
h4, .h4 {font-size: 1.4rem;}
h5, .h5 {font-size: 1.25rem;}
h6, .h6 {font-size: 1.05rem;}
.h7 {font-size: .9rem;}

p, .p {
    line-height: 1.5;
    font-size: 1.25rem;
    text-align: left;
    word-wrap: break-word;
    hyphens: auto;
    word-break: break-all;
}

.sp {display: block;}
.pc {display: none;}

li {
    text-decoration: none;
    list-style: none;
}
a {
    text-decoration: none;
    display: inline-block;
    transition: .75s ease-in-out;
}

a:hover {opacity: .65;}

section {
    padding-left: var(--padding);
    padding-right: var(--padding);
}

img {
    width: 100%;
    object-fit: cover;
    object-position: 50%;
}

input {
    background-color: transparent;
    border: none;
    outline: none;
}
input::placeholder {
    color: var(--textColor);
    opacity: .25;
}
button {
    background-color: transparent;
    border: none;
    outline: none;
}

ul li {text-decoration: none;list-style: none;}
.flex {display: flex; justify-content: center; align-items: center;}

.w100 {
    width: 100vw;
    margin-left: calc(-1 * var(--padding));
}

.white {color: white;}
main {margin: auto;}
.uppercase {text-transform: uppercase;}
.link {
    text-transform: uppercase;
    position: relative;
}
.link::after {
    display: block;
    content: "";
    position: absolute;
    top: auto;
    bottom: -.25rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: .8px;
    background-color: var(--textColor);
}
.center {text-align: center;}
.half {opacity: .55;}



@media screen and (min-width: 720px) {
    
  html {font-size: 62.5%;}

    .h0 {font-size: 48px;}
h1, .h1 {font-size: 32px;}
h2, .h2 {font-size: 24px;}
h3, .h3 {font-size: 20px;}
h4, .h4 {font-size: 16.5px;}
h5, .h5 {font-size: 13.5px;}
h6, .h6 {font-size: 12px;}
.h7 {font-size: 10.5px;}

p, .p {
    font-size: 14px;
}

.sp {display: none;}
.pc {display: block;}


section {
    padding-left: var(--pcPaddingLeft);
    padding-right: var(--pcPaddingRight);
}


.w100 {
    width: 100vw;
    margin-left: calc(-1 * var(--pcPadding));
}
<script src="https://webfont.fontplus.jp/accessor/script/fontplus.js?kqbwQX--jVA%3D&box=A74rKhnBqgk%3D&aa=1&ab=2"></script>

</style>