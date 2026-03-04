import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, getProject } from '@/data/projects';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex(p => p.slug === slug);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  return (
    <main className="page-body">
      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', height: '75vh', minHeight: '500px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: project.gradient }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,6,13,1) 0%, rgba(7,6,13,0.4) 55%, rgba(7,6,13,0.05) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 56px 56px', width: '100%' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--cream-faint)' }} />
            {project.category}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(40px,6vw,88px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--white)' }}
              dangerouslySetInnerHTML={{ __html: project.name }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-faint)', border: '1px solid var(--cream-faint)', padding: '5px 12px' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid var(--cream-faint)', borderTop: 'none' }}>
        {[['Year', project.year], ['Category', project.category], ['Tools', project.tools.slice(0,2).join(', ')], ['Status', project.tags[1] || project.tags[0]]].map(([label, value]) => (
          <div key={label} style={{ padding: '20px 28px', borderRight: '1px solid var(--cream-faint)' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '6px' }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300, color: 'var(--cream-dim)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 56px' }}>
        {[
          { label: 'Overview', content: <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 300, lineHeight: 1.85, color: 'var(--cream-dim)' }}>{project.overview}</p> },
          { label: 'Tools & Stack', content: <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{project.tools.map(t => <span key={t} style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 14px', border: '1px solid var(--cream-faint)', color: 'var(--cream-faint)' }}>{t}</span>)}</div> },
          { label: 'Outcomes', content: <div>{project.outcomes.map((o, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', padding: '16px 0', borderBottom: '1px solid var(--cream-faint)' }}>
              <span style={{ fontSize: '9px', color: 'var(--cream-faint)', paddingTop: '3px', minWidth: '24px' }}>0{i+1}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 300, color: 'var(--cream-dim)', lineHeight: 1.6 }}>{o}</span>
            </div>
          ))}</div> },
        ].map(({ label, content }) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '64px', padding: '48px 0', borderBottom: '1px solid var(--cream-faint)', borderTop: label === 'Overview' ? '1px solid var(--cream-faint)' : 'none' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cream-faint)', paddingTop: '4px' }}>{label}</div>
            <div>{content}</div>
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav style={{ borderTop: '1px solid var(--cream-faint)', padding: '48px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {prev ? <Link href={`/projects/${prev.slug}`} style={{ textDecoration: 'none', color: 'var(--cream-dim)', cursor: 'none' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '6px' }}>← Previous</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300 }}>{prev.name}</div>
        </Link> : <div />}
        <Link href="/projects" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-faint)', textDecoration: 'none', cursor: 'none' }}>All Projects</Link>
        {next ? <Link href={`/projects/${next.slug}`} style={{ textDecoration: 'none', color: 'var(--cream-dim)', cursor: 'none', textAlign: 'right' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '6px' }}>Next →</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300 }}>{next.name}</div>
        </Link> : <div />}
      </nav>
    </main>
  );
}
