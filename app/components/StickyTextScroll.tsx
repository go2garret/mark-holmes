import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    id: 1,
    text: "micro1 turns human brilliance into the force that drives the world's most ambitious AI.",
    className: "h_intro_p is-1",
  },
  {
    id: 2,
    text: "A model is only as good as its data, and beneath every breakthrough in AI, there's an orchestra of human expertise powering that data.",
    className: "h_intro_p is-2",
  },
  {
    id: 3,
    text: "micro1 conducts that orchestra, finding the sharpest minds and forging their expertise into the datasets that shape how AI reasons, adapts, and integrates into the future of humanity.",
    className: "h_intro_p is-3",
  },
];

const LERP_FACTOR = 0.07;
const VELOCITY_DECAY = 0.88;
const SCROLL_SENSITIVITY = 0.6;
const ITEM_HEIGHT_REM = 9;
const ITEM_GAP_REM = 10;

function remToPx(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export default function StickyScrollIntro() {
    const listRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollState = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    touching: false,
    lastTouchY: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;

    function getMaxScroll() {
      const itemH = remToPx(ITEM_HEIGHT_REM);
      const gap = remToPx(ITEM_GAP_REM);
      return (ITEMS.length - 1) * (itemH + gap);
    }

    function clamp(val: number, min: number, max: number) {
      return Math.min(Math.max(val, min), max);
    }

    function tick() {
      const state = scrollState.current;
      state.target = clamp(state.target, 0, getMaxScroll());

      // Lerp current toward target
      const diff = state.target - state.current;
      state.current += diff * LERP_FACTOR;

      // Snap to target when very close
      if (Math.abs(diff) < 0.05) state.current = state.target;

      if (list) {
        list.style.transform = `translate3d(0px, ${-state.current}px, 0px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    function onWheel(e) {
      const state = scrollState.current;
      const max = getMaxScroll();
      const atTop = state.target <= 0 && e.deltaY < 0;
      const atBottom = state.target >= max && e.deltaY > 0;

      if (!atTop && !atBottom) {
        e.preventDefault();
      }

      state.velocity += e.deltaY * SCROLL_SENSITIVITY;
      state.target = clamp(state.target + state.velocity, 0, max);
      state.velocity *= VELOCITY_DECAY;
    }

    function onTouchStart(e) {
      scrollState.current.touching = true;
      scrollState.current.lastTouchY = e.touches[0].clientY;
      scrollState.current.velocity = 0;
    }

    function onTouchMove(e) {
      const state = scrollState.current;
      if (!state.touching) return;
      const dy = state.lastTouchY - e.touches[0].clientY;
      state.lastTouchY = e.touches[0].clientY;
      state.velocity = dy * 2.5;
      state.target = clamp(state.target + state.velocity, 0, getMaxScroll());
      const atTop = state.target <= 0 && dy < 0;
      const atBottom = state.target >= getMaxScroll() && dy > 0;
      if (!atTop && !atBottom) e.preventDefault();
    }

    function onTouchEnd() {
      scrollState.current.touching = false;
    }

    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false });
    section.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onTouchEnd);
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

        body {
          background: #0a0805;
          min-height: 300vh;
        }

        .h_intro_main {
          flex-flow: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding-top: 10vh;
          padding-bottom: 30vh;
          display: flex;
          position: sticky;
          top: 0;
        }

        .s_h_bg-img {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
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
          grid-column-gap: 7rem;
          grid-row-gap: 7rem;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 35rem;
          height: 29rem;
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
          grid-column-gap: 5rem;
          grid-row-gap: 5rem;
          flex-flow: column;
          width: 100%;
          height: 9rem;
          position: relative;
          overflow: hidden;
        }

        .h_intro_list {
          grid-column-gap: 10rem;
          grid-row-gap: 10rem;
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
          50% { opacity: 0.9; transform: translateX(-50%) translateY(4px); }
        }
      `}</style>

      <section className="h_intro_main" ref={sectionRef}>
        <div className="s_h_bg-img">
          <img
            src="https://cdn.prod.website-files.com/68b095121300aebde21ab3f4/6984d83b4ad1a367ccb73217_image%20498%20(1).jpg"
            loading="lazy"
            alt=""
            className="s_h_bg-img-inner"
          />
          <div className="s_h_img-overlay" />
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
                  {item.text}
                </p>
              ))}
            </div>
          </div>
          <div className="h_intro_shadow is-bottom" />
        </div>

        <div className="scroll-hint">
          <span>scroll</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>
    </>
  );
}