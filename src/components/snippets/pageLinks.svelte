<script>

import { lang } from '$lib/utils/lang';
import { t } from '../layout/Header.dict';

</script>

<ul class="wrapper">
    <li class="container">
        <a href="/real-estate">
            <div class="h1" lang="en">Real Estate</div>
            {#if $lang !== 'en'}
                <span class="h4">{t('realestate', $lang)}</span>
            {/if}
        </a>
    </li>
    <li class="container">
        <a href="/hotel">
            <div class="h1" lang="en">Hotel</div>
            {#if $lang !== 'en'}
                <span class="h4">{t('hotel', $lang)}</span>
            {/if}
        </a>
    </li>
    <li class="container">
        <a href="/about">
            <div class="h1" lang="en">About Us</div>
            {#if $lang !== 'en'}
                <span class="h4">{t('about', $lang)}</span>
            {/if}
        </a>
    </li>
    <li class="container">
        <a href="/about#Recruitment">
            <div class="h1" lang="en">Recruitment</div>
            {#if $lang !== 'en'}
                <span class="h4">{t('recruit', $lang)}</span>
            {/if}
        </a>
    </li>

    <li class="container">
        <a href="/contact">
            <div class="h1" lang="en">Contact</div>
            {#if $lang !== 'en'}
                <span class="h4">{t('contact', $lang)}</span>
            {/if}
        </a>
    </li>
</ul>



<style>

    ul.wrapper li {margin-bottom: 20px;}

    ul li a div.h1 {
        font-size: 21.5px;
        margin-bottom: 5px;
    }

</style>