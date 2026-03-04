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
      <body>
        <Background />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
