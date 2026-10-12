import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

// Fixed Constants
const bgColor         = '#02160c';
const flameColor      = '#0aff7f';
const flameColor2     = '#aef0c0';
const flameAmt        = 0.2;
const atmoColor       = '#7affbf';
const atmoCount       = 150; // Reduced from 300 for mobile
const atmoSize        = 24;
const atmoSpeed       = 1.0;
const colorLow        = '#02160c';
const colorHigh       = '#34e89a';
const opacity         = 0.26;
const pointSize       = 5.5;
const brightness      = 0.45;
const waveHeight      = 3;
const flow            = 1;
const tilt            = 0;
const scale           = 0.275;
const scrollRise      = 1.0;
const camStartY       = 7,  camStartZ = 16;
const camEndY         = 0.8, camEndZ  = -2;
const lookStartZ      = 2,  lookEndZ  = -16;
const parallax        = 1.2;
const pointerRadius   = 7.0;
const pointerStrength = 0.9;

const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 };

const Lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function hexToVec3(hex) {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const FinalPassShader = {
  uniforms: {
    iTime: { value: 0 },
    tDiffuse: { value: null },
    torusTexture: { value: null },
    bloomTexture: { value: null },
    haloTexture: { value: null },
    uBg: { value: hexToVec3(bgColor) },
    uFlameA: { value: hexToVec3(flameColor) },
    uFlameB: { value: hexToVec3(flameColor2) },
    uFlameAmt: { value: flameAmt }
  },
  vertexShader: `
    varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
  `,
  fragmentShader: `
    uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
    uniform vec3 uBg; uniform vec3 uFlameA; uniform vec3 uFlameB; uniform float uFlameAmt;
    varying vec2 vUv;
    vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
      pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
      pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
      pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
      return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
    void main(){
      vec2 uv = 2.*vUv - 1.;
      vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.5), vec3(1.5));
      vec3 flame = 1.5*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
      flame *= smoothstep(0.25, 1., abs(uv.y));
      float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
      vec3 bg = uBg * (1.0 - 0.4 * length(uv));
      vec3 halo = texture2D(haloTexture, vUv).xyz;
      gl_FragColor = vec4(bg + flame*uFlameAmt + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
    }
  `
};

export default function FlowWave() {
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = document.getElementById('scene');
    if (!canvas) return;

    // Detect low memory / constrained mobile device
    const isLowMemoryDevice = 
      (navigator.deviceMemory && navigator.deviceMemory <= 4) || 
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let animId;
    const pixelRatio = Math.min(window.devicePixelRatio, isLowMemoryDevice ? 1.5 : 2);

    const renderer = new THREE.WebGL1Renderer({ canvas, antialias: !isLowMemoryDevice });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false; // Disabled for performance

    const scene = new THREE.Scene();
    scene.background = new THREE.Object3D();
    scene.fog = new THREE.Fog(0x000000, 0, 15);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, camStartY, camStartZ);
    camera.layers.enable(LAYERS.TORUS_SCENE);
    camera.layers.enable(LAYERS.BLOOM_SCENE);
    camera.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(camera);

    const renderPass = new RenderPass(scene, camera);

    // Optimized Bloom settings (reduced resolution and intensity slightly)
    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(renderPass);
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    torusComposer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth * 0.75, window.innerHeight * 0.75), 0.18, 0.15, 0));
    torusComposer.addPass(new ShaderPass(CopyShader));

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderPass);
    bloomComposer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth * 0.75, window.innerHeight * 0.75), 0.3, 0.45, 0));
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    const finalComposer = new EffectComposer(renderer);
    finalComposer.renderToScreen = true;
    finalComposer.addPass(renderPass);
    const finalPass = new ShaderPass(FinalPassShader);
    finalComposer.addPass(finalPass);

    finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget1.texture;
    finalPass.uniforms.torusTexture.value = torusComposer.renderTarget1.texture;

    // 1. Reduced Geometry from (4.2, 200, 600) to (4.2, 100, 200)
    const geo = new THREE.SphereGeometry(4.2, 100, 200);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uStream: { value: 0 },
        uAppear: { value: 0 },
        uColLow: { value: hexToVec3(colorLow) },
        uColHigh: { value: hexToVec3(colorHigh) },
        uOpacity: { value: opacity },
        uSize: { value: pointSize },
        uBrightness: { value: brightness },
        uWaveHeight: { value: waveHeight },
        uFlow: { value: flow },
        uScale: { value: scale },
        uCursor: { value: new THREE.Vector3() },
        uRepelRadius: { value: pointerRadius },
        uRepelStrength: { value: pointerStrength },
        uActivity: { value: 0 }
      },
      vertexShader: `
        uniform float uTime; uniform float uStream; uniform float uSize; uniform float uWaveHeight; uniform float uFlow; uniform float uScale;
        uniform vec3 uColLow; uniform vec3 uColHigh;
        uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
        varying float vFade; varying vec3 vColor;
        ${SNOISE}
        void main() {
          vec3 wp = vec3(position.x * 13.0, 0.0, position.z * 25.0);
          wp.x += position.y * 6.0;
          float zc = wp.z + uStream;
          float wn = snoise(vec3(wp.x * 0.08, zc * 0.08, uTime * 0.15 * uFlow)) * 2.0;
          wn += snoise(vec3(wp.x * 0.16, zc * 0.16, uTime * 0.3 * uFlow)) * 0.8;
          wp.y += wn * uWaveHeight;

          vec3 finalPos = wp * uScale;
          vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
          vec3 toP = modelPosition.xyz - uCursor;
          float cd = length(toP);
          float fall = smoothstep(uRepelRadius, 0.0, cd);
          modelPosition.xyz += normalize(toP + vec3(0.0001)) * fall * uRepelStrength * uActivity;
          vec4 mvPosition = viewMatrix * modelPosition;

          float colMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
          vColor = mix(uColLow, uColHigh, clamp(colMix, 0.0, 1.0));
          vFade = 1.0;

          gl_PointSize = uSize * (10.0 / -mvPosition.z);
          gl_PointSize = max(gl_PointSize, 1.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uOpacity; uniform float uBrightness; uniform float uAppear;
        varying float vFade; varying vec3 vColor;
        void main() {
          vec2 xy = gl_PointCoord - 0.5;
          float ll = length(xy);
          if (ll > 0.5) discard;
          float a = smoothstep(0.5, 0.1, ll);
          gl_FragColor = vec4(vColor * uBrightness, vFade * a * uOpacity * uAppear);
        }
      `
    });

    const pointsObj = new THREE.Points(geo, mat);
    pointsObj.frustumCulled = false;
    pointsObj.layers.enable(LAYERS.ENTIRE_SCENE);

    const group = new THREE.Group();
    group.add(pointsObj);
    scene.add(group);

    // Ambient Motes
    const N = Math.round(atmoCount);
    const positions = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const seeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i * 3]     = 2 * Math.random() - 1;
      positions[i * 3 + 1] = 2 * Math.random() - 1;
      positions[i * 3 + 2] = 2 * Math.random() - 1;
      sizes[i] = atmoSize * (0.4 + Math.random());
      seeds[i] = Math.random();
    }
    const atmoGeo = new THREE.BufferGeometry();
    atmoGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    atmoGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    atmoGeo.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));

    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: hexToVec3(atmoColor) },
        uRes: { value: new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio) }
      },
      vertexShader: `
        attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
        varying float vA;
        vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
          p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
          p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
          return cos(p+vec3(1,2,4)); }
        void main(){
          vec3 v = position*4.0 + warp(position, uTime)*1.2;
          vec4 mv = modelViewMatrix * vec4(v, 1.0);
          float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
          vA = farF * nearF;
          gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor; varying float vA;
        void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
          float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.6); }
      `
    });

    const atmoPts = new THREE.Points(atmoGeo, atmoMat);
    atmoPts.frustumCulled = false;
    atmoPts.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(atmoPts);

    // Interaction State
    let scrollTarget = 0;
    let scrollSmooth = 0;
    let scrollCurrent = 0;
    const mouseTarget = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const POINTER = { world: new THREE.Vector3(), activity: 0, active: false, lastMove: performance.now() };
    const appearStart = performance.now();
    let streamAcc = 0;
    let lastTime = performance.now() / 1000;

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
      POINTER.active = true;
      POINTER.lastMove = performance.now();
    };
    const handleMouseOut = () => { POINTER.active = false; };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseOut);

    const _ndc = new THREE.Vector3(), _dir = new THREE.Vector3(), _tgt = new THREE.Vector3();
    function updatePointerWorld() {
      _tgt.set(0, 0, 0);
      if (POINTER.active) {
        _ndc.set(mouse.x, mouse.y, 0.5).unproject(camera);
        _dir.copy(_ndc).sub(camera.position).normalize();
        const dn = _dir.z;
        if (Math.abs(dn) > 1e-4) {
          const tt = -camera.position.z / dn;
          if (tt > 0 && Number.isFinite(tt)) _tgt.copy(camera.position).addScaledVector(_dir, tt);
        }
      }
      POINTER.world.lerp(_tgt, 0.12);
      const idle = (performance.now() - POINTER.lastMove) / 1000;
      POINTER.activity += (((POINTER.active && idle < 3) ? 1 : 0) - POINTER.activity) * 0.06;
    }

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      torusComposer.setPixelRatio(pixelRatio);
      torusComposer.setSize(w, h);
      bloomComposer.setPixelRatio(pixelRatio);
      bloomComposer.setSize(w, h);
      finalComposer.setPixelRatio(pixelRatio);
      finalComposer.setSize(w, h);
      atmoMat.uniforms.uRes.value.set(w * pixelRatio, h * pixelRatio);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation Loop (Gracefully halts if critical memory constraint is hit)
    const animate = () => {
      if (!isLowMemoryDevice) {
        animId = requestAnimationFrame(animate);
      }

      const t = performance.now() / 1000;
      const dt = Math.min(0.05, t - lastTime);
      lastTime = t;

      scrollSmooth = Lerp(scrollSmooth, scrollTarget, 0.10);
      scrollCurrent = Lerp(scrollCurrent, scrollSmooth, 0.06);
      mouse.x = Lerp(mouse.x, mouseTarget.x, 0.06);
      mouse.y = Lerp(mouse.y, mouseTarget.y, 0.06);

      mat.uniforms.uTime.value = t;
      streamAcc += dt * (flow * 2.0) * 4.0;
      mat.uniforms.uStream.value = streamAcc;
      mat.uniforms.uWaveHeight.value = waveHeight * (1 + scrollCurrent * scrollRise);

      const ea = Math.min(scrollCurrent / 0.35, 1.0);
      const e = ea * ea * (3 - 2 * ea);
      const camY = Lerp(camStartY, camEndY, e);
      const camZ = Lerp(camStartZ, camEndZ, e);
      camera.position.set(mouse.x * parallax, camY + mouse.y * parallax * 0.3, camZ);
      camera.lookAt(mouse.x * parallax * 0.5, Lerp(0.0, 0.6, e), Lerp(lookStartZ, lookEndZ, e));

      group.rotation.x = -tilt;
      group.rotation.y = 0;

      updatePointerWorld();
      mat.uniforms.uCursor.value.copy(POINTER.world);
      mat.uniforms.uActivity.value = POINTER.activity;

      const elapsed = (performance.now() - appearStart) / 1000;
      mat.uniforms.uAppear.value = Math.max(0, Math.min(1, (elapsed - 0.2) / 1.4));

      atmoMat.uniforms.uTime.value = t * atmoSpeed * 8.0;
      atmoPts.position.copy(camera.position);
      finalPass.uniforms.iTime.value = t;

      camera.layers.set(LAYERS.TORUS_SCENE);
      torusComposer.render();
      camera.layers.set(LAYERS.BLOOM_SCENE);
      bloomComposer.render();
      camera.layers.set(LAYERS.ENTIRE_SCENE);
      finalComposer.render();
    };

    if (!isLowMemoryDevice) {
      animId = requestAnimationFrame(animate);
    } else {
      // Render single static frame for low memory devices
      animate();
    }

    // Robust cleanup to prevent memory leaks
    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      geo.dispose();
      mat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      torusComposer.dispose();
      bloomComposer.dispose();
      finalComposer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="lk-stage" ref={containerRef}>
      <div id="scroll-host" style={{ height: '620vh' }} />
      <canvas id="scene" />

      <div className="uip-layer">
        <div className="fs-band">
          <header className="fs-head">
            <span className="fs-word">Data Ocean&#174;</span>

            <nav className="fs-nav">
              <a href="#ai">AI<br />Governance</a>
              <a href="#services">SAP<br />Services</a>
              <a href="#nfc">Digital<br />Products</a>
              <a href="#contact">Contact<br />Us</a>
            </nav>

            <div className="fs-contacts">
              <i className="fs-mark" aria-hidden="true" />
              <a href="#contact">Contacts</a>
            </div>
          </header>

          <h1 className="fs-h1">Navigate the Depths of SAP & Innovation&#174;</h1>

          <div className="fs-row">
            <p className="fs-lead">
              Elite SAP consulting, digital NFC solutions, and AI governance powered by 10+ years of enterprise expertise.
            </p>

            <div className="fs-actions">
              <a className="fs-btn fs-btn-solid" href="#services">Explore SAP Services</a>
              <a className="fs-btn fs-btn-ghost" href="#nfc">Shop NFC Cards</a>
            </div>
          </div>
        </div>

        <div className="fs-caps">
          <span>Enterprise SAP Consulting</span>
          <span>Smart NFC Business Cards</span>
          <span>Future AI Governance</span>
        </div>
      </div>

      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          border: 0 solid;
        }
        h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }
        p, h1, h2, h3, h4, h5, h6, figure, blockquote, dl, dd, pre, hr { margin: 0; }
        ul, ol, menu { margin: 0; padding: 0; list-style: none; }
        a { color: inherit; text-decoration: none; }

        :root {
          --font-onest: "Onest", system-ui, sans-serif;
          --band: #101010;
          --ink: #f2f2f2;
          --on-asset: #ffffff;
          --lk-asset: #000000;
          --pad-x: 30px;
          --band-h: 500px;
          --head-top: 30px;
          --cap-bottom: 30px;
          --word-top: 1px;
          --nav-off: 470px;
          --nav-col: 130px;
          --nav-gap: 60px;
          --contacts-w: 293px;
          --contacts-h: 48px;
          --mark: 18px;
          --mark-bw: 2px;
          --mark-top: 3px;
          --h1-top: 262px;
          --lead-top: 364px;
          --lead-w: 850px;
          --row-gap: 40px;
          --btn-w: 293px;
          --btn-h: 76px;
          --btn-gap: 20px;
          --fs-word: 24px;
          --fs-nav: 24px;
          --fs-h1: 72px;
          --fs-lead: 32px;
          --fs-btn: 24px;
          --fs-cap: 24px;
        }

        html, body {
          margin: 0;
          padding: 0;
          background: var(--lk-asset);
          min-height: 100svh;
          overflow-x: hidden;
          font-family: var(--font-onest);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        .lk-stage {
          position: relative;
          min-height: max(100svh, calc(var(--band-h) + 120px));
          overflow: hidden;
          background: var(--lk-asset);
        }

        #scene {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: block;
          z-index: 0;
        }

        .uip-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .fs-band {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: var(--band-h);
          background: var(--band);
          pointer-events: auto;
        }

        .fs-head {
          position: absolute;
          left: var(--pad-x);
          right: var(--pad-x);
          top: var(--head-top);
          display: flex;
          align-items: flex-start;
        }

        .fs-word {
          flex: none;
          width: var(--nav-off);
          margin-top: var(--word-top);
          font-size: var(--fs-word);
          font-weight: 500;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .fs-nav {
          flex: none;
          display: flex;
          gap: var(--nav-gap);
        }

        .fs-nav a {
          width: var(--nav-col);
          font-size: var(--fs-nav);
          font-weight: 500;
          line-height: 1;
          text-transform: uppercase;
        }

        .fs-contacts {
          flex: none;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: var(--contacts-w);
          height: var(--contacts-h);
          margin-left: auto;
          border-bottom: 1px solid var(--ink);
        }

        .fs-mark {
          flex: none;
          width: var(--mark);
          height: var(--mark);
          margin-top: var(--mark-top);
          border: var(--mark-bw) solid var(--ink);
          border-radius: 50%;
        }

        .fs-contacts a {
          font-size: var(--fs-nav);
          font-weight: 500;
          line-height: 1;
          text-align: right;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .fs-h1 {
          position: absolute;
          left: var(--pad-x);
          top: var(--h1-top);
          font-size: var(--fs-h1);
          font-weight: 500;
          line-height: 1;
          white-space: nowrap;
        }

        .fs-row {
          position: absolute;
          left: var(--pad-x);
          right: var(--pad-x);
          top: var(--lead-top);
          display: flex;
          align-items: flex-start;
          gap: var(--row-gap);
        }

        .fs-lead {
          flex: 0 1 var(--lead-w);
          min-width: 0;
          font-size: var(--fs-lead);
          font-weight: 400;
          line-height: 1.2;
        }

        .fs-actions {
          flex: none;
          margin-left: auto;
          display: flex;
          gap: var(--btn-gap);
        }

        .fs-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--btn-w);
          height: var(--btn-h);
          font-size: var(--fs-btn);
          font-weight: 500;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .fs-btn-solid {
          background: var(--ink);
          color: var(--band);
        }

        .fs-btn-ghost {
          border: 1px solid var(--ink);
          color: var(--ink);
        }

        .fs-caps {
          position: absolute;
          left: var(--pad-x);
          right: var(--pad-x);
          bottom: var(--cap-bottom);
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--on-asset);
          font-size: var(--fs-cap);
          font-weight: 500;
          line-height: 1;
          text-transform: uppercase;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
