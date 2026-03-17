'use client';
import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let scrollY = 0;
    let animFrame: number;

    const COLS = 48;
    const ROWS = 48;

    const getHeight = (c: number, r: number, t: number) => {
      const nx = c / COLS;
      const ny = r / ROWS;
      return (
        Math.sin(nx * 3 + t * 0.2) * 300 +
        Math.cos(ny * 2.5 + t * 0.15) * 250 +
        Math.sin((nx * 1.5 + ny * 2) + t * 0.1) * 200 +
        Math.cos(nx * 5 - ny * 3 + t * 0.25) * 150 +
        Math.sin(nx * 8 + ny * 6 + t * 0.3) * 80
      );
    };

    // True perspective projection — low horizon like flying through terrain
    const project = (worldX: number, worldY: number, worldZ: number) => {
      const camX = 0;
      const camY = -800;  // Camera height above terrain
      const camZ = -500 + scrollY * 0.8; // Move forward as user scrolls
      const focalLength = 600;

      const dx = worldX - camX;
      const dy = worldY - camY;
      const dz = worldZ - camZ;

      if (dz <= 0) return null;

      const scale = focalLength / dz;
      return {
        x: width / 2 + dx * scale,
        y: height * 0.5 + dy * scale,
        scale,
        dz,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const t = Date.now() / 6000;

      const cellW = 80;
      const cellD = 80; // depth spacing

      const cols = COLS;
      const rows = ROWS;

      // Build world grid
      type Point = { wx: number; wy: number; wz: number };
      const points: Point[][] = [];
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const wx = (c - cols / 2) * cellW;
          const wz = r * cellD;
          const wy = getHeight(c, r, t);
          points[r][c] = { wx, wy, wz };
        }
      }

      // Draw back to front
      for (let r = rows - 2; r >= 0; r--) {
        for (let c = 0; c < cols - 1; c++) {
          const p00 = project(points[r][c].wx, points[r][c].wy, points[r][c].wz);
          const p10 = project(points[r][c+1].wx, points[r][c+1].wy, points[r][c+1].wz);
          const p01 = project(points[r+1][c].wx, points[r+1][c].wy, points[r+1][c].wz);
          const p11 = project(points[r+1][c+1].wx, points[r+1][c+1].wy, points[r+1][c+1].wz);

          if (!p00 || !p10 || !p01 || !p11) continue;

          // Skip if off screen
          if (p00.x < -200 || p00.x > width + 200) continue;

          const avgY = (points[r][c].wy + points[r][c+1].wy + points[r+1][c].wy + points[r+1][c+1].wy) / 4;
          const depth = Math.max(0, Math.min(1, (avgY + 400) / 800));
          const alpha = 0.04 + depth * 0.45;
          const dist = Math.max(0, Math.min(1, 1 - p00.dz / (rows * cellD)));

          ctx.beginPath();
          ctx.moveTo(p00.x, p00.y);
          ctx.lineTo(p10.x, p10.y);
          ctx.lineTo(p11.x, p11.y);
          ctx.lineTo(p01.x, p01.y);
          ctx.closePath();

          ctx.fillStyle = `rgba(7,6,13,${0.1 + depth * 0.2})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(201,168,76,${alpha * dist})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
