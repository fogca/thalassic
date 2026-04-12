<script lang="ts">
    import Button from './Button.svelte';
  
    const hotels = [
      {
        name: 'Nagoya Kamejima',
        description: 'ホテルの簡単紹介1',
        image: '/images/hotel-accommodation_01.webp',
        link: 'https://www.airbnb.jp/rooms/1354754710759878224'
      },
      {
        name: 'Nagoya Castle I',
        description: 'ホテルの簡単紹介2',
        image: '/images/hotel-accommodation_02.webp',
        link: 'https://www.airbnb.jp/rooms/18603174?viralityEntryPoint=1&s=76'
      },
      {
        name: 'Nagoya Castle II',
        description: 'ホテルの簡単紹介3',
        image: '/images/hotel-accommodation_04.webp',
        link: 'https://www.airbnb.jp/rooms/50121066?viralityEntryPoint=1&s=76'
      },
      {
        name: 'Coming Soon',
        description: '',
        image: '/images/hotel-coming.webp',
        link: ''
      }
    ];
  </script>
  
  <div class="Hotel">
    {#each hotels as hotel}
      <a href={hotel.link} class="container" aria-label={hotel.name} target="_blank">
        <img src={hotel.image} alt={hotel.name} />
        <div class="contents">
          <div class="">
            <h3 class="h3 white center" lang="en">{hotel.name}</h3>
            <p class="white center" style="opacity: 0;">{hotel.description}</p>
          </div>
          {#if (hotel.link)}
            <Button />
          {/if}
        </div>
      </a>
    {/each}
  </div>

  <style>

    .Hotel {
      width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 15px;
        height: 22.5vw;
    }

    .Hotel a.container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .Hotel a.container img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 10px;
    }
    .Hotel .contents {
        width: 100%;
        height: 100%;
        padding: 30px 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }


    @media screen and (max-width: 834px) {


      .Hotel {
        width: 100vw;
        margin-left: calc(-1 * var(--padding));
        grid-template-columns: 1fr;
        gap: 1px;
        height: 200vw;
      }

      
      .Hotel a.container::after{
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
      }

      .Hotel a.container .contents {
        flex-direction: row;
        padding: 0 var(--padding);
        position: relative;
        z-index: 1;
      }
      .Hotel a.container .contents p {display: none;}
      .Hotel a.container img {border-radius: 0;}



    }

  </style>