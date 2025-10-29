precision highp float;

uniform float uTime;
uniform sampler2D uTexture;

uniform vec2  uMouse;       // 実マウス（0..1）
uniform vec2  uMouseIntro;  // イントロ用固定点（例: vec2(0.5, 0.0)）
uniform float uIntro;       // 0→1 で uMouseIntro → uMouse に遷移
uniform float uRadius;      // GUI: 効きの半径（0..1）
uniform float uStrength;    // GUI: 歪み強度（>=0）
uniform float uBulge;       // 0..1: 0で無効 / 1で最大（入場やhoverでアニメ）

varying vec2 vUv;

/** バルジ（ピンチアウト風のUV変形）
 *  - uRadius: 半径（小さいほど局所的）
 *  - uStrength: 強さ（大きいほど変形）
 *  - uBulge: 0→効果なし / 1→最大（アニメで0↔1）
 */
vec2 bulge(vec2 uv, vec2 center) {
  vec2 p = uv - center;                  // 中心基準に
  float dist = length(p) / max(uRadius, 1e-5);
  float distPow = pow(dist, 4.0);        // 中心から遠いほど弱く
  float strengthAmount = uStrength / (1.0 + distPow);
  float k = mix(1.0, strengthAmount, clamp(uBulge, 0.0, 1.0));
  p *= k;                                // スケールで押し広げる
  return p + center;
}

void main() {
  // イントロ→マウスへブレンド（デモ互換）
  vec2 center = mix(uMouseIntro, uMouse, clamp(uIntro, 0.0, 1.0));

  // UV変形
  vec2 uv = bulge(vUv, center);

  // テクスチャ描画（wrapはJS側でRepeat設定済み想定）
  vec4 tex = texture2D(uTexture, uv);

  // そのまま出力（色空間はThree側設定に依存）
  gl_FragColor = tex;

  // ※もし色が浅く/濃く見える場合は、以下のsRGB補正を使ってください
  // vec3 srgbToLinear(vec3 c){ return pow(c, vec3(2.2)); }
  // vec3 linearToSrgb(vec3 c){ return pow(c, vec3(1.0/2.2)); }
  // vec3 lin = srgbToLinear(tex.rgb);
  // gl_FragColor = vec4(linearToSrgb(lin), tex.a);
}