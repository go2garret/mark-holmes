"use client";

import { useEffect, useRef, useState } from "react";

export default function StickyTextScroll() {
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

    const PX_PER_ITEM = 550;
     //window.innerHeight;
    const DVH_PADDING = 2000;
    const SCROLLER_HEIGHT = CAP_ITEMS.length * PX_PER_ITEM + DVH_PADDING;

	const trackRef2 = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const totalTravelRef = useRef(0);

	const [activeIndex, setActiveIndex] = useState(0);
	const [imgSrc, setImgSrc] = useState(CAP_ITEMS[0].image);
	const [imgFading, setImgFading] = useState(false);

	// Calculate list travel distance
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

		return () => {
			window.removeEventListener("resize", calculateTravel);
		};
	}, []);

	// Main scroll handler
	useEffect(() => {
		let rafId: number;

		const onScroll = () => {
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
					CAP_ITEMS.length - 1,
				);

				setActiveIndex(newIndex);

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

	return (
		<section id="capabilities">
			<div className="section-header !mb-0 !px-0">
				<div>
					<div className="section-label reveal visible">
						Technical Excellence
					</div>
					<h2 className="reveal reveal-delay-1 visible">
						Crafted for the<strong>Broadway standard.</strong>
					</h2>
				</div>
			</div>

			<div ref={trackRef2} style={{ height: SCROLLER_HEIGHT }}>
				<div className="cap-sticky">
					<div className="capabilities-grid">
						{/* VISUAL */}
						<div className="cap-visual">
							<img
								src={CAP_ITEMS[activeIndex].image}
								className={imgFading ? "fade-out" : ""}
							/>
						</div>

						{/* TEXT LIST */}
						<div className="cap-content">
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
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
