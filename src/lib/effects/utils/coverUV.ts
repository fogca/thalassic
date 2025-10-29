import * as THREE from 'three';

/**
 * 画像を「cover」相当に見せるための (repeat, offset) を返す
 * @param texture THREE.Texture（imageのwidth/heightが読める状態）
 * @param viewW   表示サイズ（ピクセル）…オルソでメッシュを画素合わせしているので canvasのCSSピクセルを渡す
 * @param viewH
 */
export function getCoverUV(texture: THREE.Texture, viewW: number, viewH: number) {
  const img = texture.image as HTMLImageElement | { width: number; height: number };
  const imgW = img?.width ?? 1;
  const imgH = img?.height ?? 1;

  const aspectView = viewW / viewH;
  const aspectImg = imgW / imgH;

  const repeat = new THREE.Vector2(1, 1);
  const offset = new THREE.Vector2(0, 0);

  if (aspectView / aspectImg > 1) {
    // 横長の表示 → 縦を切る
    repeat.set(1.0, aspectImg / aspectView);
  } else {
    // 縦長の表示 → 横を切る
    repeat.set(aspectView / aspectImg, 1.0);
  }

  offset.set((1 - repeat.x) / 2, (1 - repeat.y) / 2);

  return { repeat, offset };
}