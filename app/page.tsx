"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState(null);

  const productions = [
    {
      id: 1,
      title: "The Outsiders",
      venue: "The Old Globe",
      year: "2024",
      type: "Broadway Transfer",
      description: "A powerful adaptation of S.E. Hinton's classic novel, capturing the raw energy and emotional depth of teenage rebellion through cinematic storytelling and live performance documentation.",
      videoUrl: "https://www.youtube.com/embed/1EDuVkoy5rY"
    },
    {
      id: 2,
      title: "The Untitled Unauthorized Hunter S. Thompson Musical",
      venue: "La Jolla Playhouse",
      year: "2023",
      type: "World Premiere",
      description: "An electrifying musical journey through the mind of gonzo journalism's legendary figure, blending rock music, theatrical innovation, and immersive storytelling techniques.",
      videoUrl: "https://www.youtube.com/embed/1EDuVkoy5rY"
    },
    {
      id: 3,
      title: "Always Something There",
      venue: "Balboa Theatre",
      year: "2024",
      type: "Archival Documentation",
      description: "A meticulously preserved record of this contemporary theater piece, showcasing our expertise in capturing intimate theatrical moments with professional-grade equipment.",
      videoUrl: "https://www.youtube.com/embed/1EDuVkoy5rY"
    },
    {
      id: 4,
      title: "The Lorax",
      venue: "The Old Globe",
      year: "2018",
      type: "Archival Documentation",
      description: "Preserving the magic of this beloved Dr. Seuss adaptation, featuring innovative puppetry and environmental themes brought to life through expert cinematography.",
      videoUrl: "https://www.youtube.com/embed/1EDuVkoy5rY"
    }
  ];

  useEffect(() => {
    // Cursor tracking
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    if (cursor && ring) {
      const cursorEl = cursor;
      const ringEl = ring;

      document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;

        cursorEl.style.left = mx + 'px';
        cursorEl.style.top  = my + 'px';
      });

      function animateRing() {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        ringEl.style.left = rx + 'px';
        ringEl.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();
    }

    // Nav scroll
    const navbar = document.getElementById('navbar');

    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
      });
    }

    // Scroll reveal
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));


    // Parallax hero on scroll
    const heroBg = document.querySelector<HTMLElement>('.hero-bg');

    if (heroBg) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;

        if (y < window.innerHeight) {
          heroBg.style.transform = `scale(1.08) translateY(${y * 0.3}px)`;
        }
      }, { passive: true });
    }


    // Spotlight elements
    const spotlightOutlineWrapper = document.getElementById('spotlight-outline-wrapper');
    const spotlightFillBrightWrapper = document.getElementById('spotlight-fill-bright-wrapper');
    const spotlightCursorDot = document.getElementById('spotlight-cursor-dot');
    const spotlightScene = document.getElementById('spotlight-scene');

    if (
      !spotlightOutlineWrapper ||
      !spotlightFillBrightWrapper ||
      !spotlightCursorDot ||
      !spotlightScene
    ) return;

    const SPOTLIGHT_RADIUS = 180;

    let spotlightMouseX = -9999;
    let spotlightMouseY = -9999;

    let spotlightCurrentX = -9999;
    let spotlightCurrentY = -9999;

    let spotlightRaf: number;

    function spotlightLerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function spotlightUpdateMask() {
      if (!spotlightOutlineWrapper) return;

      const rect = spotlightOutlineWrapper.getBoundingClientRect();

      const relX = spotlightCurrentX - rect.left;
      const relY = spotlightCurrentY - rect.top;

      const gradient = `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${relX}px ${relY}px, black 0%, black 30%, transparent 100%)`;

      (spotlightFillBrightWrapper as HTMLElement).style.webkitMaskImage = gradient;
      (spotlightFillBrightWrapper as HTMLElement).style.maskImage = gradient;

      (spotlightOutlineWrapper as HTMLElement).style.webkitMaskImage = gradient;
      (spotlightOutlineWrapper as HTMLElement).style.maskImage = gradient;
    }

    function spotlightAnimate() {
      spotlightCurrentX = spotlightLerp(spotlightCurrentX, spotlightMouseX, 0.12);
      spotlightCurrentY = spotlightLerp(spotlightCurrentY, spotlightMouseY, 0.12);

      spotlightUpdateMask();

      (spotlightCursorDot as HTMLElement).style.left = spotlightMouseX + 'px';
      (spotlightCursorDot as HTMLElement).style.top = spotlightMouseY + 'px';

      spotlightRaf = requestAnimationFrame(spotlightAnimate);
    }

    document.addEventListener('mousemove', (e) => {
      spotlightMouseX = e.clientX;
      spotlightMouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      spotlightMouseX = -9999;
      spotlightMouseY = -9999;

      (spotlightCursorDot as HTMLElement).style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      (spotlightCursorDot as HTMLElement).style.opacity = '0.8';
    });

    spotlightAnimate();


    // Mobile menu toggle logic
    const navHamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if (navHamburger && mobileMenu && mobileMenuClose) {

      const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains('open');

        if (isOpen) {
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        } else {
          mobileMenu.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      };

      navHamburger.addEventListener('click', toggleMenu);
      mobileMenuClose.addEventListener('click', toggleMenu);

      mobileMenu.querySelectorAll<HTMLAnchorElement>('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
      });

      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
          toggleMenu();
        }
      });
    }
  });

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>

      {/* ══════════ NAV ══════════ */}
      <nav id="navbar">
        <a href="#" className="nav-logo"><span></span>Mark Holmes</a>
        {/* mobile hamburger toggle (appears on small screens) */}
        <button className="nav-hamburger" id="navHamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
        <ul className="nav-links">
          <li><a href="#showcase">Work</a></li>
          <li><a href="#capabilities">Services</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">San Diego</a></li>
        </ul>
        <button className="nav-cta" onClick={() => setIsModalOpen(true)}>Book a Production</button>
      </nav>

      {/* mobile menu overlay */}
      <div id="mobileMenu" className="mobile-menu">
        <button id="mobileMenuClose" className="mobile-menu-close" aria-label="Close menu">&times;</button>
        <ul className="mobile-links">
          <li><a href="#showcase">Work</a></li>
          <li><a href="#capabilities">Services</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">San Diego</a></li>
          <li><button className="nav-cta mobile-cta" onClick={() => setIsModalOpen(true)}>Book a Production</button></li>
        </ul>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-wings"></div>
        <div className="hero-grain"></div>

        <div className="hero-content">
          <div className="hero-label">San Diego · Broadway Bound Productions</div>
          <h1>
            LIVE PERFORMANCE
            <em>immortalized.</em>
          </h1>
          <p className="hero-sub">
            Capturing the electricity of live theatre. From San Diego's
            most celebrated stages to Broadway marquees.
          </p>
          <div className="hero-actions">
            <a href="#showcase" className="btn-primary"><span>View the Reel</span></a>
            <a href="#capabilities" className="btn-ghost">Our Services</a>
          </div>
        </div>

        {/* Floating credential strip across the bottom */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="stat-num">40+</div>
            <div className="stat-label">Productions Shot</div>
          </div>
          <div className="hero-stat">
            <div className="stat-num">12</div>
            <div className="stat-label">Broadway Transfers</div>
          </div>
          <div className="hero-stat">
            <div className="stat-num">4K</div>
            <div className="stat-label">Cinema RAW</div>
          </div>
          <div className="hero-stat">
            <div className="stat-num">15+</div>
            <div className="stat-label">Years on Stage</div>
          </div>
        </div>

      </section>

      {/* ══════════ SHOWCASE ══════════ */}
      <section id="showcase">
        <div className="section-header">
          <div>
            <div className="section-label reveal">Featured Productions</div>
            <h2 className="reveal reveal-delay-1">Capture <strong>the magic.</strong></h2>
          </div>
          <a href="#" className="reveal section-link">All Productions</a>
        </div>

        <div className="showcase-strip">
          <div className="showcase-card " onClick={() => { setSelectedProduction(productions[0]); setIsVideoModalOpen(true); }}>
            <img className="card-img" src="https://static01.nyt.com/images/2024/04/11/multimedia/11outisders-review1-jplc/11outisders-review1-jplc-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="The Outsiders" />
            <div className="card-overlay"></div>
            <div className="card-play">
              <svg width="14" height="16" viewBox="0 0 14 16"><path d="M0 0L14 8L0 16V0Z"/></svg>
            </div>
            <div className="card-meta">
              <span className="card-tag">The Old Globe · 2024</span>
              <div className="card-title">The Outsiders</div>
              <div className="card-year">Broadway Transfer</div>
            </div>
          </div>

          <div className="showcase-card  reveal-delay-1" onClick={() => { setSelectedProduction(productions[1]); setIsVideoModalOpen(true); }}>
            <img className="card-img" src="https://res.cloudinary.com/signature-theatre/image/upload/c_fill%2Cg_face%2Ch_1204%2Cw_2140/f_auto/q_auto/v1749741852/9.George_Abud_Nixon_and_the_cast_of_The_Untitled_Unauthorized_Hunter_S._Thompson_Musical_at_Signature_Theatre._Photo_by_Daniel_Rader?_a=BAAAV6DQ" alt="Hunter S. Thompson" />
            <div className="card-overlay"></div>
            <div className="card-play">
              <svg width="14" height="16" viewBox="0 0 14 16"><path d="M0 0L14 8L0 16V0Z"/></svg>
            </div>
            <div className="card-meta">
              <span className="card-tag">La Jolla Playhouse · 2023</span>
              <div className="card-title">The Untitled Unauthorized Hunter S. Thompson Musical</div>
              <div className="card-year">World Premiere</div>
            </div>
          </div>

          <div className="showcase-card  reveal-delay-2" onClick={() => { setSelectedProduction(productions[2]); setIsVideoModalOpen(true); }}>
            <img className="card-img" src="https://cdn.prod.website-files.com/6501ca9890bd9fd3f1044d12/685c0bbfa8c73ffbaac06110_Press%20Photo%20%2318.avif" alt="Always Something There" />
            <div className="card-overlay"></div>
            <div className="card-play">
              <svg width="14" height="16" viewBox="0 0 14 16"><path d="M0 0L14 8L0 16V0Z"/></svg>
            </div>
            <div className="card-meta">
              <span className="card-tag">Balboa Theatre · 2024</span>
              <div className="card-title">Always Something There</div>
              <div className="card-year">Archival Documentation</div>
            </div>
          </div>

          <div className="showcase-card  reveal-delay-3" onClick={() => { setSelectedProduction(productions[3]); setIsVideoModalOpen(true); }}>
            <img className="card-img" src="https://www.theoldglobe.org/link/1dd6434ca76e4389b300dc5a0a79335e.aspx" alt="The Lorax" />
            <div className="card-overlay"></div>
            <div className="card-play">
              <svg width="14" height="16" viewBox="0 0 14 16"><path d="M0 0L14 8L0 16V0Z"/></svg>
            </div>
            <div className="card-meta">
              <span className="card-tag">The Old Globe · 2018</span>
              <div className="card-title">The Lorax</div>
              <div className="card-year">Archival Documentation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CAPABILITIES ══════════ */}
      <section id="capabilities">
        <div className="section-header" style={{padding:0, marginBottom:0}}>
          <div>
            <div className="section-label reveal">Technical Excellence</div>
            <h2 className="reveal reveal-delay-1">Crafted for the<br /><strong>Broadway standard.</strong></h2>
          </div>
        </div>

        <div className="capabilities-grid">
          <div className="cap-visual reveal">
            <img src="https://images.unsplash.com/photo-1645548979753-8fd5fd389aa2?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Camera in theatre" />
            <div className="cap-visual-badge">
              <div className="badge-num">4K</div>
              <div className="badge-text">Cinema-grade<br />capture · RAW</div>
            </div>
          </div>

          <div className="cap-content">
            <div className="cap-list">
              <div className="cap-item reveal">
                <div className="cap-num">01</div>
                <div>
                  <div className="cap-item-title">Live Performance Videography</div>
                  <p className="cap-item-desc">Multi-camera 4K RAW capture of full productions, seamlessly edited to preserve every breath, pause, and crescendo of the performance.</p>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-1">
                <div className="cap-num">02</div>
                <div>
                  <div className="cap-item-title">Archival & Documentation</div>
                  <p className="cap-item-desc">Broadcast-quality archival footage created for producers, directors, and Tony Award submission packages.</p>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-2">
                <div className="cap-num">03</div>
                <div>
                  <div className="cap-item-title">Production Photography</div>
                  <p className="cap-item-desc">Still photography for press kits, playbills, marketing campaigns, and the iconic editorial moments that define a production.</p>
                </div>
              </div>
              <div className="cap-item reveal reveal-delay-3">
                <div className="cap-num">04</div>
                <div>
                  <div className="cap-item-title">Promotional Trailers</div>
                  <p className="cap-item-desc">Cinematic short-form trailers that capture the visceral energy of your show and drive audiences to the box office.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA STRIP ══════════ */}
      <section id="cta">
        <div className="cta-text reveal">
          <h3>Your next production<br />deserves to be remembered.</h3>
          <p>Based in San Diego · Available for Broadway & national touring engagements</p>
        </div>
        <a href="#" className="btn-dark reveal reveal-delay-2">Start a Conversation</a>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer>

        {/* Upper: brand + nav columns */}
        <div className="footer-upper">

          <div className="footer-brand reveal">
            <a href="#" className="footer-logo">
              <div className="footer-logo-dot"></div>MARK HOLMES
            </a>
            <p className="footer-tagline">
              Theatre cinematography for productions that demand to be remembered.
            </p>
            <div className="footer-socials">
              {/* Instagram */}
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* Vimeo */}
              <a href="#" className="social-link" aria-label="Vimeo">
                <svg width="15" height="15" viewBox="0 0 24 24"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="social-link" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col reveal reveal-delay-1">
            <div className="footer-col-title">Work</div>
            <ul>
              <li><a href="#">Productions</a></li>
              <li><a href="#">Photography</a></li>
              <li><a href="#">Trailers & Reels</a></li>
              <li><a href="#">Archival</a></li>
              <li><a href="#">Press Kit</a></li>
            </ul>
          </div>

          <div className="footer-col reveal reveal-delay-2">
            <div className="footer-col-title">Studio</div>
            <ul>
              <li><a href="#">About Mark Holmes</a></li>
              <li><a href="#">Our Process</a></li>
              <li><a href="#">Equipment</a></li>
              <li><a href="#">Clients</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>

          <div className="footer-col reveal reveal-delay-3">
            <div className="footer-col-title">Contact</div>
            <ul>
              <li><a href="#">Book a Production</a></li>
              <li><a href="#">markholmes@gmail.com</a></li>
              <li><a href="#">+1 619 555 0142</a></li>
              <li><a href="#">San Diego, CA</a></li>
            </ul>
          </div>

        </div>

        {/* Awards / recognition strip */}
        <div className="footer-awards reveal">
          <div className="award-badge">
            <div className="award-icon">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            </div>
            <div className="award-info">
              <div className="award-name">La Jolla Playhouse Partner</div>
              <div className="award-body">Official Media Vendor · 2019–Present</div>
            </div>
          </div>
          <div className="award-badge">
            <div className="award-icon">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            </div>
            <div className="award-info">
              <div className="award-name">The Old Globe Theatre</div>
              <div className="award-body">Preferred Cinematographer · 2017–Present</div>
            </div>
          </div>
          <div className="award-badge">
            <div className="award-icon">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            </div>
            <div className="award-info">
              <div className="award-name">San Diego Theatre Critics Circle</div>
              <div className="award-body">Outstanding Media Production · 2022</div>
            </div>
          </div>
          <div className="award-badge">
            <div className="award-icon">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            </div>
            <div className="award-info">
              <div className="award-name">Broadway League Member</div>
              <div className="award-body">Certified Archival Producer</div>
            </div>
          </div>
        </div>

        {/* Lower: legal strip */}
        <div className="footer-lower">
          <div className="footer-copy">© 2025 <span>Mark Holmes</span> Studio. All rights reserved.</div>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Licensing</a>
          </div>
          <div className="footer-location">San Diego, California</div>
        </div>

        <div className="spotlight-background-wrapper">

          <img
            className="spotlight-background"
            id="spotlight-bg"
            src="/bottom-gradient-gold.jpg"
            alt="spotlight background"
            draggable="false"
          />
        </div>

        <div className="spotlight-scene" id="spotlight-scene">

          {/* Fill layer */}
          <img
            className="spotlight-text-fill"
            id="spotlight-fill-img"
            src="/spotlight-text-fill.png"
            alt="text fill"
            draggable="false"
          />

          {/* Bright fill layer revealed by spotlight mask */}
          <div className="spotlight-fill-bright-wrapper" id="spotlight-fill-bright-wrapper">
            <img
              className="spotlight-text-fill-bright"
              src="/spotlight-text-fill.png"
              alt="text fill bright"
              draggable="false"
            />
          </div>

          {/* Outline layer revealed by spotlight mask */}
          <div className="spotlight-outline-wrapper" id="spotlight-outline-wrapper">
            <img
              className="spotlight-text-outline"
              src="/spotlight-text-outline.png"
              alt="text outline"
              draggable="false"
            />
          </div>
        </div>

        <div className="spotlight-cursor-dot" id="spotlight-cursor-dot"></div>

      </footer>

      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={() => setIsModalOpen(false)}>
        <div className="modal-content p-8" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
          <form className="modal-form">
            <h2>Book a Production</h2>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit" className="btn-primary">Submit</button>
          </form>
        </div>
      </div>

      {/* Video Modal */}
      <div className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVideoModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsVideoModalOpen(false)}>
        <div className={`bg-black rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden relative transition-all duration-500 ${isVideoModalOpen ? 'translate-y-0' : 'translate-y-8'}`} onClick={(e) => e.stopPropagation()}>
          <button className="absolute top-4 right-4 text-white hover:text-[#f2be60] text-2xl z-50 w-8 h-8 flex items-center justify-center transition-colors" onClick={() => setIsVideoModalOpen(false)}>&times;</button>

          {selectedProduction ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
              {/* Production Info Section */}
              <div className="lg:col-span-2 bg-black p-8 lg:p-12 flex flex-col justify-center border-r border-[#f2be60]/10">
                <div className="mb-8">
                  <span className="text-[#f2be60] text-xs font-medium tracking-wider uppercase mb-4 block">{selectedProduction.venue} · {selectedProduction.year}</span>
                  <h2 className="text-white text-3xl lg:text-4xl font-serif font-normal leading-tight mb-3">{selectedProduction.title}</h2>
                  <span className="text-gray-400 text-sm font-medium tracking-wide uppercase">{selectedProduction.type}</span>
                </div>

                <div className="mb-10">
                  <p className="text-gray-300 text-base leading-relaxed">{selectedProduction.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-[#f2be60] text-sm font-medium tracking-wide uppercase">Venue</span>
                    <span className="text-white text-sm">{selectedProduction.venue}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-800">
                    <span className="text-[#f2be60] text-sm font-medium tracking-wide uppercase">Year</span>
                    <span className="text-white text-sm">{selectedProduction.year}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-800 last:border-b-0">
                    <span className="text-[#f2be60] text-sm font-medium tracking-wide uppercase">Type</span>
                    <span className="text-white text-sm">{selectedProduction.type}</span>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className="lg:col-span-3 bg-[#0D0C0B] flex items-center justify-center p-8">
                <div className="w-full max-w-2xl aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg shadow-2xl"
                    src={selectedProduction.videoUrl}
                    title={`${selectedProduction.title} - YouTube video player`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[400px] text-white">
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
