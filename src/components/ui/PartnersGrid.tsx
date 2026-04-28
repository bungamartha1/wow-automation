"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";

const PARTNERS: { id: string; name: string; logo: string }[] = [
  { id: "alten-korea",       name: "Alten Korea",                           logo: "/assets/partners/alten.svg" },
  { id: "kyungdong-navien",  name: "Kyungdong Navien",                      logo: "/assets/partners/kyundong_navien.svg" },
  { id: "mitutoyo",          name: "Mitutoyo",                              logo: "/assets/partners/mitutoyo_logo.svg" },
  { id: "royal-co",          name: "Royal&Co",                              logo: "/assets/partners/royal&co.svg" },
  { id: "chungnam-hospital", name: "Chungnam National University Hospital", logo: "/assets/partners/chungnam.svg" },
  { id: "keimyung-hospital", name: "Keimyung University Medical Center",    logo: "/assets/partners/keimyung.svg" },
  { id: "ediya",             name: "EDIYA",                                 logo: "/assets/partners/ediya_logo.svg" },
  { id: "ksa",               name: "KSA",                                   logo: "/assets/partners/ksa_logo.svg" },
  { id: "korea-automobile",  name: "Korea Automobile",                      logo: "/assets/partners/korea_automobile.svg" },
  { id: "hwanin",            name: "Hwanin",                                logo: "/assets/partners/hwanin.svg" },
  { id: "woongjin",          name: "Woongjin",                              logo: "/assets/partners/woongjin_logo.svg" },
];

const ROW1 = PARTNERS.slice(0, Math.ceil(PARTNERS.length / 2));
const ROW2 = PARTNERS.slice(Math.ceil(PARTNERS.length / 2));

const GAP          = 16;
const NORMAL_SPEED = 0.5;
const SLOW_SPEED   = 0.07;

function MarqueeRow({ items, direction = 1 }: {
  items: typeof PARTNERS;
  direction?: 1 | -1;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef     = useRef(0);
  const speedRef = useRef(NORMAL_SPEED);
  const rafRef   = useRef<number>(0);
  const hovered  = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // measure one set width after render
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".pg-card"));
    const oneSetWidth = cards.slice(0, items.length)
      .reduce((acc, el) => acc + el.offsetWidth + GAP, 0);

    if (direction === -1) xRef.current = -oneSetWidth;

    const animate = () => {
      const target = hovered.current ? SLOW_SPEED : NORMAL_SPEED;
      speedRef.current += (target - speedRef.current) * 0.05;
      xRef.current -= speedRef.current * direction;

      if (direction === 1  && xRef.current <= -oneSetWidth) xRef.current = 0;
      if (direction === -1 && xRef.current >= 0)            xRef.current = -oneSetWidth;

      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, items.length]);

  return (
    <div
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={() => { hovered.current = true; }}
      onMouseLeave={() => { hovered.current = false; }}
    >
      <div
        ref={trackRef}
        style={{ display: "flex", gap: `${GAP}px`, width: "max-content", willChange: "transform", padding: "4px 0" }}
      >
        {[...items, ...items, ...items].map((p, i) => (
          <div key={`${p.id}-${i}`} className="pg-card">
            <Image src={p.logo} alt={p.name} width={120} height={40} className="pg-logo" />
            <div className="pg-name">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersGrid() {
  return (
    <>
      <style>{`
        .pg-rows {
          display: flex;
          flex-direction: column;
          gap: ${GAP}px;
          overflow: hidden;
          position: relative;
          margin: 0 -4rem;
          padding: 4px 0;
        }
        .pg-rows::before,
        .pg-rows::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 160px;
          z-index: 2;
          pointer-events: none;
        }
        .pg-rows::before { left: 0;  background: linear-gradient(to right, var(--bg-mid), transparent); }
        .pg-rows::after  { right: 0; background: linear-gradient(to left,  var(--bg-mid), transparent); }

        /* Same card style as testimonials */
        .pg-card {
          flex-shrink: 0;
          width: 220px;
          height: 100px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .pg-card:hover {
          border-color: rgba(201,168,76,0.4);
          box-shadow: 0 8px 28px rgba(0,0,0,0.1);
        }
        .pg-logo {
          object-fit: contain;
          max-height: 38px;
          width: auto;
          opacity: 0.55;
          filter: grayscale(100%);
          transition: opacity 0.25s, filter 0.25s;
        }
        .pg-card:hover .pg-logo { opacity: 1; filter: grayscale(0%); }
        .pg-name {
          font-size: 0.68rem;
          color: var(--text-dim);
          text-align: center;
          opacity: 0;
          transition: opacity 0.2s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .pg-card:hover .pg-name { opacity: 1; }

        @media (max-width: 1024px) {
          .pg-rows { margin: 0 -2rem; }
          .pg-rows::before, .pg-rows::after { width: 60px; }
          .pg-card { width: 170px; height: 85px; padding: 1rem 1.25rem; }
        }
      `}</style>

      <div className="pg-rows">
        <MarqueeRow items={ROW1} direction={1}  />
        <MarqueeRow items={ROW2} direction={-1} />
      </div>
    </>
  );
}