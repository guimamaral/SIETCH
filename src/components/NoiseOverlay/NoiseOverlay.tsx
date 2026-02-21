'use client';

import { useEffect, useRef } from 'react';
import styles from './NoiseOverlay.module.css';

// ── Tuning knobs ──────────────────────────────────────────────────────────────
//
// BASE_LEVEL       Center of the noise distribution, normalized 0–1.
//                  0.5 = mid-gray (too white on dark backgrounds).
//                  0.30–0.40 = darker baseline; speckles read as dim gray.
//                  → To make it darker: lower this value.
//
// AMPLITUDE        Brightness swing around BASE_LEVEL (normalized, 0–1).
//                  Smaller = more uniform / less flicker. 0.12–0.20 is subtle.
//                  → To reduce intensity: lower this value.
//
// HIGHLIGHT_CLAMP  Hard cap on per-pixel brightness (normalized 0–1).
//                  Prevents near-white speckles regardless of distribution.
//                  0.55 means no pixel exceeds ~140/255 before gamma.
//                  → To reduce whites: lower this value.
//
// GAMMA            Power-curve exponent applied after clamping. > 1 pushes
//                  the distribution toward darker values by compressing
//                  the top end (e.g. 1.5 turns 0.55 → 0.40 effective).
//                  → To reduce whites more aggressively: raise this value.
//
// OPACITY          Layer-level CSS transparency (0.0–1.0).
//                  Prefer tuning brightness first; use this for final trim.
//                  → To reduce overall visibility: lower this value.
//
// FPS              Animation framerate. 18–24 = smooth; 8–12 = choppy/CRT.
//
// ─────────────────────────────────────────────────────────────────────────────
const BASE_LEVEL      = 0.35;  // darker baseline — bias away from white
const AMPLITUDE       = 0.15;  // low swing; keeps speckles close to BASE_LEVEL
const HIGHLIGHT_CLAMP = 0.55;  // hard cap — no pixel exceeds ~140/255 pre-gamma
const GAMMA           = 1.6;   // compresses highlights; effective max ~0.38
const OPACITY         = 0.05;
const FPS             = 20;
const GRAIN_SIZE      = 2;     // 2 = half-res canvas; 4× fewer pixel ops

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId: number;
    let lastTime = 0;
    const interval = 1000 / FPS;

    function resize() {
      canvas!.width  = Math.ceil(window.innerWidth  / GRAIN_SIZE);
      canvas!.height = Math.ceil(window.innerHeight / GRAIN_SIZE);
    }

    function drawNoise(timestamp = 0) {
      if (!reducedMotion) {
        animationId = requestAnimationFrame(drawNoise);
      }

      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      const { width, height } = canvas!;
      const imageData = ctx!.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Bell-curve approx: average 3 uniforms → values cluster near center
        const r = (Math.random() + Math.random() + Math.random()) / 3;

        // Shift distribution around BASE_LEVEL
        let v = BASE_LEVEL + (r - 0.5) * AMPLITUDE * 2;

        // Hard-clamp highlights so no near-white pixels survive
        v = Math.min(v, HIGHLIGHT_CLAMP);

        // Gamma curve (>1) compresses the upper range further toward dark
        v = Math.pow(Math.max(0, v), GAMMA);

        const byte = (v * 255) | 0;
        data[i]     = byte;
        data[i + 1] = byte;
        data[i + 2] = byte;
        data[i + 3] = 255; // full alpha — transparency via layer opacity only
      }

      ctx!.putImageData(imageData, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);
    drawNoise();

    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastTime = 0;
        drawNoise();
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.noise}
      style={{ opacity: OPACITY }}
    />
  );
}
