
    <div class="gradation">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

  <style>



.gradation {
    width: 100vw;
    height: 100vh;
    position: relative;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    isolation: isolate;
}

.gradation div {
    position: absolute;
    border-radius: 50%;
    animation: gradient 4s infinite;
    isolation: isolate;
}

@keyframes gradient {
    70% {
        transform: scale(1.5) translate(80px);
    }
}

.gradation div:nth-child(1) {
    height: 90%;
    width: 80%;
    background-color: #ced1c8;
    background-color: #003ebb;
    left: -30%;
    top: -10%;
}

.gradation div:nth-child(2) {
    height: 80%;
    width: 60%;
    background-color: #8ac5db;
    background-color: #2a95ff;
    top: -10%;
    right: 0%;
    animation-delay: .8s;
}

.gradation div:nth-child(3) {
    height: 65%;
    width: 80%;
    background-color: #005fac;
    background-color: #0016a9;
    bottom: -15%;
    right: -20%;
    animation-delay: 0.3s;
}

.gradation div:nth-child(4) {
    height: 50%;
    width: 75%;
    background-color: #f1af9b;
    background-color: #a6f2ff;
    bottom: -10%;
    left: -50%;
    animation-delay: 1.2s;
}

.gradation::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    height: 100%;
    width: 100%;
    backdrop-filter: blur(120px);
    z-index: 1;
}





</style>