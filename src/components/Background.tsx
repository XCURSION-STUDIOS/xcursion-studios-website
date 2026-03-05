'use client';
import { usePathname } from 'next/navigation';

export default function Background() {
  const pathname = usePathname();
  if (pathname.startsWith('/studio')) return null;

  return (
    <>
      <div className="bg-layer" />
      <div className="bg-dots" />
      <div className="bg-grain" />
    </>
  );
}
