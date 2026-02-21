'use client';

import { useEffect, useRef } from 'react';
import styles from './NoiseOverlay.module.css';

// ── Tuning knobs ──────────────────────────────────────────────────────────────
//
// GRAIN_SIZE   Spatial frequency. 1 = one canvas pixel per CSS pixel (finest).
//              Raise to 2–3 for coarser, chunkier static.
//
// OPACITY      Overall layer transparency (0.0–1.0).
//              0.04 is barely-there; 0.12 is clearly visible.
//
// CONTRAST     Brightness swing per grain (0–255). Values are distributed
//              around mid-gray (128), so ±CONTRAST keeps them away from
//              harsh pure-white / pure-black.
//              30 = extremely subtle; 80 = noticeable flicker.
//
// FPS          Animation framerate. 18–24 = smooth flicker; 8–12 = choppy/CRT.
//
// ─────────────────────────────────────────────────────────────────────────────
const GRAIN_SIZE = 1;   // go lower (toward 0.5) = finer; higher = blockier
const OPACITY    = 0.06;
const CONTRAST   = 45;
const FPS        = 20;

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // imageSmoothingEnabled is true by default — leave it so bilinear
    // interpolation softens the grain when GRAIN_SIZE > 1.
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId: number;
    let lastTime = 0;
    const interval = 1000 / FPS;

    function resize() {
      // Internal canvas resolution = screen CSS pixels / GRAIN_SIZE.
      // CSS keeps the canvas at 100vw×100vh, so the browser upscales
      // with bilinear smoothing — no chunky blocky pixels.
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
        // Bell-curve approximation: average 3 uniforms → values cluster
        // around mid-gray, rarely touching pure white or pure black.
        const r = (Math.random() + Math.random() + Math.random()) / 3;
        const v = (128 + (r - 0.5) * CONTRAST * 3) | 0;
        data[i]     = v;   // R
        data[i + 1] = v;   // G
        data[i + 2] = v;   // B
        data[i + 3] = 255; // A — full; transparency comes from CSS opacity
      }

      ctx!.putImageData(imageData, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);
    drawNoise();

    return () => {
      window.removeEventListener('resize', resize);
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
