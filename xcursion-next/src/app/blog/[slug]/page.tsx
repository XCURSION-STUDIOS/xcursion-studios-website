import { notFound } from 'next/navigation';
import Link from 'next/link';
import { posts, getPost } from '@/data/blog';

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = posts.findIndex(p => p.slug === slug);
  const prev = posts[idx - 1];
  const next = posts[idx + 1];

  return (
    <main className="page-body">
      {/* Hero */}
      <div style={{
        position: 'relative', width: '100%', height: '70vh', minHeight: '480px',
        display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: post.heroGradient }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,6,13,1) 0%, rgba(7,6,13,0.55) 50%, rgba(7,6,13,0.1) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 56px 64px', maxWidth: '900px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--cream-faint)' }} />
            {post.category}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(36px,5.5vw,80px)', lineHeight: 1.0,
            letterSpacing: '-0.02em', color: 'var(--white)', marginBottom: '24px',
          }} dangerouslySetInnerHTML={{ __html: post.title }} />
          <div style={{ display: 'flex', gap: '24px', fontSize: '10px', color: 'var(--cream-faint)', letterSpacing: '0.15em' }}>
            <span>{post.date}</span><span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 56px 120px' }}
        dangerouslySetInnerHTML={{ __html: `<div class="post-body">${post.content}</div>` }}
      />

      {/* Post nav */}
      <nav style={{
        borderTop: '1px solid var(--cream-faint)', padding: '48px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px',
      }}>
        {prev ? (
          <Link href={`/blog/${prev.slug}`} style={{ textDecoration: 'none', color: 'var(--cream-dim)', cursor: 'none' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '6px' }}>← Previous</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300 }}>{prev.title}</div>
          </Link>
        ) : <div />}
        <Link href="/blog" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-faint)', textDecoration: 'none', cursor: 'none' }}>All Posts</Link>
        {next ? (
          <Link href={`/blog/${next.slug}`} style={{ textDecoration: 'none', color: 'var(--cream-dim)', cursor: 'none', textAlign: 'right' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '6px' }}>Next →</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300 }}>{next.title}</div>
          </Link>
        ) : <div />}
      </nav>
    </main>
  );
}
