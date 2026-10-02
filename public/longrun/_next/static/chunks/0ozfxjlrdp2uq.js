(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,20853,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let a=`
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`,i=`
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
`;e.s(["default",0,function(){let e=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let t=e.current,r=t?.getContext("webgl",{antialias:!1,alpha:!1,powerPreference:"low-power"});if(!t||!r)return;let o=(e,t)=>{let a=r.createShader(e);return r.shaderSource(a,t),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)?a:null},c=o(r.VERTEX_SHADER,a),n=o(r.FRAGMENT_SHADER,i);if(!c||!n)return;let s=r.createProgram();if(r.attachShader(s,c),r.attachShader(s,n),r.linkProgram(s),!r.getProgramParameter(s,r.LINK_STATUS))return;r.useProgram(s);let l=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,l),r.bufferData(r.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),r.STATIC_DRAW);let v=r.getAttribLocation(s,"p");r.enableVertexAttribArray(v),r.vertexAttribPointer(v,2,r.FLOAT,!1,0,0);let m=r.getUniformLocation(s,"res"),h=r.getUniformLocation(s,"time"),f=r.getUniformLocation(s,"ptr"),d=()=>{t.width=Math.max(1,Math.round(.5*t.clientWidth)),t.height=Math.max(1,Math.round(.5*t.clientHeight)),r.viewport(0,0,t.width,t.height)};d(),window.addEventListener("resize",d);let p={x:.5,y:-1},u={x:.5,y:-1},g=e=>{p.x=e.clientX/window.innerWidth,p.y=1-e.clientY/window.innerHeight};window.addEventListener("pointermove",g,{passive:!0});let x=window.matchMedia("(prefers-reduced-motion: reduce)").matches,w=performance.now(),A=0,y=e=>{u.x+=(p.x-u.x)*.06,u.y+=(p.y-u.y)*.06,r.uniform2f(m,t.width,t.height),r.uniform1f(h,x?12:(e-w)/1e3),r.uniform2f(f,u.x,u.y),r.drawArrays(r.TRIANGLES,0,3),x||(A=requestAnimationFrame(y))},b=()=>{cancelAnimationFrame(A),document.hidden||x||(A=requestAnimationFrame(y))};return document.addEventListener("visibilitychange",b),A=requestAnimationFrame(y),t.dataset.ready="1",()=>{cancelAnimationFrame(A),window.removeEventListener("resize",d),window.removeEventListener("pointermove",g),document.removeEventListener("visibilitychange",b)}},[]),(0,t.jsxs)("div",{className:"glow","aria-hidden":!0,children:[(0,t.jsx)("span",{className:"g g-base"}),(0,t.jsx)("span",{className:"g g-left"}),(0,t.jsx)("span",{className:"g g-right"}),(0,t.jsx)("span",{className:"g g-dip"}),(0,t.jsx)("span",{className:"g g-flare-a"}),(0,t.jsx)("span",{className:"g g-flare-b"}),(0,t.jsx)("span",{className:"grain"}),(0,t.jsx)("canvas",{ref:e,className:"glow-canvas"})]})}],20853)}]);