'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProjects } from '@/sanity/queries';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const bp = useBreakpoint();
  const mobile = bp === 'mobile' || bp === 'tablet';
  useEffect(() => { getProjects().then(setProjects); }, []);
  return (
    <main className="page-body" style={{ padding: mobile ? '70px 0 40px' : '90px 0 80px' }}>
      <div className="s2-gridlines" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', height: mobile ? '320px' : '420px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'luminosity', filter: 'grayscale(100%) contrast(1.4)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: mobile ? '40px 20px' : '60px 56px' }}>
          <div className="section-label" style={{ color: 'var(--gold)', letterSpacing: '0.35em' }}>Our Work</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 'clamp(40px,10vw,64px)' : 'clamp(60px,8vw,112px)', lineHeight: 0.9, color: 'var(--cream)', marginBottom: '16px' }}>All<br /><em style={{ color: 'rgba(240,230,208,0.85)' }}>Projects</em></h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: mobile ? '14px' : '16px', color: 'rgba(240,230,208,0.7)', lineHeight: 1.6, maxWidth: '600px' }}>Creative direction, collaborative work, and things we built from scratch.</p>
        </div>
      </div>
      <div style={{ padding: mobile ? '40px 20px' : '60px 56px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <Link key={p.slug.current} href={`/projects/${p.slug.current}`} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '96px 1fr auto', alignItems: 'center', gap: mobile ? '4px' : '32px', padding: mobile ? '20px 0' : '28px 0', borderBottom: '1px solid var(--cream-faint)', borderTop: i === 0 ? '1px solid var(--cream-faint)' : 'none', textDecoration: 'none', color: 'inherit', cursor: 'auto', transition: 'padding-left 0.4s' }}
              onMouseEnter={e => { if (!mobile) e.currentTarget.style.paddingLeft = '12px'; }}
              onMouseLeave={e => { if (!mobile) e.currentTarget.style.paddingLeft = '0px'; }}
            >
              {!mobile && <div style={{ width: '96px', height: '64px', background: p.imageUrl ? `url(${p.imageUrl}) center/cover no-repeat` : 'var(--bg)', border: '1px solid var(--cream-faint)', flexShrink: 0 }} />}
              <div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)' }}>{p.category}</span>
                  <span style={{ fontSize: '9px', color: 'rgba(240,230,208,0.55)' }}>{p.year}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? '18px' : 'clamp(20px,2.2vw,28px)', fontWeight: 300, color: 'var(--cream)', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(240,230,208,0.7)', lineHeight: 1.65, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{p.description}</div>
              </div>
              {!mobile && <span style={{ fontSize: '22px', color: 'rgba(240,230,208,0.7)' }}>↗</span>}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
