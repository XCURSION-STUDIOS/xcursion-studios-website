'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Journal',  href: '/blog'     },
  { label: 'Shop',     href: '/shop'     },
  { label: 'Projects', href: '/projects' },
];

export default function Nav() {
  const pathname = usePathname();
  if (pathname.startsWith('/studio')) return null;

  return (
    <nav className="site-nav">
      <Link href="/" className="nav-logo">Xcursion</Link>
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
        <li>
          <Link href="/projects" className="nav-cta">Enter</Link>
        </li>
      </ul>
    </nav>
  );
}
