'use client';

import { useEffect, useRef } from 'react';
import styles from './NoiseOverlay.module.css';

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced-motion: draw a single static frame and stop
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationId: number;
    let lastTime = 0;
    const fps = 15;
    const interval = 1000 / fps;

    // Draw at 1/3 resolution, scaled up via CSS for performance
    const scale = 3;

    function resize() {
      canvas!.width = Math.ceil(window.innerWidth / scale);
      canvas!.height = Math.ceil(window.innerHeight / scale);
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
        const v = Math.random() > 0.85 ? 255 : 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
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

  return <canvas ref={canvasRef} className={styles.noise} />;
}
