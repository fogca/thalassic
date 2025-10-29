<script lang="ts">
  import * as THREE from 'three';
  import { gsap } from 'gsap';
  import vert from '$lib/effects/shaders/vertex.glsl?raw';
  import frag from '$lib/effects/shaders/fragment.glsl?raw';

  import { onMount, onDestroy } from 'svelte';
  import { isTouch } from '$lib/effects/utils/isTouch';
  import { getCoverUV } from '$lib/effects/utils/coverUV';
  import getIO from '$lib/effects/managers/IntersectionObserver';
  import getTicker from '$lib/effects/managers/Ticker';
  import LM from '$lib/effects/managers/LoaderManager';

  /** 親から（demo互換） */
  export let src: string | undefined;
  export let index = 0;
  export let guiObj: { radius: number; strength: number; bulge?: number } = {
    radius: 0.95,
    strength: 1.1,
    bulge: 0
  };

  let canvas: HTMLCanvasElement;

  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.OrthographicCamera;
  let mesh: THREE.Mesh;
  let material: THREE.ShaderMaterial;

  let ro: ResizeObserver | undefined;
  let roPending = false;

  const ticker = getTicker();
  let touch = false;
  let visible = false;
  let canMove = true;
  let elRect: DOMRect;

  // マウス（lerp用に raw/target）
  const mouse = new THREE.Vector2(0, 0);
  const mouseTarget = new THREE.Vector2(0, 0);

  // === uniforms（demo命名）===
  const uniforms: Record<string, any> = {
    uTime:               { value: 0 },
    uTexture:            { value: null },
    uTextureResolution:  { value: new THREE.Vector2(1, 1) },
    uResolution:         { value: new THREE.Vector2(1, 1) },
    uMouse:              { value: new THREE.Vector2(0, 0) },
    uMouseIntro:         { value: new THREE.Vector2(0.5, 0.0) },
    uIntro:              { value: 0 },
    uBulge:              { value: 0 },
    uRadius:             { value: guiObj.radius ?? 0.95 },
    uStrength:           { value: guiObj.strength ?? 1.1 }
  };

  // GUI → uniforms（ポーリング無し・リアクティブ反映）
  $: uniforms.uRadius.value   = guiObj.radius ?? uniforms.uRadius.value;
  $: uniforms.uStrength.value = guiObj.strength ?? uniforms.uStrength.value;

  function setSize() {
    if (!renderer || !camera || !mesh) return;
    const w = canvas.parentElement?.clientWidth ?? canvas.clientWidth;
    const h = canvas.parentElement?.clientHeight ?? canvas.clientHeight;

    renderer.setSize(w, h, false);
    camera.left = -w / 2;
    camera.right =  w / 2;
    camera.top =  h / 2;
    camera.bottom = -h / 2;
    camera.updateProjectionMatrix();

    mesh.scale.set(w, h, 1);
    uniforms.uResolution.value.set(w, h);

    elRect = canvas.getBoundingClientRect();
    applyCoverUV();
  }

  function applyCoverUV() {
    const tex = uniforms.uTexture.value as THREE.Texture | null;
    if (!tex) return;
    const w = canvas.parentElement?.clientWidth ?? canvas.clientWidth;
    const h = canvas.parentElement?.clientHeight ?? canvas.clientHeight;
    const { repeat, offset } = getCoverUV(tex, w, h);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.copy(repeat);
    tex.offset.copy(offset);
    tex.needsUpdate = true;
  }

  function toUV(e: MouseEvent | PointerEvent | TouchEvent) {
    const rect = elRect ?? canvas.getBoundingClientRect();
    let cx: number, cy: number;
    if (touch && e instanceof TouchEvent) {
      const t = e.touches[0] ?? e.changedTouches[0];
      cx = t.pageX; cy = t.pageY;
    } else {
      const pe = e as PointerEvent | MouseEvent;
      cx = pe.clientX; cy = pe.clientY;
    }
    const x = (cx - rect.left) / rect.width;
    const y = 1.0 - (cy - rect.top) / rect.height;
    mouse.set(THREE.MathUtils.clamp(x, 0, 1), THREE.MathUtils.clamp(y, 0, 1));
  }

  onMount(async () => {
    touch = isTouch();

    // renderer / scene / camera
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000);
    camera.position.z = 10;

    // texture（LoaderManager）
    if (src) {
      await LM.load([{ name: `image_${index}`, texture: src }], renderer);
      const tex = LM.get(`image_${index}`);
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        tex.generateMipmaps = true;
        uniforms.uTexture.value = tex;

        const img: any = tex.image;
        if (img?.width && img?.height) {
          uniforms.uTextureResolution.value.set(img.width, img.height);
        }
      }
    }

    // material / mesh
    material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms,
      transparent: true,
      toneMapped: false
    });

    const geo = new THREE.PlaneGeometry(1, 1);
    mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);

    // ResizeObserver（デバウンス）
    ro = new ResizeObserver(() => {
      if (roPending) return;
      roPending = true;
      requestAnimationFrame(() => {
        roPending = false;
        setSize();
      });
    });
    ro.observe(canvas);
    setSize();

    // Tickerへ登録（RAF 1本化）
    const render = (elapsed: number) => {
      // 画面内 or アニメ中だけ動かす
      if (visible || uniforms.uBulge.value > 0.001 || uniforms.uIntro.value > 0.001) {
        mouseTarget.x += (mouse.x - mouseTarget.x) * 0.1;
        mouseTarget.y += (mouse.y - mouseTarget.y) * 0.1;
        uniforms.uMouse.value.copy(mouseTarget);
        uniforms.uTime.value = elapsed * 0.001;
        renderer.render(scene, camera);
      }
    };
    ticker.add(render);

    // IntersectionObserver（遅延シングルトン・重複observe防止）
    const IO = getIO();
    const id = `card-${index}`;
    IO.unobserve(id);
    IO.observe(
      id,
      canvas,
      // show
      () => {
        visible = true;
        canvas.parentElement?.parentElement?.classList.add('is-visible');

        // uBulge: 1 → 0
        gsap.fromTo(
          uniforms.uBulge,
          { value: 1 },
          { value: 0, duration: 1.8, ease: 'power3.out' }
        );

        // uIntro: 0 → 1
        gsap.to(uniforms.uIntro, { value: 1, duration: 5, ease: 'none' });
      },
      // hide
      () => {
        visible = false;
        canvas.parentElement?.parentElement?.classList.remove('is-visible');

        gsap.to(uniforms.uBulge, { value: 1, duration: 1.8, ease: 'power3.out' });
        gsap.to(uniforms.uIntro, { value: 0, duration: 1, ease: 'none' });
      }
    );

    // hover（タッチは無効）
    const onPointerMove = (e: MouseEvent | PointerEvent) => {
      if (!canMove || !visible) return;
      toUV(e);
    };
    const onPointerEnter = (e: MouseEvent | PointerEvent) => {
      if (!canMove) return;
      gsap.to(uniforms.uIntro, { value: 1, duration: 5, ease: 'expo.out' });
      gsap.to(uniforms.uBulge, { value: 1, duration: 1, ease: 'expo.out' });
      toUV(e);
    };
    const onPointerLeave = () => {
      if (!canMove) return;
      gsap.to(uniforms.uBulge, { value: 0, duration: 1, ease: 'expo.out' });
    };

    if (!touch) {
      canvas.addEventListener('pointermove', onPointerMove, { passive: true });
      canvas.addEventListener('pointerenter', onPointerEnter, { passive: true });
      canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    return () => {
    ticker.remove(render);
    ro?.disconnect();
    IO.unobserve(id);
    if (!touch) {
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    }
    scene.remove(mesh);
    mesh.geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
});
</script>

<div class="card">
  <canvas bind:this={canvas} class="card-canvas"></canvas>
</div>

<style>
  .card { width: 100%; aspect-ratio: 16/9; }
  .card-canvas { width: 100%; height: 100%; display: block; }
</style>