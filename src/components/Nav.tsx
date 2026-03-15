'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const allLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Journal', href: '/blog' },
  { label: 'Shop', href: '/shop' },
  { label: 'Projects', href: '/projects' },
];
const linksLeft = [
  { label: 'About', href: '/#about' },
  { label: 'Journal', href: '/blog' },
];
const linksRight = [
  { label: 'Shop', href: '/shop' },
  { label: 'Projects', href: '/projects' },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const bp = useBreakpoint();
  const mobile = bp === 'mobile' || bp === 'tablet';
  const [open, setOpen] = useState(false);

  if (pathname.startsWith('/studio')) return null;

  const handleAbout = () => {
    setOpen(false);
    const el = document.getElementById('about');
    if (el) { window.history.replaceState(null, '', '/'); el.scrollIntoView({ behavior: 'smooth' }); }
    else { router.push('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 300); }
  };

  const lineStyle = (extraTransform: string) => ({
    display: 'block' as const,
    width: '22px',
    height: '1px',
    background: 'var(--cream)' as const,
    transition: 'all 0.3s',
    transform: open ? extraTransform : 'none',
  });

  if (mobile) {
    return (
      <>
        <nav className="site-nav" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Link href="/" onClick={() => { window.scrollTo(0, 0); setOpen(false); }} className="nav-logo">
              <img src="/logo.png" alt="Xcursion" style={{ height: '28px', width: 'auto' }} />
            </Link>
            <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={lineStyle('rotate(45deg) translate(4px, 4px)')} />
              <span style={lineStyle('rotate(-45deg) translate(4px, -4px)')} />
            </button>
          </div>
        </nav>
        {open && (
          <div style={{ position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 490, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
            <Link href="/" onClick={() => { window.scrollTo(0, 0); setOpen(false); }} className="nav-logo" style={{ marginBottom: '20px' }}>
              <img src="/logo.png" alt="Xcursion" style={{ height: '40px', width: 'auto' }} />
            </Link>
            {allLinks.map(({ label, href }) => (
              href === '/#about'
                ? <button key={href} onClick={handleAbout} style={{ background: 'none', border: 'none', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.6)', cursor: 'pointer' }}>{label}</button>
                : <Link key={href} href={href} onClick={() => setOpen(false)} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.6)', textDecoration: 'none' }}>{label}</Link>
            ))}
            <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--cream)' }}>✕</button>
          </div>
        )}
      </>
    );
  }

  return (
    <nav className="site-nav">
      <ul className="nav-links">
        {linksLeft.map(({ label, href }) => (
          <li key={href}>{href === '/#about'
            ? <a style={{ cursor: 'pointer' }} onClick={handleAbout}>{label}</a>
            : <Link href={href} className={pathname.startsWith(href) ? 'active' : ''}>{label}</Link>}
          </li>
        ))}
      </ul>
      <Link href="/" onClick={() => window.scrollTo(0, 0)} className="nav-logo">
        <img src="/logo.png" alt="Xcursion" style={{ height: '32px', width: 'auto' }} />
      </Link>
      <ul className="nav-links">
        {linksRight.map(({ label, href }) => (
          <li key={href}><Link href={href} className={pathname.startsWith(href) ? 'active' : ''}>{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
