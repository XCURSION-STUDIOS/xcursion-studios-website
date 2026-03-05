'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { posts } from '@/data/blog';
import { projects } from '@/data/projects';
import { products } from '@/data/shop';

const SECTIONS = 5;

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const transitioning = useRef(false);
  const wheelLocked = useRef(false);
  const touchStartY = useRef(0);

  const goTo = (index: number) => {
    if (index === current || transitioning.current || index < 0 || index >= SECTIONS) return;
    transitioning.current = true;
    setCurrent(index);
    setTimeout(() => { transitioning.current = false; }, 800);
  };

  // Wheel handler
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLocked.current || transitioning.current) return;

      const sections = document.querySelectorAll('.section');
      const section = sections[current] as HTMLElement;
      const isScrollable = section?.classList.contains('scrollable');

      if (isScrollable) {
        const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 8;
        const atTop = section.scrollTop <= 2;
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      if (Math.abs(e.deltaY) < 30) return;
      wheelLocked.current = true;
      setTimeout(() => { wheelLocked.current = false; }, 1000);
      goTo(e.deltaY > 0 ? current + 1 : current - 1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [current]);

  // Touch handler
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      goTo(diff > 0 ? current + 1 : current - 1);
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [current]);

  // Apply transform
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateY(-${current * 100}vh)`;
    }
  }, [current]);

  const featuredProduct = products[new Date().getDate() % 2];

  return (
    <div className="scroll-container">
      {/* Progress dots */}
      <div className="section-progress">
        {Array.from({ length: SECTIONS }).map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div
        ref={wrapperRef}
        className="sections-wrapper"
        style={{ transition: 'transform 0.75s cubic-bezier(0.77,0,0.175,1)' }}
      >
        {/* 0: HERO */}
        <div className="section" id="section-hero" style={{ justifyContent: 'center' }}>
          <div style={{ paddingTop: '80px' }}>
            <div className="section-label">Est. 2024 · Creative Studio</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(64px,10vw,140px)',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              color: 'var(--white)',
              marginBottom: '40px',
            }}>
              Savour<br /><em style={{ color: 'var(--cream-dim)' }}>the journey.</em>
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(16px,1.5vw,20px)',
              fontWeight: 300,
              color: 'var(--cream-dim)',
              maxWidth: '480px',
              lineHeight: 1.75,
              marginBottom: '48px',
            }}>
              Xcursion is a creative studio built around the idea that the process matters as much as the destination.
            </p>
            <button className="btn-line" onClick={() => goTo(1)}>
              Explore ↓
            </button>
          </div>
        </div>

        {/* 1: SHOP */}
        <div className="section scrollable" id="section-shop">
          <div style={{ padding: '120px 0 80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
              <div>
                <div className="section-label">Merch</div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Shop</h2>
              </div>
              <Link href="/shop" className="btn-line">View all items →</Link>
            </div>
            {/* Featured product */}
            <Link href={`/shop/${featuredProduct.slug}`} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              border: '1px solid var(--cream-faint)',
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'none',
            }}>
              <div style={{
                position: 'relative',
                minHeight: '420px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: featuredProduct.gradient,
                borderRight: '1px solid var(--cream-faint)',
                overflow: 'hidden',
              }}>
                <span style={{
                  fontFamily: 'var(--font-sc)',
                  fontSize: 'clamp(80px,14vw,180px)',
                  color: 'rgba(237,232,224,0.04)',
                  fontWeight: 300,
                  userSelect: 'none',
                }}>{featuredProduct.label}</span>
                <div style={{
                  position: 'absolute', top: '24px', left: '24px',
                  fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'var(--cream-faint)', border: '1px solid var(--cream-faint)',
                  padding: '5px 12px',
                }}>{featuredProduct.badge}</div>
              </div>
              <div style={{ padding: '48px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--cream-faint)' }}>{featuredProduct.category}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px,4.5vw,64px)', lineHeight: 0.95, color: 'var(--white)' }}>{featuredProduct.name}</h3>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 300, lineHeight: 1.75, color: 'var(--cream-dim)', maxWidth: '380px' }}>{featuredProduct.description}</p>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 300, color: 'var(--cream-dim)' }}>{featuredProduct.price}</div>
                <span className="btn-line" style={{ alignSelf: 'flex-start' }}>View Product →</span>
              </div>
            </Link>
          </div>
        </div>

        {/* 2: BLOG */}
        <div className="section scrollable" id="section-blog">
          <div style={{ padding: '120px 0 80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
              <div>
                <div className="section-label">Writing</div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Blog</h2>
              </div>
              <Link href="/blog" className="btn-line">View all posts →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--cream-faint)' }}>
              {posts.slice(0, 4).map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{
                  padding: '32px 28px',
                  borderRight: i % 2 === 0 ? '1px solid var(--cream-faint)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--cream-faint)' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'none',
                }}>
                  <div style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--cream-faint)', marginBottom: '12px' }}>{post.category}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,1.8vw,24px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1.2, marginBottom: '12px', flex: 1 }}>{post.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--cream-faint)' }}>{post.date} · {post.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3: PROJECTS */}
        <div className="section scrollable" id="section-projects">
          <div style={{ padding: '120px 0 80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div>
                <div className="section-label">Our Work</div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Projects</h2>
              </div>
              <Link href="/projects" className="btn-line">View all projects →</Link>
            </div>
            {/* Featured project */}
            <Link href={`/projects/${projects[0].slug}`} style={{
              display: 'block', textDecoration: 'none', cursor: 'none', marginBottom: '6px',
            }}>
              <div style={{
                position: 'relative', width: '100%', aspectRatio: '21/7',
                overflow: 'hidden', border: '1px solid var(--cream-faint)',
                background: projects[0].gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-sc)', fontSize: 'clamp(28px,5vw,72px)', color: 'rgba(237,232,224,0.05)', letterSpacing: '0.18em', fontWeight: 300 }}>{projects[0].label}</span>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,6,13,0.7) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--cream-faint)' }}>Featured · {projects[0].category}</span>
                  <span style={{ fontSize: '22px', color: 'var(--cream-faint)' }}>↗</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0 0', borderTop: '1px solid var(--cream-faint)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-sc)', fontSize: '20px', color: 'var(--white)', fontWeight: 300, marginBottom: '6px' }}>{projects[0].name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--cream-faint)' }}>{projects[0].description}</div>
                </div>
                <span className="btn-line">View Project →</span>
              </div>
            </Link>
            {/* Mini grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginTop: '6px' }}>
              {projects.slice(1, 3).map(p => (
                <Link key={p.slug} href={`/projects/${p.slug}`} style={{
                  textDecoration: 'none', cursor: 'none',
                  border: '1px solid var(--cream-faint)', overflow: 'hidden',
                }}>
                  <div style={{ aspectRatio: '16/7', background: p.gradient }} />
                  <div style={{ padding: '14px 16px', borderTop: '1px solid var(--cream-faint)' }}>
                    <div style={{ fontFamily: 'var(--font-sc)', fontSize: '13px', color: 'var(--white)', fontWeight: 300, marginBottom: '3px' }}>{p.name}</div>
                    <div style={{ fontSize: '9px', color: 'var(--cream-faint)', letterSpacing: '0.15em' }}>{p.category} · {p.year}</div>
                  </div>
                </Link>
              ))}
              <Link href="/projects" style={{
                textDecoration: 'none', cursor: 'none',
                border: '1px solid var(--cream-faint)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '12px', padding: '32px',
                fontFamily: 'var(--font-sc)', fontSize: '15px',
                letterSpacing: '0.15em', color: 'var(--cream-faint)',
              }}>
                <span>All Projects</span>
                <span style={{ fontSize: '22px' }}>↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4: CONTACT */}
        <div className="section" id="section-contact" style={{ justifyContent: 'center' }}>
          <div style={{ padding: '120px 0 0' }}>
            <div className="section-label">Get in Touch</div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(52px,8vw,112px)', lineHeight: 0.9,
              letterSpacing: '-0.02em', color: 'var(--white)', marginBottom: '32px',
            }}>
              Let&apos;s<br /><em style={{ color: 'var(--cream-dim)' }}>Talk</em>
            </h2>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 300, color: 'var(--cream-dim)', maxWidth: '420px', lineHeight: 1.75, marginBottom: '40px' }}>
              Got a project? Want to buy a shirt? Just want to chat about a game, book, or the meaning of it all?
            </p>
            <a href="mailto:hello@xcursion.studio" className="btn-line">hello@xcursion.studio</a>
            <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[['Instagram', '#'], ['Twitter / X', '#'], ['LinkedIn', '#']].map(([label, href]) => (
                <a key={label} href={href} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0', borderBottom: '1px solid var(--cream-faint)',
                  textDecoration: 'none', color: 'var(--cream-dim)',
                  fontSize: 'clamp(18px,2vw,24px)', fontFamily: 'var(--font-display)',
                  fontWeight: 300, cursor: 'none', transition: 'color 0.3s',
                }}>
                  {label} <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
