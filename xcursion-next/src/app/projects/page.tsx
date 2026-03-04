"use client";
import Link from 'next/link';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <main className="page-body">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 56px 80px' }}>
        <div className="section-label">Our Work</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'clamp(60px,8vw,112px)', lineHeight: 0.9,
          letterSpacing: '-0.02em', color: 'var(--white)', marginBottom: '64px',
        }}>
          All<br /><em style={{ color: 'var(--cream-dim)' }}>Projects</em>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} style={{
              display: 'grid', gridTemplateColumns: '96px 1fr auto',
              alignItems: 'center', gap: '32px', padding: '28px 0',
              borderBottom: '1px solid var(--cream-faint)',
              borderTop: i === 0 ? '1px solid var(--cream-faint)' : 'none',
              textDecoration: 'none', color: 'inherit', cursor: 'none',
              transition: 'padding-left 0.4s',
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
    </main>
  );
}
