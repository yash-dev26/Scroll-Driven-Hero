"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORD = "WELCOME"; // followed by the ITZFIZZ logo on its yellow pill
const LOGO = {
  src:
    process.env.NODE_ENV === "production"
      ? "/Scroll-Driven-Hero/itzfizz-logo.png"
      : "/itzfizz-logo.png",
  w: 1400,
  h: 388,
};

const STATS = [
  { value: 87, text: "increase in organic search traffic", color: "#FF8FC7" },
  { value: 92, text: "of target keywords on page one", color: "#8FD3FF" },
  { value: 76, text: "more Instagram engagement", color: "#FFE500" },
];

const RANKS = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const LIKES = ["1.2k", "2.9k", "5.4k", "9.8k", "14.6k"];
const BARS = [30, 45, 60, 78, 100]; // % heights of the growth chart on the post

const HEART_PATH =
  "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.5 6.4 4.5c2.1 0 3.7 1.1 4.6 2.6.9-1.5 2.5-2.6 4.6-2.6 3.7 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z";

/* ---------- hand-drawn Memphis doodles (wobbly paths, thick black outline) ---------- */
const INK = "#111";
const Doodle = ({ kind }) => {
  switch (kind) {
    case "squiggle":
      return (
        <svg viewBox="0 0 110 36" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 20C13 3 21 4 29 19S46 33 54 18 69 3 77 19s17 14 28-3" stroke={INK} strokeWidth="13" />
          <path d="M5 20C13 3 21 4 29 19S46 33 54 18 69 3 77 19s17 14 28-3" stroke="#FF8FC7" strokeWidth="6" />
        </svg>
      );
    case "zigzag":
      return (
        <svg viewBox="0 0 100 40" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 32 21 8l14 24 15-25 14 25 15-24" stroke={INK} strokeWidth="13" />
          <path d="M6 32 21 8l14 24 15-25 14 25 15-24" stroke="#FFE500" strokeWidth="6" />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 60 60" strokeLinejoin="round">
          <path d="M30 3C32 21 39 28 57 30 39 33 32 40 30 57 27 40 21 33 3 30 21 27 28 21 30 3Z" fill="#FFE500" stroke={INK} strokeWidth="3.5" />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 64 64">
          <path d="M31 5C50 3 60 20 58 36 55 53 37 61 22 56 8 51 3 34 8 21 12 11 21 6 31 5Z" fill="#8FD3FF" stroke={INK} strokeWidth="3.5" />
          <path d="M32 21C42 20 45 30 42 37 38 45 27 45 23 38 20 31 23 22 32 21Z" fill="#F7F5EE" stroke={INK} strokeWidth="3.5" />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 64 60" strokeLinejoin="round">
          <path d="M33 5 59 53 6 55Z" fill="#FF8FC7" stroke={INK} strokeWidth="3.5" />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 50 50" fill="none" strokeLinecap="round">
          <path d="M25 6c1 13 0 24-1 38M6 26c13-2 25-1 38-1" stroke={INK} strokeWidth="13" />
          <path d="M25 6c1 13 0 24-1 38M6 26c13-2 25-1 38-1" stroke="#8FD3FF" strokeWidth="6" />
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 60 60" fill={INK}>
          {[8, 30, 52].flatMap((x) => [8, 30, 52].map((y) => <circle key={`${x}-${y}`} cx={x + (y % 3)} cy={y + (x % 3)} r="4.2" />))}
        </svg>
      );
    default:
      return null;
  }
};

