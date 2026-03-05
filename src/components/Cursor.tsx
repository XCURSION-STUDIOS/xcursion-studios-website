'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Cursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const ring      = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (pathname.startsWith('/studio')) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top  = e.clientY + 'px';
      }
    };

    const onOver = (e: MouseEvent) => {
      const h = (e.target as Element).closest('a,button');
      if (cursorRef.current) {
        cursorRef.current.style.width  = h ? '18px' : '8px';
        cursorRef.current.style.height = h ? '18px' : '8px';
      }
      if (ringRef.current) {
        ringRef.current.style.width  = h ? '52px' : '32px';
        ringRef.current.style.height = h ? '52px' : '32px';
      }
    };

    let raf: number;
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  if (pathname.startsWith('/studio')) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursor-ring" />
    </>
  );
}
