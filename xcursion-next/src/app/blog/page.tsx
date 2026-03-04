"use client";
import Link from 'next/link';
import { posts } from '@/data/blog';

export default function BlogPage() {
  return (
    <main className="page-body">
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '160px 56px 80px' }}>
        <div className="section-label">Writing</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: 'clamp(60px,8vw,112px)', lineHeight: 0.9,
          letterSpacing: '-0.02em', color: 'var(--white)', marginBottom: '64px',
        }}>
          The<br /><em style={{ color: 'var(--cream-dim)' }}>Blog</em>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              alignItems: 'center', gap: '32px',
              padding: '28px 0',
              borderBottom: '1px solid var(--cream-faint)',
              borderTop: i === 0 ? '1px solid var(--cream-faint)' : 'none',
              textDecoration: 'none', color: 'inherit', cursor: 'none',
              transition: 'padding-left 0.4s',
            }}
            onMouseEnter={e => (e.currentTarget.style.paddingLeft = '12px')}
            onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0px')}
            >
              <div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)' }}>{post.category}</span>
                  <span style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(237,232,224,0.2)' }}>{post.date}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2.2vw,28px)', fontWeight: 300, color: 'var(--white)', marginBottom: '6px' }}>{post.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--cream-faint)', lineHeight: 1.65 }}>{post.excerpt}</div>
              </div>
              <span style={{ fontSize: '22px', color: 'var(--cream-faint)' }}>↗</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
