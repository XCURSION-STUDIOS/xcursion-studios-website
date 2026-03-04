'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home',     href: '/'           },
  { label: 'Shop',     href: '/shop'       },
  { label: 'Blog',     href: '/blog'       },
  { label: 'Projects', href: '/projects'   },
  { label: 'Contact',  href: '/#contact'   },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav">
      <Link href="/" className="nav-logo">Xcursion</Link>
      <ul className="nav-links">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname === href || (href !== '/' && pathname.startsWith(href)) ? 'active' : ''}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
