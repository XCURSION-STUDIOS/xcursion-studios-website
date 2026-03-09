'use client';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';
import { getPost, getPosts } from '@/sanity/queries';

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<any>(null);
  const [all, setAll] = useState<any[]>([]);

  useEffect(() => {
    getPost(slug).then(setPost);
    getPosts().then(setAll);
  }, [slug]);

  if (!post) return <main className="page-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div style={{ color: 'rgba(240,230,208,0.7)', fontSize: '11px', letterSpacing: '0.2em' }}>Loading...</div></main>;

  const idx = all.findIndex(p => p.slug.current === slug);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  return (
    <main className="page-body">
      <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,6,13,1) 0%, rgba(7,6,13,0.55) 50%, rgba(7,6,13,0.1) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 56px 64px', maxWidth: '900px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--cream-faint)' }} />{post.category}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,5.5vw,80px)', lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--cream)', marginBottom: '24px' }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: '24px', fontSize: '10px', color: 'rgba(240,230,208,0.7)', letterSpacing: '0.15em' }}>
            <span>{post.date}</span><span>{post.readTime}</span>
          </div>
        </div>
      </div>
      {post.imageUrl && <div style={{ width: '100%', maxHeight: '560px', overflow: 'hidden', marginBottom: '0' }}><img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '560px', objectFit: 'cover', objectPosition: 'center', display: 'block', opacity: 0.9 }} /></div>}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 56px 120px', fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 300, lineHeight: 1.9, color: 'var(--cream)' }}>
        {post.excerpt}
      </div>
      <nav style={{ borderTop: '1px solid rgba(201,168,76,0.2)', padding: '48px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {prev ? <Link href={`/blog/${prev.slug.current}`} style={{ textDecoration: 'none', color: 'var(--cream)', cursor: 'none' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', marginBottom: '6px' }}>← Previous</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300 }}>{prev.title}</div>
        </Link> : <div />}
        <Link href="/blog" style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', textDecoration: 'none', cursor: 'none' }}>All Posts</Link>
        {next ? <Link href={`/blog/${next.slug.current}`} style={{ textDecoration: 'none', color: 'var(--cream)', cursor: 'none', textAlign: 'right' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,230,208,0.7)', marginBottom: '6px' }}>Next →</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 300 }}>{next.title}</div>
        </Link> : <div />}
      </nav>
    </main>
  );
}
