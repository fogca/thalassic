<script lang="ts">
    import Button from './Button.svelte';
  
    const hotels = [
      {
        name: 'Hotel Name 1',
        description: 'ホテルの簡単紹介1',
        image: '/image/TC_services_acc1.webp',
        link: '/hotel/1'
      },
      {
        name: 'Hotel Name 2',
        description: 'ホテルの簡単紹介2',
        image: '/image/TC_services_acc1.webp',
        link: '/hotel/2'
      },
      {
        name: 'Hotel Name 3',
        description: 'ホテルの簡単紹介3',
        image: '/image/TC_services_acc1.webp',
        link: '/hotel/3'
      },
      {
        name: 'Hotel Name 4',
        description: 'ホテルの簡単紹介4',
        image: '/image/TC_services_acc1.webp',
        link: '/hotel/4'
      }
    ];
  </script>
  
  <div class="Hotel">
    {#each hotels as hotel}
      <a href={hotel.link} class="container" aria-label={hotel.name}>
        <img src={hotel.image} alt={hotel.name} />
        <div class="contents">
          <div class="">
            <h3 class="h3 white center" lang="en">{hotel.name}</h3>
            <p class="white center">{hotel.description}</p>
          </div>
          <Button />
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
        border-radius: 3px;
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

  </style>