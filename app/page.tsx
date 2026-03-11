"use client";

import { useEffect, useState, useRef } from 'react';
import StickyTextScroll from './components/StickyTextScroll';
import BookingModal from './components/BookingModal';

export default function Home() {
  type Production = {
    id: number
    title: string
    venue: string
    year: string
    type: string
    description: string
    videoUrl: string
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState<Production | null>(null);

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

  // About us

  const THEATRES = [
    {
      name: "The Old Globe",
      location: "Balboa Park, San Diego",
      role: "Primary Videographer",
      productions: [
        { title: "The Outsiders", year: "2024", note: "Broadway Transfer" },
        { title: "The Lorax", year: "2018", note: "Archival" },
        { title: "Sense & Sensibility", year: "2019", note: "World Premiere" },
        { title: "Into the Woods", year: "2022", note: "Promotional" },
        { title: "The Merry Wives of Windsor", year: "2023", note: "Documentation" },
      ],
    },
    {
      name: "La Jolla Playhouse",
      location: "UC San Diego Campus",
      role: "Documentary & Promo",
      productions: [
        { title: "The Untitled Unauthorized Hunter S. Thompson Musical", year: "2023", note: "World Premiere" },
        { title: "Swept Away", year: "2023", note: "Broadway Transfer" },
        { title: "Bhangin' It", year: "2019", note: "World Premiere" },
        { title: "Once On This Island", year: "2020", note: "Archival" },
        { title: "Cambodian Rock Band", year: "2021", note: "Documentary" },
      ],
    },
    {
      name: "Cygnet Theatre",
      location: "Old Town, San Diego",
      role: "Archival & Interviews",
      productions: [
        { title: "Always Something There", year: "2024", note: "Archival" },
        { title: "Spring Awakening", year: "2022", note: "Documentation" },
        { title: "Passing Strange", year: "2021", note: "Promotional" },
        { title: "Cabaret", year: "2019", note: "Archival" },
        { title: "Fun Home", year: "2023", note: "Documentation" },
      ],
    },
  ];

  const CAPABILITIES = [
    { label: "4K Cinema RAW", icon: "◈" },
    { label: "Multi-Camera", icon: "◈" },
    { label: "B-Roll Coverage", icon: "◈" },
    { label: "Promotional Edits", icon: "◈" },
    { label: "Cast Interviews", icon: "◈" },
    { label: "Archival Documentation", icon: "◈" },
    { label: "Colour Grading", icon: "◈" },
    { label: "Testimonial Reels", icon: "◈" },
  ];

  const TICKER_ITEMS = [
    "The Outsiders · Broadway Transfer",
    "La Jolla Playhouse · 2026",
    "The Old Globe · 15 Years",
    "Hunter S. Thompson Musical · World Premiere",
    "4K Cinema RAW · Multi-Camera",
    "Cygnet Theatre · Old Town",
    "Archival · Documentary · Promotional",
    "Swept Away · Broadway Transfer",
    "San Diego's Premier Theatre Videographer",
  ];

  // Cap items scroll
  const CAP_ITEMS = [
    {
      num: "01",
      title: "Live Performance Videography",
      desc: "Multi-camera 4K RAW capture of full productions, seamlessly edited to preserve every breath, pause, and crescendo of the performance.",
      image: "audience.jpg",
    },
    {
      num: "02",
      title: "Archival & Documentation",
      desc: "Broadcast-quality archival footage created for producers, directors, and Tony Award submission packages.",
      image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?q=80&w=1071&auto=format&fit=crop",
    },
    {
      num: "03",
      title: "Production Photography",
      desc: "Still photography for press kits, playbills, marketing campaigns, and the iconic editorial moments that define a production.",
      image: "https://images.unsplash.com/photo-1645548979753-8fd5fd389aa2?q=80&w=1071&auto=format&fit=crop",
    },
    {
      num: "04",
      title: "Promotional Trailers",
      desc: "Cinematic short-form trailers that capture the visceral energy of your show and drive audiences to the box office.",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1071&auto=format&fit=crop",
    },
  ];

  // Add this state alongside your existing ones
  const [listTranslateY, setListTranslateY] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const totalTravelRef = useRef(0);

  useEffect(() => {
    const calculateTravel = () => {
      const listEl = listRef.current;
      if (!listEl) return;
      const items = listEl.querySelectorAll<HTMLElement>(".cap-item");
      if (items.length > 1) {
        totalTravelRef.current =
          items[items.length - 1].offsetTop - items[0].offsetTop;
      }
    };

    calculateTravel();
    window.addEventListener("resize", calculateTravel);
    return () => window.removeEventListener("resize", calculateTravel);
  }, []);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      // Cancel any pending frame — only process the latest scroll position
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const el = trackRef2.current;
        if (!el) return;

        const scrolledIn = -el.getBoundingClientRect().top;

        if (scrolledIn <= 0) {
          setActiveIndex(0);
          if (listRef.current) {
            listRef.current.style.transform = "translateY(0px)";
          }
          return;
        }

        const progress = Math.min(scrolledIn / SCROLLER_HEIGHT, 1);

        const newIndex = Math.min(
          Math.floor(progress * CAP_ITEMS.length),
          CAP_ITEMS.length - 1
        );
        setActiveIndex(newIndex); // still fine — cheap index comparison

        // Write transform directly to DOM, zero React overhead
        if (listRef.current) {
          const y = -progress * totalTravelRef.current;
          listRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // How many px of scroll each item stays active — tune this freely
  const PX_PER_ITEM = 550;
  const SCROLLER_HEIGHT = CAP_ITEMS.length * PX_PER_ITEM;

  const trackRef2 = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(CAP_ITEMS[0].image);
  const [imgFading, setImgFading] = useState(false);

  // Crossfade image when active item changes
  // useEffect(() => {
  //   const next = CAP_ITEMS[activeIndex].image;
  //   if (next === imgSrc) return;
  //   setImgFading(true);
  //   const t = setTimeout(() => {
  //     setImgSrc(next);
  //     setImgFading(false);
  //   }, 50);
  //   return () => clearTimeout(t);
  // }, [activeIndex]);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef2.current;
      if (!el) return;

      // scrolledIn = how far the track's top edge has passed above the viewport top
      // 0 = just reached top of screen, positive = scrolling through scroller budget
      const scrolledIn = -el.getBoundingClientRect().top;

      if (scrolledIn <= 0) {
        setActiveIndex(0);
        return;
      }

      const newIndex = Math.min(
        Math.floor((scrolledIn / SCROLLER_HEIGHT) * CAP_ITEMS.length),
        CAP_ITEMS.length - 1
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ticker state machine
  const trackRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);
  const SLIDE_MS = 1400;

  // const highlightActive = (items: HTMLElement[], step: number) => {
  //   items.forEach((el, i) => el.classList.remove('ticker-item--active'));
  //   items[step % (items.length / 2)]?.classList.add('ticker-item--active');
  //   // also highlight the duplicate
  //   items[step % (items.length / 2) + items.length / 2]?.classList.add('ticker-item--active');
  // };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = `transform ${SLIDE_MS}ms ease`;

    const interval = setInterval(() => {
      const items = Array.from(track.children) as HTMLElement[];
      const n = items.length / 2;

      stepRef.current += 1;

      let offset = 0;
      for (let i = 0; i < stepRef.current; i++) {
        offset += items[i].offsetWidth;
      }
      track.style.transform = `translateX(-${offset}px)`;
      // highlightActive(items, stepRef.current);  // highlight after each step

      if (stepRef.current >= n) {
        setTimeout(() => {
          track.style.transition = 'none';
          track.style.transform = 'translateX(0)';
          stepRef.current = 0;
          // highlightActive(items, 0);  // ← reset highlight on snap back
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              track.style.transition = `transform ${SLIDE_MS}ms ease-in-out`;
            })
          );
        }, SLIDE_MS);
      }
    }, SLIDE_MS + 1000);// slide duration + hold delay

    return () => clearInterval(interval);
  }, []);

  // Intersection observer for about section reveal

  const [activeTheatre, setActiveTheatre] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

    // prevent scroll when modal open
  useEffect(() => {
    if (isVideoModalOpen || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup in case component unmounts while modal is open
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoModalOpen, isModalOpen]);

  useEffect(() => {
    // Cursor tracking
    // const cursor = document.getElementById('cursor');
    // const ring = document.getElementById('cursorRing');
    // let mx = 0, my = 0, rx = 0, ry = 0;

    // if (cursor && ring) {
    //   const cursorEl = cursor;
    //   const ringEl = ring;

    //   document.addEventListener('mousemove', (e) => {
    //     mx = e.clientX;
    //     my = e.clientY;

    //     cursorEl.style.left = mx + 'px';
    //     cursorEl.style.top  = my + 'px';
    //   });

    //   function animateRing() {
    //     rx += (mx - rx) * 0.14;
    //     ry += (my - ry) * 0.14;
    //     ringEl.style.left = rx + 'px';
    //     ringEl.style.top  = ry + 'px';
    //     requestAnimationFrame(animateRing);
    //   }
    //   animateRing();
    // }

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Bebas+Neue&family=Jost:wght@300;400;500&display=swap');

        :root {
          --black: #080808;
          --off-white: #F5F0E8;
          --gold: #C8A96E;
          --gold-light: #dfc08a;
          --muted: #8a8279;
          --light-gray: #BDB9B3;
        }

        #about-section {
          background: var(--deep);
          font-family: 'Jost', sans-serif;
          color: var(--off-white);
          position: relative;
          overflow: hidden;
        }

        #about-section:before {
            content: "SAN DIEGO";
            color: #c8a96e1a;
            letter-spacing: .08em;
            pointer-events: none;
            white-space: nowrap;
            font-family: Bebas Neue, sans-serif;
            font-size: clamp(80px, 14vw, 200px);
            position: absolute;
            top: clamp(60px, 20vw, 80px);
            right: -20px;
        }

        .about-section-inner {
          padding: 80px 60px 40px;
        }

        #about-section .bio-wrapper {
          display: flex;
          column-gap: 40px;
        }

        #about-section .bio {
          justify-content: flex-start;
          text-align: left;
          width: 100%;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        #about-section .bio p {
          font-size: clamp(14px, 5vw, 16px);
          font-weight: 300;
          color: var(--light-gray);
          margin: 0;
          letter-spacing: 0.03em;
          max-width: 800px;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          #about-section:before {
            left: 50%;
            transform: translateX(-50%);
            top:clamp(700px, 5vw, 800px);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .about-section-inner {
            padding: 40px 24px 40px;
          }

          #about-section .bio-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            justify-content: center;
          }

          #about-section .bio {
            font-size: clamp(60px, 14vw, 160px);
            top: clamp(40px, 20vw, 60px);
            align-items: center;
            text-align: center;
            margin-bottom: 0 !important;
            flex-wrap: wrap;
          }
        }

        /* ── Ticker ── */
        .ticker-wrap {
          overflow: hidden;
          position: relative;
          padding: 24px 0;
          border-top: 1px solid var(--gold-dim);
          border-bottom: 1px solid var(--gold-dim);
        }

        .ticker-item {
          display: inline-block;
          white-space: nowrap;
        }

        /* Slide in from right */
        .ticker-item--enter {
          animation: slideIn 0.4s ease forwards;
        }

        /* Hold in place — no animation needed, just sits there */
        .ticker-item--hold {
          transform: translateX(0);
        }

        /* Slide out to left */
        .ticker-item--exit {
          animation: slideOut 0.1s ease forwards;
        }


          .ticker-track {
            display: flex;
            gap: 0;
            width: max-content;
            margin-left: 60px;
          }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 30px;
          padding-right: 30px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-light);
          white-space: nowrap;
          font-weight: 100;
        }

        .ticker-item--active {
          color: var(--light-gray);
          font-weight: 500;
        }

        .ticker-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(200,169,110,0.4);
          flex-shrink: 0;
        }

        /* ── Portrait ── */
        .portrait-ring {
          width: 148px; height: 148px;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(
            rgba(200,169,110,0.7) 0deg,
            rgba(200,169,110,0.1) 180deg,
            rgba(200,169,110,0.7) 360deg
          );
          position: relative;
        }
        .portrait-inner {
          width: 100%; height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: #111;
          position: relative;
        }
        .portrait-inner img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(20%) contrast(1.06) sepia(6%);
          display: block;
        }
        .portrait-inner::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(200,169,110,0.1), transparent 60%);
        }

        /* ── Theatre tabs ── */
        .theatre-tab {
          flex: 1;
          padding: 22px 28px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s;
          position: relative;
        }
        .theatre-tab.active {
          border-bottom-color: var(--gold);
          background: rgba(200,169,110,0.04);
        }
        .theatre-tab:hover:not(.active) {
          background: rgba(255,255,255,0.02);
        }
        .tab-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 400;
          color: var(--off-white);
          display: block;
          margin-bottom: 4px;
          transition: color 0.3s;
        }
        .theatre-tab.active .tab-name { color: var(--gold-light); }
        .tab-location {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
          display: block;
        }

        /* ── Production list ── */
        .prod-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          gap: 16px;
          opacity: 0;
          transform: translateY(8px);
          animation: fadeSlide 0.35s forwards;
        }
        .prod-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 300;
          color: var(--off-white);
          flex: 1;
          min-width: 0;
        }
        .prod-year {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.12em;
          flex-shrink: 0;
        }
        .prod-note {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          border: 1px solid rgba(200,169,110,0.22);
          padding: 3px 10px;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .prod-more {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(200,169,110,0.45);
          padding: 16px 0 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .prod-more::before {
          content: '';
          display: inline-block;
          width: 20px; height: 1px;
          background: rgba(200,169,110,0.3);
        }
        /* ── Capability pills ── */
        .cap-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: clamp(10px, 1.8vw, 12px);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--off-white);
          border: 1px solid rgba(200,169,110,0.14);
          padding: 8px 16px;
          transition: all 0.3s;
          cursor: default;
        }
        .cap-pill:hover {
          color: var(--gold-light);
          border-color: rgba(200,169,110,0.4);
          background: rgba(200,169,110,0.05);
        }
        .cap-pill-icon {
          color: var(--gold);
          font-size: 8px;
        }

        /* ── Reveal animation ── */
        .reveal-about {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-about.in {
          opacity: 1;
          transform: none;
        }

        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeSlide {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Custom cursor */}
      {/* <div className="cursor" id="cursor"></div> */}
      {/* <div className="cursor-ring" id="cursorRing"></div> */}

      {/* ══════════ NAV ══════════ */}
      <nav id="navbar">
        <a href="#" className="nav-logo"><span></span>Mark Holmes</a>
        {/* mobile hamburger toggle (appears on small screens) */}
        <button className="nav-hamburger" id="navHamburger" aria-label="Open menu">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <ul className="nav-links">
          <li><a href="#showcase">Work</a></li>
          <li><a href="#capabilities">Services</a></li>
          <li><a href="#about-section">About</a></li>
          <li><a href="#about-section">San Diego</a></li>
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
          <div className="showcase-card reveal" onClick={() => { setSelectedProduction(productions[0]); setIsVideoModalOpen(true); }}>
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

          <div className="showcase-card reveal reveal-delay-1" onClick={() => { setSelectedProduction(productions[1]); setIsVideoModalOpen(true); }}>
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

          <div className="showcase-card reveal reveal-delay-2" onClick={() => { setSelectedProduction(productions[2]); setIsVideoModalOpen(true); }}>
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

          <div className="showcase-card reveal reveal-delay-3" onClick={() => { setSelectedProduction(productions[3]); setIsVideoModalOpen(true); }}>
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

      <StickyTextScroll />


      {/* ══════════ ABOUT ══════════ */}
      <section id="about-section" ref={sectionRef} className="snap-y snap-mandatory overflow-y-scroll">
        <div className="ticker-wrap">
          <div className="ticker-track" ref={trackRef}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                className={`ticker-item`}
                key={i}
              >
                {item}<span className="ticker-dot" />
              </span>
            ))}
          </div>
        </div>
        {/* ── Main content ── */}
        <div className="about-section-inner snap-always snap-start">

          {/* ── Portrait + identity block ── */}
          <div className="bio-wrapper">
            <div
              className={`reveal bio`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                transitionDelay: "0.1s",
                flexWrap: "wrap",
              }}
            >
              <div className="portrait-ring">
                <div className="portrait-inner">
                  <img
                    src="https://i.vimeocdn.com/portrait/59559255_288x288"
                    alt="Mark Holmes"
                  />
                </div>
              </div>

              <div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.4em",
                  color: "var(--gold)",
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}>
                  San Diego's Theatre Videographer
                </div>

                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(40px, 5vw, 68px)",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "var(--off-white)",
                  margin: "0 0 8px",
                  letterSpacing: "0.02em",
                }}>
                  Mark Holmes
                </h2>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(16px, 5.4vw, 20px)",
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: "var(--light-gray)",
                  marginTop: '0px',
                }}>

                  For over 15 years, we've captured the heart of live performance in 4K.
                </p>

                <p className="!pt-4">
                  Based in San Diego, our collaborations include the Old Globe, La Jolla
                  Playhouse, North Coast Rep, and more, bringing the magic of the stage
                  to screens worldwide. Together, we can immortalize your next production in
                  cinema-quality format.
                </p>
                <p>
                  Beyond the camera, Mark is the co-founder of{" "}
                  <span style={{ color: "var(--off-white)" }}>Daisy 3 Pictures</span>{" "}
                  alongside director James Vásquez and actress Carrie Preston, the
                  production company behind{" "}
                  <em>29th and Gay</em>, <em>Ready? OK!</em>, and{" "}
                  <em>That's What She Said</em>.
                </p>
              </div>

              {/* Stat row */}

            </div>

            <div
            style={{ display: "flex", alignSelf: "center"}}
            className="reveal reveal-delay-2 justify-center md:justify-end text-nowrap margin-bottom-0">
              <a href="#contact" style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--black)",
                background: "var(--gold)",
                padding: "14px 42px",
                textDecoration: "none",
                display: "inline-block",
                fontWeight: 400,
              }} className="hover:scale-105 transition-transform"
              onClick={() => setIsModalOpen(true)}>
                Work With Mark
              </a>
            </div>
          </div>


          <div
            className={`${visible ? "in" : ""}`}
            style={{
              transitionDelay: "0.28s",
            }}
          >


            {/* ── Capabilities ── */}
            <div
              className={`reveal ${visible ? "in" : ""}`}
              style={{ marginTop: 50, marginBottom: 70 }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginBottom: 40,
              }}>
                <div style={{ flex: 1, height: 1, background: "rgba(200,169,110,0.1)" }} />
                <span style={{
                  fontSize: 10,
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}>Videography & Editing</span>
                <div style={{ flex: 1, height: 1, background: "rgba(200,169,110,0.1)" }} />
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", rowGap: "clamp(10px, 5vw, 20px)", columnGap: "clamp(2px, 15vw, 20px)",
                justifyContent: "center", margin: "0 auto", maxWidth: 900, }}>
                {CAPABILITIES.map((c, i) => (
                  <div className="cap-pill" key={i}>
                    <span className="cap-pill-icon">{c.icon}</span>
                    {c.label}
                  </div>
                ))}
              </div>
            </div>


            <style>{`
              .theatre-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                padding: 8px 0;
                max-width: 1000px;
                margin: 0 auto;
              }
              .theatre-card {
                flex: 1 1 200px;
                padding: 28px 32px;
                border: 1px solid rgba(200,169,110,0.0);
                position: relative;
                overflow: hidden;
                cursor: default;
                transition: border-color 0.4s, transform 0.35s cubic-bezier(.16,1,.3,1);
                justify-content: flex-start;
                align-items: center;
                display: flex;
                flex-direction: column;
                text-align: center;
              }
              .theatre-card::before {
                content: '';
                position: absolute; inset: 0;
                background: linear-gradient(135deg, rgba(200,169,110,0.09) 0%, rgba(200,169,110,0.03) 100%);
                opacity: 0;
                transition: opacity 0.4s;
              }
              .theatre-card:hover { border-color: rgba(200,169,110,0.45); transform: translateY(-2px); }
              .theatre-card:hover::before { opacity: 1; }

              .theatre-card-name {
                font-size: clamp(9px, 2vw, 10px);
                font-weight: 500;
                color: var(--muted);
                line-height: 1.15;
                margin-bottom: 5px;
                position: relative; z-index: 1;
                transition: color 0.35s;
                letter-spacing: 0.2em;
                text-transform: uppercase;
              }
              .theatre-card:hover .theatre-card-name { color: var(--gold-light); }

              .theatre-card-location {
                font-size: 9px;
                letter-spacing: 0.28em;
                text-transform: uppercase;
                color: var(--muted);
                position: relative; z-index: 1;
                transition: color 0.35s;
              }
              .theatre-card:hover .theatre-card-location { color: rgba(200,169,110,0.6); }

              .theatre-card-dot {
                position: absolute;
                top: 16px; right: 16px;
                width: 5px; height: 5px;
                border-radius: 50%;
                background: rgba(200,169,110,0.2);
                transition: background 0.35s, box-shadow 0.35s;
                z-index: 1;
                display: none;
              }
              .theatre-card:hover .theatre-card-dot {
                background: var(--gold);
                box-shadow: 0 0 8px rgba(200,169,110,0.5);
              }
            `}</style>


            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 40,
            }} className="reveal">
              <div style={{ flex: 1, height: 1, background: "rgba(200,169,110,0.1)" }} />
              <span style={{
                fontSize: 10,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}>Theatres We Work With</span>
              <div style={{ flex: 1, height: 1, background: "rgba(200,169,110,0.1)" }} />
            </div>

            <div className="theatre-grid reveal"
            style={{ transitionDelay: "0.35s" }}>
              {[
                {
                  name: "The Old Globe",
                  location: "Balboa Park · San Diego",
                  logo: "https://www.theoldglobe.org/globalassets/old_globe_logo_white.svg",
                },
                {
                  name: "La Jolla Playhouse",
                  location: "UC San Diego Campus",
                  logo: "https://lajollaplayhouse.org/wp-content/themes/lajollaplayhouse2/media/svg/logo.svg",
                },
                {
                  name: "Cygnet Theatre",
                  location: "Old Town · San Diego",
                  logo: "https://cygnettheatre.org/wp-content/themes/cygnet_theatre/assets/img/logo.svg",
                },
                {
                  name: "San Diego Musical Theatre",
                  location: "Mission Valley · San Diego",
                  logo: "https://www.sdmt.org/wp-content/uploads/2016/08/sdmt-logo.png",
                },
              ].map((t, i) => (
                <div className="theatre-card" key={i}>
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 64,
                    marginBottom: 16,
                  }}>
                    <img
                      src={t.logo}
                      alt={`${t.name} logo`}
                      style={{
                        maxHeight: 56,
                        maxWidth: "100%",
                        width: "100%",
                        objectFit: "contain",
                        filter: "brightness(0) invert(1)",
                        opacity: 0.85,
                      }}
                    />
                  </div>
                  <div className="theatre-card-dot" />
                  <div className="theatre-card-name">{t.name}</div>
                  <div className="theatre-card-location">{t.location}</div>
                </div>
              ))}
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
        <button className="btn-dark reveal reveal-delay-2"
        onClick={() => setIsModalOpen(true)}
        >Start a Conversation</button>
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
      {/* <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={() => setIsModalOpen(false)}>
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
      </div> */}
      <BookingModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Video Modal */}
      <div className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVideoModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsVideoModalOpen(false)}>
        <div className={`bg-black rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative transition-all duration-500 ${isVideoModalOpen ? 'translate-y-0' : 'translate-y-8'}`} onClick={(e) => e.stopPropagation()}>
          <button className="absolute top-4 right-4 text-white hover:text-[#f2be60] text-2xl z-50 w-8 h-8 flex items-center justify-center transition-colors" onClick={() => setIsVideoModalOpen(false)}>&times;</button>

            {selectedProduction ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', minHeight: '520px' }}
                    className="modal-inner-grid">

                  {/* ── LEFT: Info ── */}
                  <div style={{
                    padding: '3rem 3rem 2.5rem',
                    borderBottom: '1px solid rgba(242,190,96,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                  }}
                    className="modal-info-pane"
                  >
                    {/* eyebrow */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '18px',
                        height: '1px',
                        background: '#f2be60',
                        flexShrink: 0,
                      }} />
                      <span style={{
                        color: '#f2be60',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                      }}>
                        {selectedProduction.venue} &nbsp;·&nbsp; {selectedProduction.year}
                      </span>
                    </div>

                    {/* title */}
                    <h2 style={{
                      margin: '0 0 0.35rem',
                      fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                      fontWeight: 400,
                      lineHeight: 1.15,
                      color: '#F5F0E8',
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      letterSpacing: '-0.01em',
                    }}>
                      {selectedProduction.title}
                    </h2>

                    {/* type badge */}
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'rgba(255,255,255,0.35)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      marginBottom: '1.75rem',
                    }}>
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: 'rgba(242,190,96,0.5)', flexShrink: 0,
                      }} />
                      {selectedProduction.type}
                    </span>

                    {/* description */}
                    <p style={{
                      margin: '0 0 2rem',
                      color: 'rgba(245,240,232,0.55)',
                      fontSize: '0.875rem',
                      lineHeight: 1.75,
                      maxWidth: '42ch',
                    }}>
                      {selectedProduction.description}
                    </p>

                    {/* meta table */}
                    <div style={{
                      marginTop: 'auto',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      paddingTop: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0',
                    }}>
                      {[
                        { label: 'Venue', value: selectedProduction.venue },
                        { label: 'Year',  value: selectedProduction.year  },
                        { label: 'Type',  value: selectedProduction.type  },
                      ].map(({ label, value }) => (
                        <div key={label} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem 0',
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                        }}>
                          <span style={{
                            color: 'rgba(242,190,96,0.6)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                          }}>
                            {label}
                          </span>
                          <span style={{
                            color: 'rgba(245,240,232,0.7)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.02em',
                          }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── RIGHT: Video ── */}
                  <div style={{
                    background: '#050504',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem',
                  }}
                    className="modal-video-pane"
                  >
                    <div style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '1px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      <iframe
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        src={isVideoModalOpen ? selectedProduction.videoUrl : ''}
                        title={`${selectedProduction.title} – video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                </div>
            ) : (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: '400px', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem',
              }}>
                Loading…
              </div>
          )}
        </div>
      </div>
    </>
  );
}
