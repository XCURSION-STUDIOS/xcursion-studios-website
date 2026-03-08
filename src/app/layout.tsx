import type { Metadata } from 'next';
import './globals.css';
import Background from '@/components/Background';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Xcursion',
  description: 'Savour the journey.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Mono:wght@300&family=Great+Vibes&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Background />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