// [kind, positioning classes, size classes, scroll rotation, scroll drift (px)]
const DOODLES = [
  ["zigzag", "left-[2%] bottom-[4%]", "w-24 md:w-36", -25, -24],
  ["sparkle", "left-[30%] top-[4%]", "w-10 md:w-16", 120, 30],
  ["squiggle", "right-[24%] bottom-[2%]", "w-20 md:w-32", 20, 26],
  ["ring", "left-[52%] bottom-[10%]", "w-9 md:w-14", 200, -34],
  ["triangle", "right-[3%] top-[2%]", "w-10 md:w-14", -140, 22],
  ["plus", "right-[30%] top-[10%]", "w-8 md:w-12", 90, -20],
  ["dots", "right-[8%] bottom-[16%]", "w-10 md:w-14", 0, -30],
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const one = (s) => q(s)[0];
      const mm = gsap.matchMedia();

      /* ---- reduced motion: final state, no animation ---- */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(q("[data-letter], [data-stat], [data-hint], [data-in], [data-nav], [data-pop], [data-pill], [data-logo]"), { autoAlpha: 1, scaleX: 1 });
        gsap.set(q("[data-fill]"), { scaleX: 1 });
        gsap.set(q("[data-heart-fill]"), { scale: 1 });
        gsap.set(q("[data-roll='rank']"), { yPercent: -((RANKS.length - 1) / RANKS.length) * 100 });
        gsap.set(q("[data-roll='likes']"), { yPercent: -((LIKES.length - 1) / LIKES.length) * 100 });
        q("[data-num]").forEach((el) => (el.textContent = el.dataset.num));
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const stage = one("[data-stage]");
        const post = one("[data-post]");
        const stats = q("[data-stat]");

        /* ============ 2. SCROLL TIMELINE (progress-driven, pinned) ============
           Positions are measured only when ScrollTrigger refreshes (load / resize),
           never while scrolling, so scrolling triggers no layout work. */
        const xFor = (el) => () => {
          const s = stage.getBoundingClientRect();
          const r = el.getBoundingClientRect();
          const cw = post.offsetWidth;
          const limit = s.width / 2 - cw / 2 - cw * 0.12 - 8;
          const dx = r.left + r.width / 2 - (s.left + s.width / 2);
          return gsap.utils.clamp(-limit, limit, dx);
        };

        const tl = gsap.timeline({
          defaults: { ease: "none", duration: 1 }, // each scroll tween spans the whole pin unless it sets its own
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 1.2, // smoothing: motion eases toward the scroll position
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl
          // main visual: travels across the stage, following the stats
          .fromTo(one("[data-travel]"), { x: xFor(stats[0]) }, { x: xFor(stats[stats.length - 1]) }, 0)
          // arc: rises then settles
          .to(one("[data-travel]"), { y: -28, ease: "sine.inOut", duration: 0.5 }, 0)
          .to(one("[data-travel]"), { y: 18, ease: "sine.inOut", duration: 0.5 }, 0.5)
          // scale toward the viewer at mid-scroll, then settle
          .fromTo(one("[data-scale]"), { scale: 0.86 }, { scale: 1.12, ease: "sine.inOut", duration: 0.5 }, 0)
          .to(one("[data-scale]"), { scale: 1, ease: "sine.inOut", duration: 0.5 }, 0.5)
          // 3D swing + roll
          .fromTo(one("[data-tilt]"), { rotationY: -24, rotation: -8 }, { rotationY: 24, rotation: 6, ease: "sine.inOut" }, 0)
          // story ring spins with scroll
          .fromTo(one("[data-ring]"), { rotation: 0 }, { rotation: 360 }, 0)
          // SEO rank climbs #9 -> #1, stepped so each rank lands cleanly (translateY on a column)
          .to(one("[data-roll='rank']"), { yPercent: -((RANKS.length - 1) / RANKS.length) * 100, ease: `steps(${RANKS.length - 1})` }, 0)
          .to(one("[data-roll='likes']"), { yPercent: -((LIKES.length - 1) / LIKES.length) * 100, ease: `steps(${LIKES.length - 1})` }, 0)
          // heart pops at mid-scroll
          .fromTo(one("[data-heart-fill]"), { scale: 0 }, { scale: 1, ease: "back.out(2.5)", duration: 0.1 }, 0.45)
          // headline words drift apart
          .to(one("[data-line='0']"), { x: () => -window.innerWidth * 0.018 }, 0)
          .to(one("[data-line='1']"), { x: () => window.innerWidth * 0.018 }, 0)
          .to(one("[data-hint]"), { autoAlpha: 0, duration: 0.08 }, 0)
          .fromTo(one("[data-rail]"), { scaleY: 0 }, { scaleY: 1 }, 0);

        // doodles + sticker: each spins and drifts at its own rate (parallax)
        q("[data-doodle]").forEach((el) => {
          tl.fromTo(
            el,
            { rotation: 0, y: 0 },
            { rotation: Number(el.dataset.rot), y: Number(el.dataset.drift), ease: "sine.inOut" },
            0
          );
        });

        // growth-chart bars rise in sequence
        q("[data-bar]").forEach((bar, i) => {
          tl.fromTo(bar, { scaleY: 0.2 }, { scaleY: 1, ease: "power2.out", duration: 0.3 }, 0.02 + i * 0.15);
        });
        // each stat's bar fills as the card arrives beneath it
        q("[data-fill]").forEach((el, i) => {
          tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.14 }, (i / (stats.length - 1)) * 0.86);
        });

        /* ============ 1. INTRO (time-based, plays once) ============
           Order: headline letters -> yellow pill + logo -> stats one after
           another -> post card -> doodles. Each step overlaps the previous one so it flows. */
        const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

        intro
          .fromTo(one("[data-nav]"), { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 1 }, 0)
          // headline: each letter fades in while drifting a short way up
          .fromTo(
            q("[data-letter]"),
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.06 },
            0.25
          )
          // yellow pill wipes in left-to-right like a highlighter, right after WELCOME lands
          .fromTo(
            one("[data-pill]"),
            { autoAlpha: 0, scaleX: 0 },
            { autoAlpha: 1, scaleX: 1, duration: 1, ease: "power3.inOut" },
            0.85
          )
          // then the logo fades up onto it
          .fromTo(
            one("[data-logo]"),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 1.1 },
            1.3
          )
          // stats: 87% first, 92% a beat later, 76% a beat after that
          .fromTo(
            q("[data-stat]"),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.4 },
            2.0
          )
          // main visual arrives once the last stat is on its way in
          .fromTo(
            one("[data-in]"),
            { autoAlpha: 0, y: 60, scale: 0.92 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, ease: "expo.out" },
            3.2
          )
          // doodles + sticker pop in last, lightly staggered
          .fromTo(
            q("[data-pop]"),
            { autoAlpha: 0, scale: 0.6 },
            { autoAlpha: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: "back.out(1.6)" },
            3.55
          )
          .fromTo(one("[data-hint]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 4.25);

        // numbers count up with each stat's own reveal
        q("[data-num]").forEach((el, i) => {
          const counter = { v: 0 };
          intro.to(
            counter,
            {
              v: Number(el.dataset.num),
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => (el.textContent = Math.round(counter.v)),
            },
            2.0 + i * 0.4
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="grid-bg relative h-svh w-full overflow-hidden"
      aria-label="Welcome to ITZFIZZ"
    >
      {/* scroll progress rail */}
      <div
        aria-hidden
        className="absolute right-2 top-1/2 z-20 h-28 w-2.5 -translate-y-1/2 overflow-hidden rounded-full border-2 border-ink bg-white md:right-4"
      >
        <div data-rail className="h-full w-full origin-top scale-y-0 bg-bubble" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-5 pb-4 pt-4 md:px-12 md:pt-6">

        {/* ============ Headline, then stats directly below ============ */}
        <header className="mt-5 md:mt-7">
          <h1 className="flex flex-col items-start gap-3 font-display text-[clamp(2.1rem,10.5vw,3.5rem)] leading-none md:flex-row md:items-center md:gap-[0.5em] md:text-[clamp(2.2rem,5.8vw,6.25rem)]">
            <span className="sr-only">Welcome ITZFIZZ</span>

            {/* WELCOME: letter-spaced, letters animate in one by one */}
            <span data-line="0" aria-hidden className="block will-change-transform">
              <span className="flex" style={{ gap: "0.16em" }}>
                {WORD.split("").map((ch, i) => (
                  <span key={i} data-letter className="inline-block opacity-0 will-change-transform">
                    {ch}
                  </span>
                ))}
              </span>
            </span>

            {/* ITZFIZZ logo on a yellow pill. The pill is its own layer so it can
                wipe in on load, then the logo fades in on top of it. */}
            <span data-line="1" aria-hidden className="block will-change-transform">
              <span className="relative block -rotate-1 px-[0.2em] py-[0.13em]">
                <span
                  data-pill
                  className="absolute inset-0 origin-left rounded-[0.22em] border-[3px] border-ink bg-sun opacity-0 shadow-brut-lg will-change-transform"
                />
                <img
                  data-logo
                  src={LOGO.src}
                  width={LOGO.w}
                  height={LOGO.h}
                  alt=""
                  className="relative block h-[1.15em] w-auto opacity-0 will-change-transform md:h-[1.05em]"
                />
              </span>
            </span>
          </h1>

          <ul className="mt-5 grid grid-cols-3 gap-3 md:mt-7 md:gap-8">
            {STATS.map((s, i) => (
              <li key={s.text} data-stat className="relative opacity-0">
                <div className="stat-card p-2.5 md:p-4">
                  <div className="flex items-baseline font-display leading-none tabular-nums">
                    <span data-num={s.value} className="hl text-[clamp(1.9rem,4.4vw,3.9rem)]">
                      0
                    </span>
                    <span className="ml-0.5 text-[clamp(1.1rem,2vw,1.8rem)]">%</span>
                  </div>
                  <div className="bar-track mt-2.5 md:mt-3">
                    <div data-fill className="bar-fill" style={{ background: s.color }} />
                  </div>
                  <p className="mt-2 text-[12px] font-semibold leading-snug md:text-base">{s.text}</p>
                </div>

                {/* Y2K sticker slapped on the last card */}
                {i === STATS.length - 1 && (
                  <div
                    data-pop
                    data-doodle
                    data-rot="360"
                    data-drift="0"
                    aria-hidden
                    className="absolute -right-1 -top-5 z-20 h-14 w-14 opacity-0 will-change-transform md:-right-4 md:-top-8 md:h-24 md:w-24"
                  >
                    <svg viewBox="0 0 100 100" className="h-full w-full">
                      <defs>
                        <path id="sticker-circle" d="M50 50 m-33 0 a33 33 0 1 1 66 0 a33 33 0 1 1 -66 0" />
                      </defs>
                      <circle cx="50" cy="50" r="47" fill="#FF8FC7" stroke="#111" strokeWidth="3.5" />
                      <text fontSize="11.5" fontWeight="900" fill="#111" fontFamily="Arial Black, Arial, sans-serif">
                        <textPath href="#sticker-circle" textLength="204" lengthAdjust="spacing">
                          SEO * SOCIAL * GROWTH *
                        </textPath>
                      </text>
                      <path
                        d="M50 30c1.4 12 6 16.6 18 20-12 3.4-16.6 8-18 20-1.4-12-6-16.6-18-20 12-3.4 16.6-8 18-20Z"
                        fill="#FFE500"
                        stroke="#111"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </header>

        {/* ============ Main visual: the scroll-driven post card ============ */}
        <div data-stage className="relative grid min-h-0 flex-1 place-items-center">
          {/* Memphis doodles sit behind the card */}
          {DOODLES.map(([kind, pos, size, rot, drift]) => (
            <div
              key={kind}
              data-pop
              data-doodle
              data-rot={rot}
              data-drift={drift}
              aria-hidden
              className={`pointer-events-none absolute z-0 opacity-0 will-change-transform ${pos} ${size}`}
            >
              <Doodle kind={kind} />
            </div>
          ))}

          <div data-travel className="relative z-10 will-change-transform">
            <div data-in className="opacity-0 will-change-transform">
              <div data-scale className="scene will-change-transform">
                <div data-tilt data-post className="post">
                  {/* SEO result chip */}
                  <div className="serp" aria-hidden>
                    <div className="rank">
                      <div className="roll">
                        <div data-roll="rank">
                          {RANKS.map((r) => (
                            <span key={r} className="text-center">
                              #{r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="serp-url">itzfizz.com</div>
                      <div className="serp-title">Digital marketing agency</div>
                    </div>
                  </div>

                  <div className="post-head">
                    <div className="story">
                      <div data-ring className="story-ring" />
                      <div className="story-avatar">iz</div>
                    </div>
                    <div>
                      <div className="handle">itzfizz</div>
                      <div className="sub">Sponsored</div>
                    </div>
                  </div>

                  <div className="media" aria-hidden>
                    {BARS.map((h, i) => (
                      <div key={i} data-bar className="bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>

                  <div className="actions" aria-hidden>
                    <div className="heart">
                      <svg viewBox="0 0 24 24">
                        <path d={HEART_PATH} fill="none" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                      <svg viewBox="0 0 24 24">
                        <g data-heart-fill style={{ transformOrigin: "12px 12px", transformBox: "view-box" }}>
                          <path d={HEART_PATH} fill="#FF8FC7" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
                        </g>
                      </svg>
                    </div>
                    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="#111" strokeWidth="2" strokeLinejoin="round">
                      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.6-5A8.5 8.5 0 1 1 21 11.5z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="#111" strokeWidth="2" strokeLinejoin="round">
                      <path d="M22 3 2 10.5l7 3 3 7L22 3zM9 13.5 22 3" />
                    </svg>
                  </div>

                  <div className="likes">
                    <div className="roll">
                      <div data-roll="likes">
                        {LIKES.map((l) => (
                          <span key={l}>{l}</span>
                        ))}
                      </div>
                    </div>
                    <span>likes</span>
                  </div>
                  <p className="caption">
                    <b>itzfizz</b> Rank first. Get seen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p
            data-hint
            className="pill absolute bottom-0 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap px-4 py-1 text-sm font-bold opacity-0"
            style={{ boxShadow: "3px 3px 0 #111" }}
          >
            Scroll to grow the numbers
          </p>
        </div>
      </div>
    </section>
  );
}
