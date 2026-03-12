import { useEffect, useRef } from "react";

const LERP_FACTOR = 0.07;
const ITEM_HEIGHT_REM = 9;
const ITEM_GAP_REM = 10;
// How many px of page scroll per px of list travel (higher = slower, more deliberate)
const SCROLL_MULTIPLIER = 2.2;

const ITEMS = [
  {
    id: 1,
    num: "01",
    title: "Live Performance Videography",
    desc: "Multi-camera 4K RAW capture of full productions, seamlessly edited to preserve every breath, pause, and crescendo of the performance.",
    image: "stage-dancers.jpg",
    className: "h_intro_p is-1",
  },
  {
    id: 2,
    num: "02",
    title: "Archival & Documentation",
    desc: "Broadcast-quality archival footage created for producers, directors, and Tony Award submission packages.",
    image: "stage-dancers.jpg",
    className: "h_intro_p is-2",
  },
  {
    id: 3,
    num: "03",
    title: "Production Photography",
    desc: "Still photography for press kits, playbills, marketing campaigns, and the iconic editorial moments that define a production.",
    image: "stage-dancers.jpg",
    className: "h_intro_p is-3",
  },
  {
    id: 4,
    num: "04",
    title: "Promotional Trailers",
    desc: "Cinematic short-form trailers that capture the visceral energy of your show and drive audiences to the box office.",
    image: "stage-dancers.jpg",
    className: "h_intro_p is-4",
  },
];

function remToPx(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function getMaxScroll(): number {
  const itemH = remToPx(ITEM_HEIGHT_REM);
  const gap = remToPx(ITEM_GAP_REM);
  return (ITEMS.length - 1) * (itemH + gap);
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export default function StickyScrollIntro() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollState = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const list = listRef.current;
    if (!section || !wrapper || !list) return;

    // Freeze the initial viewport height so mobile chrome show/hide never
    // triggers a wrapper height change and jumps content below.
    const frozenVH = window.innerHeight;

    function getScrollRange(): number {
      return getMaxScroll() * SCROLL_MULTIPLIER;
    }

    function setWrapperHeight() {
      // frozenVH is constant — only scrollRange can change (rem-based, font resize)
      if (wrapper) {
        wrapper.style.height = `${frozenVH + getScrollRange()}px`;
      }
    }
    setWrapperHeight();

    function tick() {
      if (!list) return;
      const state = scrollState.current;
      const diff = state.target - state.current;
      state.current += diff * LERP_FACTOR;
      if (Math.abs(diff) < 0.05) state.current = state.target;
      list.style.transform = `translate3d(0px, ${-state.current}px, 0px)`;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    function onScroll() {
      if (!wrapper) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      const scrollIntoWrapper = -wrapperRect.top;
      if (scrollIntoWrapper < 0 || wrapperRect.bottom <= 0) return;

      const scrollRange = getScrollRange();
      const progress = clamp(scrollIntoWrapper, 0, scrollRange);
      scrollState.current.target = (progress / scrollRange) * getMaxScroll();
    }

    function onResize() {
      // Only update wrapper height for rem/font-size changes — NOT viewport height.
      // Skipping frozenVH here is the key: it prevents mobile chrome
      // collapse/expand from resizing the wrapper and jumping content below.
      setWrapperHeight();
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&display=swap');

        :root {
          --text-color--text-primary: #f5f0e8;
          --shadow-color: rgba(10, 8, 5, 0.95);
          --bg-overlay: rgba(10, 8, 5, 0.55);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #0a0805; }

        /* ─── Tall wrapper provides scroll runway ─── */
        .h_intro_scroll_wrapper {
          /* height set dynamically via JS */
          position: relative;
        }

        .h_intro_main {
          flex-flow: column;
          justify-content: center;
          align-items: center;
          min-height: 100dvh;
          padding-top: 5vh;
          padding-bottom: 5vh;
          display: flex;
          position: sticky;
          top: 0;
        }

        .s_h_bg-img {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          filter: sepia(1) brightness(0.5);
          opacity: 0.25;
        }

        .s_h_bg-img-inner {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .s_h_img-overlay {
          position: absolute;
          inset: 0;
          background: var(--bg-overlay);
        }

        .h_intro_wrapper {
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 35rem;
          height: 1000px; /*29rem;*/
          max-height: 60vh;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          position: relative;
          overflow: hidden;
          z-index: 2;
          padding: 0 1.25rem;
        }

        .h_intro_shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6rem;
          background: linear-gradient(to bottom, var(--shadow-color) 0%, transparent 100%);
          z-index: 5;
          pointer-events: none;
        }

        .h_intro_shadow.is-bottom {
          top: auto;
          bottom: 0;
          background: linear-gradient(to top, var(--shadow-color) 0%, transparent 100%);
        }

        .h_intro_container {
          z-index: 4;
          flex-flow: column;
          width: 100%;
          height: 800px; /*9rem;*/
          position: relative;
          overflow: hidden;
          padding-top: 4rem;
        }

        .h_intro_list {
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          display: flex;
          position: relative;
          will-change: transform;
          gap: 10rem;
        }

        .h_intro_p {
          color: var(--text-color--text-primary);
          text-align: center;
          justify-content: center;
          align-items: center;
          height: 9rem;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.1rem, 3.5vw, 1.5rem);
          font-weight: 300;
          line-height: 1.5;
          display: flex;
          flex-shrink: 0;
          letter-spacing: 0.01em;
          flex-direction: column;
        }

        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(245, 240, 232, 0.35);
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: hintFade 2.5s ease-in-out infinite;
        }

        @keyframes hintFade {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
          50%       { opacity: 0.9; transform: translateX(-50%) translateY(4px); }
        }
      `}</style>

      {/* Tall wrapper — provides the scroll distance the sticky section consumes */}
      <div ref={wrapperRef} className="h_intro_scroll_wrapper">

        <section className="h_intro_main" ref={sectionRef}>
          <div className="s_h_bg-img">
            <img
              src="https://images.unsplash.com/photo-1617405207340-954e2e19755c"
              loading="lazy"
              alt=""
              className="s_h_bg-img-inner"
            />
            {/* <div className="s_h_img-overlay" /> */}
          </div>

          <div className="h_intro_wrapper">
            <div className="h_intro_shadow" />
            <div className="h_intro_container">
              <div
                data-sticky-text-scroll="target"
                className="h_intro_list"
                ref={listRef}
              >
                {ITEMS.map((item) => (
                    <p
                        key={item.id}
                        data-sticky-text-scroll="item"
                        className={item.className}
                    >
                        <div className="cap-item-title">
                        {item.title}
                        </div>

                        <div className="cap-item-desc">
                        {item.desc}
                        </div>
                    </p>
                ))}
              </div>
            </div>
            <div className="h_intro_shadow is-bottom" />
          </div>
        </section>
      </div>
    </>
  );
}