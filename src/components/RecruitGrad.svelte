<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

// 親要素を外から渡す
export let parent: HTMLElement | null = null;

let height = 0;
let ro: ResizeObserver | null = null;

function measure() {
  if (!parent) return;
  const h = parent.offsetHeight;
  console.log('measure parent height:', h);
  if (h > 0) {
    height = h;
  }
}

onMount(() => {
  if (!parent) return;

  // ① 一拍おいてから測る（0px問題対策）
  requestAnimationFrame(() => {
    measure();

    // ② その後は高さ変化を監視して追従
    ro = new ResizeObserver(() => measure());
    ro.observe(parent);
  });
});

onDestroy(() => {
  ro?.disconnect();
});
</script>

<div class="recruitGrad">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>

<style>

.recruitGrad {
    position: relative;
    margin: auto;
    width: 200px;
    height: 100px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
}

.recruitGrad div {
    position: absolute;
    border-radius: 50%;
    animation: gradient 4s infinite;
}

@keyframes gradient {
    70% {
        transform: scale(1.5) translate(30px);
    }
}

.recruitGrad div:nth-child(1) {
    height: 90%;
    width: 80%;
    background-color: #ced1c8;
    left: -29%;
    top: -10%;
}

.recruitGrad div:nth-child(2) {
    height: 80%;
    width: 70%;
    background-color: #73bdda;
    top: -12%;
    right: -12%;
    animation-delay: .8s;
}

.recruitGrad div:nth-child(3) {
    height: 65%;
    width: 80%;
    background-color: #0664a3;
    bottom: -15%;
    right: -20%;
    animation-delay: 0.3s;
}

.recruitGrad div:nth-child(4) {
    height: 50%;
    width: 75%;
    background-color: #d3aea3;
    bottom: -10%;
    left: -18%;
    animation-delay: 1.2s;
}

.recruitGrad::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    backdrop-filter: blur(80px);
}
</style>