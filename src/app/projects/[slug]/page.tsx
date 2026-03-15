'use client';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';
import { getProject, getProjects } from '@/sanity/queries';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [project, setProject] = useState<any>(null);
  const [all, setAll] = useState<any[]>([]);
  const bp = useBreakpoint();
  const mobile = bp === 'mobile' || bp === 'tablet';

  useEffect(() => {
    getProject(slug).then(setProject);
    getProjects().then(setAll);
  }, [slug]);

  if (!project) return <main className="page-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div style={{ color: 'rgba(240,230,208,0.7)', fontSize: '11px', letterSpacing: '0.2em' }}>Loading...</div></main>;

  const idx = all.findIndex(p => p.slug.current === slug);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  return (
    <main className="page-body" style={{ padding: 0 }}>

      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', paddingTop: mobile ? '80px' : '120px' }}>
        <div style={{ position: 'absolute', inset: 0, background: project.imageUrl ? `url(${project.imageUrl}) center/cover no-repeat` : 'var(--bg)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,6,13,1) 0%, rgba(7,6,13,0.4) 55%, rgba(7,6,13,0.05) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: mobile ? '0 20px 40px' : '0 56px 56px', width: '100%' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--cream-faint)' }} />{project.category}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: mobile ? 'clamp(28px,7vw,48px)' : 'clamp(40px,6vw,88px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--cream)' }}>{project.name}</h1>
            {!mobile && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                {project.tags?.map((tag: string) => (
                  <span key={tag} style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', border: '1px solid rgba(240,230,208,0.25)', padding: '5px 12px' }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', border: '1px solid rgba(240,230,208,0.25)', borderTop: 'none' }}>
        {[['Year', project.year], ['Category', project.category], ['Tools', project.tools?.slice(0,2).join(', ')], ['Status', project.tags?.[1] || project.tags?.[0]]].map(([label, value], i) => (
          <div key={label} style={{ padding: mobile ? '16px 20px' : '20px 28px', borderRight: i < 3 ? '1px solid rgba(240,230,208,0.15)' : 'none', borderBottom: mobile && i < 2 ? '1px solid rgba(240,230,208,0.15)' : 'none' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', marginBottom: '6px' }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? '14px' : '16px', fontWeight: 300, color: 'var(--cream)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: mobile ? '40px 20px' : '80px 56px' }}>
        {[
          { label: 'Overview', content: <p style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? '16px' : '18px', fontWeight: 300, lineHeight: 1.85, color: 'var(--cream)' }}>{project.overview}</p> },
          { label: 'Tools & Stack', content: <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{project.tools?.map((t: string) => <span key={t} style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 14px', border: '1px solid rgba(240,230,208,0.25)', color: 'rgba(240,230,208,0.7)' }}>{t}</span>)}</div> },
          { label: 'Outcomes', content: <div>{project.outcomes?.map((o: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: '20px', padding: '16px 0', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
              <span style={{ fontSize: '9px', color: 'rgba(240,230,208,0.7)', paddingTop: '3px', minWidth: '24px' }}>0{i+1}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? '15px' : '17px', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.6 }}>{o}</span>
            </div>
          ))}</div> },
        ].map(({ label, content }) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '200px 1fr', gap: mobile ? '16px' : '64px', padding: mobile ? '32px 0' : '48px 0', borderBottom: '1px solid rgba(201,168,76,0.2)', borderTop: label === 'Overview' ? '1px solid var(--cream-faint)' : 'none' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', paddingTop: '4px' }}>{label}</div>
            <div>{content}</div>
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav style={{ borderTop: '1px solid rgba(201,168,76,0.2)', padding: mobile ? '32px 20px' : '48px 56px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        {prev ? <Link href={`/projects/${prev.slug.current}`} style={{ textDecoration: 'none', color: 'var(--cream)', cursor: 'auto' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', marginBottom: '6px' }}>← Previous</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? '13px' : '16px', fontWeight: 300 }}>{prev.name}</div>
        </Link> : <div />}
        <Link href="/projects" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', textDecoration: 'none', cursor: 'auto', textAlign: 'center' }}>All Projects</Link>
        {next ? <Link href={`/projects/${next.slug.current}`} style={{ textDecoration: 'none', color: 'var(--cream)', cursor: 'auto', textAlign: 'right', justifySelf: 'end' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', marginBottom: '6px' }}>Next →</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? '13px' : '16px', fontWeight: 300 }}>{next.name}</div>
        </Link> : <div />}
      </nav>
    </main>
  );
}
