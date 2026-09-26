export const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Domain-warped fbm flowing upward; brightest along the bottom edge and the
// two sides, with a darker dip in the middle. Grain added per pixel.
export const FRAG = `
precision mediump float;
uniform vec2 res;
uniform float time;
uniform vec2 ptr;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 17.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / res;
  float aspect = res.x / res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = time;

  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, -t * 0.09)), fbm(p * 1.4 + vec2(5.2, 1.3) - vec2(0.0, t * 0.07)));
  float r = fbm(p * 1.8 + 2.4 * q + vec2(t * 0.03, -t * 0.22));

  // Height of the light: higher at the sides, lower in the centre.
  float side = smoothstep(0.08, 0.5, abs(uv.x - 0.5));
  float reach = 0.28 + 0.32 * side + 0.22 * (r - 0.5);
  float body = smoothstep(reach, 0.0, uv.y);
  float v = body * (0.5 + 1.25 * r * r + 0.3 * q.x);

  // Brighter flares where the warp folds.
  v += 0.6 * smoothstep(0.58, 0.88, r) * smoothstep(reach + 0.1, 0.0, uv.y);

  // Soft light following the pointer.
  vec2 d = vec2((uv.x - ptr.x) * aspect, uv.y - ptr.y);
  v += 0.22 * exp(-dot(d, d) * 9.0);

  v = clamp(v, 0.0, 1.35);
  vec3 bg = vec3(0.020, 0.027, 0.051);
  vec3 c1 = vec3(0.043, 0.122, 0.541);
  vec3 c2 = vec3(0.184, 0.388, 1.0);
  vec3 c3 = vec3(0.435, 0.847, 1.0);
  vec3 c4 = vec3(0.90, 0.98, 1.0);
  vec3 col = mix(bg, c1, smoothstep(0.0, 0.35, v));
  col = mix(col, c2, smoothstep(0.3, 0.7, v));
  col = mix(col, c3, smoothstep(0.65, 1.0, v));
  col = mix(col, c4, smoothstep(1.0, 1.35, v));

  col += (hash(gl_FragCoord.xy + fract(t) * 91.0) - 0.5) * 0.045;
  gl_FragColor = vec4(col, 1.0);
}
`;
