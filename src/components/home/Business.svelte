<script lang="ts">
    const cards = [
      {
        image: '/image/TC_services_acc1.webp',
        category: '宿泊事業',
        title: 'HOTEL',
        link: '/hotel'
      },
      {
        image: '/image/Illust/Career01.webp',
        category: '採用情報',
        title: 'RECRUITMENT',
        link: '/about#Recruitment'
      },
      {
        image: '/image/THALASSIC_Global_01.webp',
        category: '会社情報',
        title: 'ABOUT US',
        link: '/about'
      },
      {
        image: '/image/TC_business_international.webp',
        category: '不動産事業',
        title: 'REAL ESTATE',
        link: '/real-estate'
      }
    ];
  </script>
  <section class="Business">
    <div class="wrapper">
      <a class="container" href={cards[0].link}>
        <img src={cards[0].image} alt={cards[0].title} />
        <div class="overlay"></div>
        <div class="texts">
          <h6 class="white">{cards[0].category}</h6>
          <h2 class="h2 uppercase white" lang="en">{cards[0].title}</h2>
          <div class="button" lang="en">READ MORE</div>
        </div>
      </a>
  
      <a class="container" href={cards[1].link}>
        <img src={cards[1].image} alt={cards[1].title} />
        <div class="overlay"></div>
        <div class="texts">
          <h6 class="white">{cards[1].category}</h6>
          <h2 class="h2 uppercase white" lang="en">{cards[1].title}</h2>
          <div class="button" lang="en">READ MORE</div>
        </div>
      </a>
  
      <a class="container" href={cards[2].link}>
        <img src={cards[2].image} alt={cards[2].title} />
        <div class="overlay"></div>
        <div class="texts">
          <h6 class="white">{cards[2].category}</h6>
          <h2 class="h2 uppercase white" lang="en">{cards[2].title}</h2>
          <div class="button" lang="en">READ MORE</div>
        </div>
      </a>
  
      <a class="container" href={cards[3].link}>
        <img src={cards[3].image} alt={cards[3].title} />
        <div class="overlay"></div>
        <div class="texts">
          <h6 class="white">{cards[3].category}</h6>
          <h2 class="h2 uppercase white" lang="en">{cards[3].title}</h2>
          <div class="button" lang="en">READ MORE</div>
        </div>
      </a>
    </div>
  </section>
  
  <style lang="scss">
    .Business .wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 5px;
      width: 100%;
      height: 70vh;
    }
  
    .Business .container:nth-of-type(1) {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }
  
    .Business .container:nth-of-type(2) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
  
    .Business .container:nth-of-type(3) {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }
  
    
    .Business .container:nth-of-type(4) {
      grid-column: 3 / 5;
      grid-row: 1 / 3;
    }
  
    .Business .container {
      position: relative;
      overflow: hidden;
      display: block;
      text-decoration: none;
    }
  
    .Business .container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  
    .Business .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
      pointer-events: none;
    }
  
    .Business .texts {
      position: absolute;
      bottom: 50px;
      left: 30px;
      z-index: 2;
      color: #ffffff;
    }
  
    .Business .texts h6 {
      margin-bottom: 12px;
      opacity: 0.9;
    }
  
    .Business .texts h2 {
      margin-bottom: 24px;
    }
  
    .Business .button {
      display: inline-block;
      padding: 12px 32px;
      background: #ffffff;
      color: #000000;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.1em;
      border-radius: 24px;
    }
  
    
    @media screen and (max-width: 834px) {
      .Business .wrapper {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 1fr);
        height: auto;
        min-height: 100vh;
      }
  
      .Business .container:nth-of-type(1),
      .Business .container:nth-of-type(2),
      .Business .container:nth-of-type(3),
      .Business .container:nth-of-type(4) {
        grid-column: 1 / 2;
        grid-row: auto;
      }
  
      .Business .texts {
        bottom: 40px;
        left: 40px;
      }
  
      .Business .texts h6 {
        font-size: 12px;
        margin-bottom: 8px;
      }
  
      .Business .texts h2 {
        font-size: 32px;
        margin-bottom: 16px;
      }
  
      .Business .button {
        padding: 10px 24px;
        font-size: 11px;
      }
    }
  </style>
  