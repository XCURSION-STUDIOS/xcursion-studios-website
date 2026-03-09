'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getPosts, getProducts, getProjects } from '@/sanity/queries';

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
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [featuredProduct, setFeaturedProduct] = useState<any>(null);
  const [featuredProject, setFeaturedProject] = useState<any>(null);

  // Scroll to hash on load and hash change
  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash === '#about') {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  // Fetch featured items
  useEffect(() => {
    getPosts().then(posts => { if (posts.length) setFeaturedPost(posts[Math.floor(Math.random() * posts.length)]); });
    getProducts().then(products => { if (products.length) setFeaturedProduct(products[Math.floor(Math.random() * products.length)]); });
    getProjects().then(projects => { if (projects.length) setFeaturedProject(projects[Math.floor(Math.random() * projects.length)]); });
  }, []);

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
      document.querySelectorAll(".feature-bg").forEach((el, i) => {
        const section = el.parentElement;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2);
        (el as HTMLElement).style.transform = `translateY(${offset * 0.25}px)`;
      });
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
          style={{ backgroundImage: "url('/bg.gif')" }}
        />
        <div className="hero-bg-overlay" />
        <div className="bg-grain" style={{ position: 'absolute', zIndex: 3 }} />

        <div className="hero-center" style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
        }}>
          <div className="hero-eyebrow">Creative Studio</div>

          <div className="hero-title-stack"><span className="hero-title-serif">XCURSION</span><span className="hero-title-script" style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>studios</span></div>

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
      {/* ── JOURNAL SECTION ── */}
      <div className="feature-section">
        <div className="feature-bg" style={{backgroundImage:"url('/bg.png')"}} />
        <div className="feature-bg-overlay" />
        <div className="s2-gridlines" />
        <div className="feature-inner reveal">
          <div className="s2-label">01 — Journal</div>
          <div className="s2-feature">
            <div className="s2-feature-text">
              <div className="s2-title">Journal</div>
              <div className="s2-divider" />
              <div className="s2-desc">Slow essays, visual diaries and dispatches from places that shaped us.</div>
              <div className="s2-featured-item">
                <div className="s2-featured-label">Featured Post</div>
                <div className="s2-featured-title">{featuredPost?.title || 'Coming Soon'}</div>
                <div className="s2-featured-meta">{featuredPost?.date || ''}</div>
              </div>
              <Link href={featuredPost ? `/blog/${featuredPost.slug.current}` : "/blog"} className="s2-link" style={{opacity:1}}>Read the Journal →</Link>
            </div>
            <div className="s2-feature-img" style={{backgroundImage:featuredPost?.imageUrl ? `url(${featuredPost.imageUrl})` : "url('/bg.png')"}} />
          </div>
        </div>
      </div>

      {/* ── SHOP SECTION ── */}
      <div className="feature-section">
        <div className="feature-bg" style={{backgroundImage:"url('/bg.png')"}} />
        <div className="feature-bg-overlay" />
        <div className="s2-gridlines" />
        <div className="feature-inner reveal">
          <div className="s2-label">02 — Shop</div>
          <div className="s2-feature s2-feature--reverse">
            <div className="s2-feature-text">
              <div className="s2-title">Shop</div>
              <div className="s2-divider" />
              <div className="s2-desc">Garments and objects for people who move through the world with purpose.</div>
              <div className="s2-featured-item">
                <div className="s2-featured-label">Featured Product</div>
                <div className="s2-featured-title">{featuredProduct?.name || 'Coming Soon'}</div>
                <div className="s2-featured-meta">{featuredProduct?.price || ''}</div>
              </div>
              <Link href={featuredProduct ? `/shop/${featuredProduct.slug.current}` : "/shop"} className="s2-link" style={{opacity:1}}>Visit the Shop →</Link>
            </div>
            <div className="s2-feature-img" style={{backgroundImage:featuredProduct?.imageUrl ? `url(${featuredProduct.imageUrl})` : "url('/bg.png')"}} />
          </div>
        </div>
      </div>

      {/* ── PROJECTS SECTION ── */}
      <div className="feature-section">
        <div className="feature-bg" style={{backgroundImage:"url('/bg.png')"}} />
        <div className="feature-bg-overlay" />
        <div className="s2-gridlines" />
        <div className="feature-inner reveal">
          <div className="s2-label">03 — Projects</div>
          <div className="s2-feature">
            <div className="s2-feature-text">
              <div className="s2-title">Projects</div>
              <div className="s2-divider" />
              <div className="s2-desc">Creative direction, collaborative work, and things we built from scratch.</div>
              <div className="s2-featured-item">
                <div className="s2-featured-label">Featured Project</div>
                <div className="s2-featured-title">{featuredProject?.name || 'Coming Soon'}</div>
                <div className="s2-featured-meta">{featuredProject?.year || ''}</div>
              </div>
              <Link href={featuredProject ? `/projects/${featuredProject.slug.current}` : "/projects"} className="s2-link" style={{opacity:1}}>View Projects →</Link>
            </div>
            <div className="s2-feature-img" style={{backgroundImage:featuredProject?.imageUrl ? `url(${featuredProject.imageUrl})` : "url('/bg.png')"}} />
          </div>
        </div>
      </div>

      
      {/* ── ABOUT SECTION ── */}
      <div id="about" className="feature-section feature-section--bordered">
        <div className="feature-bg" style={{backgroundImage:"url('/bg.png')"}} />
        <div className="feature-bg-overlay" />
        <div className="s2-gridlines" />
        <div className="feature-inner reveal">
          <div className="s2-label">About</div>
          <div className="about-grid">
            <div className="about-text">
              <div className="s2-title">We Are<br />Xcursion</div>
              <div className="s2-divider" />
              <p className="s2-desc">Xcursion Studios is a lifestyle and creative brand built for those who move through the world with purpose. We sit at the intersection of movement, ambiance, and intentional living — creating objects, stories, and experiences that reflect a life well-curated.</p>
              <p className="s2-desc" style={{marginTop:'16px'}}>We don't follow trends. We document a way of living.</p>
            </div>
            <div className="about-details">
              <div className="about-detail-group">
                <div className="s2-num">Est.</div>
                <div className="about-detail-value">2024</div>
              </div>
              <div className="about-detail-group">
                <div className="s2-num">Location</div>
                <div className="about-detail-value">Your City, Country</div>
              </div>
              <div className="about-detail-group">
                <div className="s2-num">Instagram</div>
                <div className="about-detail-value">@xcursionstudios</div>
              </div>
              <div className="about-detail-group">
                <div className="s2-num">TikTok</div>
                <div className="about-detail-value">@xcursionstudios</div>
              </div>
              <div className="about-detail-group">
                <div className="s2-num">Contact</div>
                <div className="about-detail-value">hello@xcursionstudios.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <Link href="/" className="footer-logo"><img src="/logo.png" alt="Xcursion" style={{height:"28px",width:"auto"}} /></Link>
        <span className="footer-copy">© 2024 Xcursion Studios</span>
      </footer>
    </div>
  );
}
