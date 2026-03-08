'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'About',    href: '/#about'   },
  { label: 'Journal',  href: '/blog'     },
  { label: 'Shop',     href: '/shop'     },
  { label: 'Projects', href: '/projects' },
];

export default function Nav() {
  const pathname = usePathname();
  if (pathname.startsWith('/studio')) return null;

  return (
    <nav className="site-nav">
      <Link href="/" onClick={() => window.scrollTo(0,0)} className="nav-logo">Xcursion</Link>
      <ul className="nav-links">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname.startsWith(href) ? 'active' : ''}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
