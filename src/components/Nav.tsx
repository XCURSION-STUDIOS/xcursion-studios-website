'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const linksLeft = [
  { label: 'About',   href: '/#about' },
  { label: 'Journal', href: '/blog'   },
];
const linksRight = [
  { label: 'Shop',     href: '/shop'     },
  { label: 'Projects', href: '/projects' },
];

export default function Nav() {
  const pathname = usePathname();
  if (pathname.startsWith('/studio')) return null;

  return (
    <nav className="site-nav">
      <ul className="nav-links">
        {linksLeft.map(({ label, href }) => (
          <li key={href}><Link href={href} className={pathname.startsWith(href) ? 'active' : ''}>{label}</Link></li>
        ))}
      </ul>
      <Link href="/" onClick={() => window.scrollTo(0,0)} className="nav-logo"><img src="/logo.png" alt="Xcursion" style={{height:"32px",width:"auto"}} /></Link>
      <ul className="nav-links">
        {linksRight.map(({ label, href }) => (
          <li key={href}><Link href={href} className={pathname.startsWith(href) ? 'active' : ''}>{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
