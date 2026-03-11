"use client";

import { useEffect, useRef, useState } from "react";

const LERP_FACTOR = 0.25; // 0.05 = slower/dreamier, 0.15 = snappier

export default function StickyTextScroll() {
	const CAP_ITEMS = [
		{
			num: "01",
			title: "Live Performance Videography",
			desc: "Multi-camera 4K RAW capture of full productions, seamlessly edited to preserve every breath, pause, and crescendo of the performance.",
			image: "stage-dancers.jpg",
		},
		{
			num: "02",
			title: "Archival & Documentation",
			desc: "Broadcast-quality archival footage created for producers, directors, and Tony Award submission packages.",
			image: "stage-dancers.jpg",
		},
		{
			num: "03",
			title: "Production Photography",
			desc: "Still photography for press kits, playbills, marketing campaigns, and the iconic editorial moments that define a production.",
			image: "stage-dancers.jpg",
		},
		{
			num: "04",
			title: "Promotional Trailers",
			desc: "Cinematic short-form trailers that capture the visceral energy of your show and drive audiences to the box office.",
			image: "stage-dancers.jpg",
		},
	];

    useEffect(() => {
    CAP_ITEMS.forEach((item) => {
        const img = new Image();
        img.src = item.image;
    });
    }, []);

	const [scrollerHeight, setScrollerHeight] = useState(0);

	useEffect(() => {
		const calculate = () => {
            let DVH_PADDING = window.innerHeight * 0.4;
            if (window.innerHeight < 900) {
                DVH_PADDING = window.innerHeight * -0.6;
            }
            // else if (window.innerHeight < 1200) {
            //     DVH_PADDING = window.innerHeight * -1;
            // }

			// const DVH_PADDING = window.innerHeight > 1000 ? window.innerHeight * 0.4 : window.innerHeight * -1;
            console.log("DVH_PADDING:", DVH_PADDING, window.innerHeight);
			setScrollerHeight(CAP_ITEMS.length * PX_PER_ITEM + DVH_PADDING);
		};
		calculate();
		window.addEventListener("resize", calculate);
		return () => window.removeEventListener("resize", calculate);
	}, []);

	const PX_PER_ITEM = 400;
	const DVH_PADDING =
		typeof window !== "undefined" ? window.innerHeight * 1.5 : 1200;
	//   const SCROLLER_HEIGHT = CAP_ITEMS.length * PX_PER_ITEM + DVH_PADDING;

	const trackRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const totalTravelRef = useRef(0);
	const targetYRef = useRef(0);
	const currentYRef = useRef(0);
	const rafIdRef = useRef<number>(0);
	const SENSITIVITY = 2; // increase to scroll faster through items

	const [activeIndex, setActiveIndex] = useState(0);

	// Measure list travel distance
	useEffect(() => {
		const measure = () => {
			const items =
				listRef.current?.querySelectorAll<HTMLElement>(".cap-item");
			if (items && items.length > 1) {
				totalTravelRef.current =
					items[items.length - 1].offsetTop - items[0].offsetTop;
			}
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);

	// Scroll listener — only writes target, never touches DOM
	useEffect(() => {
		const onScroll = () => {
			const el = trackRef.current;
			if (!el) return;

			const scrolledIn = -el.getBoundingClientRect().top;
			const progress = Math.max(
				0,
				Math.min(scrolledIn / scrollerHeight, 1),
			);

			//targetYRef.current = -(progress * totalTravelRef.current);
			targetYRef.current = -(
				progress *
				totalTravelRef.current *
				SENSITIVITY
			);

			setActiveIndex(
				Math.min(
					Math.floor(progress * CAP_ITEMS.length),
					CAP_ITEMS.length - 1,
				),
			);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, [CAP_ITEMS, scrollerHeight]);

	// RAF loop — lerps current toward target each frame
	useEffect(() => {
		const tick = () => {
			const target = targetYRef.current;
			const current = currentYRef.current;
			const next = current + (target - current) * LERP_FACTOR;

			if (Math.abs(target - next) > 0.01) {
				currentYRef.current = next;
				if (listRef.current) {
					listRef.current.style.transform = `translate3d(0, ${next}px, 0)`;
				}
			}

			rafIdRef.current = requestAnimationFrame(tick);
		};

		rafIdRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafIdRef.current);
	}, []);

	return (
		<section id="capabilities">
			<div className="section-header !mb-0 !px-0">
				<div>
					<div className="section-label reveal visible">
						Technical Excellence
					</div>
					<h2 className="reveal reveal-delay-1 visible">
						Crafted for the
						<br />
						<strong>Broadway standard.</strong>
					</h2>
				</div>
			</div>

			<div ref={trackRef} style={{ height: scrollerHeight }}>
				<div className="cap-sticky">
					<div className="capabilities-grid">
                        <div className="cap-visual-wrapper">
                            <div className="cap-visual absolute inset-0">
                                <img
                                    key={CAP_ITEMS[activeIndex].image}
                                    src={CAP_ITEMS[activeIndex].image}
                                    alt={CAP_ITEMS[activeIndex].title}
                                    style={{
                                        animation: "fadeIn 0.75s ease-in-out forwards",
                                    }}
                                />
                            </div>
                        </div>

						<div className="cap-content">
                            <div className="top-shadow"></div>
							<div ref={listRef} className="cap-list">
								{CAP_ITEMS.map((item, i) => (
									<div
										key={item.num}
										className={`cap-item ${i === activeIndex ? "active" : ""}`}>
										<div>
											<div className="cap-num">
												{item.num}
											</div>
											<h3 className="cap-item-title">
												{item.title}
											</h3>
											<p className="cap-item-desc">
												{item.desc}
											</p>
										</div>
									</div>
								))}
							</div>
                            <div className="bottom-shadow"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
