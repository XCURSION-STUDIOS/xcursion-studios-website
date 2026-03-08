'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProjects } from '@/sanity/queries';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => { getProjects().then(setProjects); }, []);

  return (
    <main className="page-body">

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, mixBlendMode: 'luminosity', filter: 'grayscale(100%) contrast(1.4)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 56px 60px', position: 'relative', zIndex: 1 }}>
        <div className="section-label">Our Work</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,8vw,112px)', lineHeight: 0.9, color: 'var(--cream)', marginBottom: '16px' }}>All<br /><em style={{ color: 'var(--cream-dim)' }}>Projects</em></h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '16px', color: 'var(--cream-faint)', lineHeight: 1.6, maxWidth: '400px', marginBottom: '64px' }}>Creative direction, collaborative work, and things we built from scratch.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <Link key={p.slug.current} href={`/projects/${p.slug.current}`} style={{
              display: 'grid', gridTemplateColumns: '96px 1fr auto', alignItems: 'center', gap: '32px',
              padding: '28px 0', borderBottom: '1px solid var(--cream-faint)',
              borderTop: i === 0 ? '1px solid var(--cream-faint)' : 'none',
              textDecoration: 'none', color: 'inherit', cursor: 'none', transition: 'padding-left 0.4s',
            }}
            onMouseEnter={e => (e.currentTarget.style.paddingLeft = '12px')}
            onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0px')}
            >
              <div style={{ width: '96px', height: '64px', background: p.gradient, border: '1px solid var(--cream-faint)', flexShrink: 0 }} />
              <div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)' }}>{p.category}</span>
                  <span style={{ fontSize: '9px', color: 'rgba(237,232,224,0.2)' }}>{p.year}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.2vw,28px)', fontWeight: 300, color: 'var(--white)', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--cream-faint)', lineHeight: 1.65 }}>{p.description}</div>
              </div>
              <span style={{ fontSize: '22px', color: 'var(--cream-faint)' }}>↗</span>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </main>
  );
}
