'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const MARQUEE_LABELS = [
  'Journal','Shop','Projects','Creative Studio','Est. 2024',
  'Movement','Ambiance','Intention','Xcursion','Lifestyle',
  'Journal','Shop','Projects','Creative Studio','Est. 2024',
  'Movement','Ambiance','Intention','Xcursion','Lifestyle',
];

const TICKER_ITEMS = [
  'Journal','·','Shop','·','Projects','·','Creative Studio','·',
  'Movement & Ambiance','·','Est. 2024','·','xcursionstudios.com','·',
  'Journal','·','Shop','·','Projects','·','Creative Studio','·',
  'Movement & Ambiance','·','Est. 2024','·','xcursionstudios.com','·',
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `translateY(${scrollY * 0.45}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* ── HERO ── */}
      <div className="hero" ref={heroRef}>
        <div
          ref={bgRef}
          className="hero-bg-img"
          style={{ backgroundImage: "url('/bg.png')" }}
        />
        <div className="hero-bg-overlay" />
        <div className="bg-grain" style={{ position: 'absolute', zIndex: 3 }} />

        <div className="hero-center" style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
        }}>
          <div className="hero-eyebrow">Creative Studio</div>

          <div className="hero-title">XCURSION STUDIOS</div>

          <div className="hero-divider" />

          <p className="hero-tagline">
            Built for the <em>restless</em>. A brand centred on<br />
            movement, ambiance, and living with intention.
          </p>

          <div className="btn-row">
            <Link href="/shop" className="btn-main">Explore</Link>
            <Link href="/blog" className="btn-sec">Read the Journal</Link>
          </div>
        </div>

        <div className="corner corner-bl">Est. 2024</div>
        <div className="corner corner-br">xcursionstudios.com</div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {MARQUEE_LABELS.map((label, i) => (
            <div className="marquee-img" key={i}>
              <span className="marquee-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span className="ticker-item" key={i} style={item === '·' ? { color: 'var(--gold)', opacity: 0.5 } : {}}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: WHAT WE CREATE ── */}
      <div className="section2">
        <div className="s2-gridlines" />
        <div className="s2-glow" />
        <div className="s2-inner">
          <div className="s2-label reveal">What we create</div>
          <div className="s2-grid">
            {[
              { num: '01', title: 'Journal', href: '/blog', desc: 'Slow essays, visual diaries and dispatches from places that shaped us.' },
              { num: '02', title: 'Shop',    href: '/shop', desc: 'Garments and objects for people who move through the world with purpose.' },
              { num: '03', title: 'Projects', href: '/projects', desc: 'Creative direction, collaborative work, and things we built from scratch.' },
            ].map((c, i) => (
              <Link href={c.href} key={c.num} className="s2-card reveal" style={{ transitionDelay: `${i * 0.12}s`, textDecoration: 'none' }}>
                <div className="s2-bg-num">{c.num}</div>
                <div className="s2-num">{c.num}</div>
                <div className="s2-title">{c.title}</div>
                <div className="s2-divider" />
                <div className="s2-desc">{c.desc}</div>
                <div className="s2-link">View all →</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <Link href="/" className="footer-logo">Xcursion</Link>
        <span className="footer-copy">© 2024 Xcursion Studios</span>
      </footer>
    </div>
  );
}