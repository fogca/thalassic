
    <div class="blob">
      <svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#003C8E;stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:#0066B3;stop-opacity:0.85" />
            <stop offset="100%" style="stop-color:#009FD9;stop-opacity:0.9" />
          </linearGradient>
        </defs>
        <path d="M 600,150 C 900,150 1050,300 1050,600 C 1050,900 900,1050 600,1050 C 300,1050 150,900 150,600 C 150,300 300,150 600,150 Z" />
      </svg>
    </div>
  
  
  <style>
  
    .blob {
        position: fixed;
      
      
    width: 100%;
    height: 100%;
    top: -5%;
    left: 0;
    }
  
    .blob svg {
      width: 100%;
      height: 100%;
    }
  
    .blob path {
      fill: url(#waveGradient);
      animation: morphWave 8s ease-in-out infinite;
    }
  
    .blob {
      animation: float 6s ease-in-out infinite;
    }
  
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-50px);
      }
    }
  
    @keyframes morphWave {
      0%, 100% {
        d: path("M 600,150 C 900,150 1050,300 1050,600 C 1050,900 900,1050 600,1050 C 300,1050 150,900 150,600 C 150,300 300,150 600,150 Z");
      }
      25% {
        d: path("M 600,240 C 840,180 990,360 1020,600 C 1050,840 930,1020 600,1050 C 270,1080 180,930 150,600 C 120,270 360,300 600,240 Z");
      }
      50% {
        d: path("M 600,180 C 930,210 1080,390 1050,660 C 1020,930 840,1080 600,1020 C 360,960 150,840 180,600 C 210,360 270,150 600,180 Z");
      }
      75% {
        d: path("M 540,210 C 810,240 1020,420 990,630 C 960,840 810,1020 570,1050 C 330,1080 180,900 210,630 C 240,360 270,180 540,210 Z");
      }
    }
  </style>