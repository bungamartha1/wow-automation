"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Lang = "KO" | "EN";

interface NavbarProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  dark: boolean;
  onDarkChange: (dark: boolean) => void;
}

const HOME_LINK = { ko: "홈", en: "Home", href: "/" };

const PAGE_LINKS = [
  { ko: "회사소개", en: "About",     href: "/about" },
  { ko: "구축실적", en: "Portfolio", href: "/portfolio" },
  { ko: "인사이트", en: "Insights",  href: "/insights" },
];

const ANCHOR_LINKS = [
  { ko: "서비스",   en: "Services", href: "/#services" },
  { ko: "파트너",   en: "Partners", href: "/#partners" },
  { ko: "문의하기", en: "Contact",  href: "/#contact" },
];

export default function Navbar({ lang, onLangChange, dark, onDarkChange }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [langOpen,    setLangOpen]    = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const langRefDesktop = useRef<HTMLDivElement>(null);
  const langRefMobile  = useRef<HTMLDivElement>(null);
  const lastScrollY    = useRef(0);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(false);
      }
      setScrolled(currentScrollY > 40);
      lastScrollY.current = currentScrollY;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setHidden(false), 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(scrollTimer); };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const outsideDesktop = !langRefDesktop.current?.contains(target);
      const outsideMobile  = !langRefMobile.current?.contains(target);
      if (outsideDesktop && outsideMobile) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const label = (item: { ko: string; en: string }) => lang === "KO" ? item.ko : item.en;

  const navBg     = dark ? "rgba(10,22,40,0.96)"    : "rgba(255,255,255,0.96)";
  const navBorder = dark ? "rgba(201,168,76,0.15)"  : "rgba(201,168,76,0.25)";
  const linkColor = dark ? "rgba(255,255,255,0.65)" : "rgba(30,40,60,0.7)";
  const sidebarBg = dark ? "#0a1628"                : "#ffffff";

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.2rem 3rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          transform: translateY(0);
          background: ${navBg};
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid ${navBorder};
          transition: transform 0.35s ease, padding 0.35s ease;
        }
        .navbar.scrolled { padding: 0.85rem 3rem; }
        .navbar.hidden { transform: translateY(-100%); }
        .nav-left {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-right: 3rem;
        }
        .nav-left a, .nav-right a {
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.04em;
          color: ${linkColor}; text-decoration: none;
          transition: color 0.2s; white-space: nowrap;
        }
        .nav-left a:hover, .nav-right a:hover { color: #c9a84c; }
        .nav-logo {
          display: flex; flex-direction: column;
          align-items: center; text-decoration: none; line-height: 1;
        }
        .nav-right {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-left: 3rem;
        }
        .nav-controls {
          display: flex; align-items: center; gap: 0.6rem;
          padding-left: 1.2rem;
          border-left: 1px solid rgba(201,168,76,0.2);
          flex-shrink: 0;
        }
        .lang-dropdown { position: relative; }
        .lang-btn {
          display: flex; align-items: center; gap: 0.35rem;
          background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.25);
          border-radius: 2px; color: #c9a84c; padding: 0.32rem 0.7rem;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .lang-btn:hover { background: rgba(201,168,76,0.15); }
        .lang-btn svg { width: 10px; height: 10px; transition: transform 0.2s; }
        .lang-btn.open svg { transform: rotate(180deg); }
        .lang-menu {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: ${dark ? "#112240" : "#ffffff"};
          border: 1px solid rgba(201,168,76,0.2);
          min-width: 90px; overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15); z-index: 200;
        }
        .lang-option {
          display: block; width: 100%; padding: 0.6rem 1rem;
          font-size: 0.78rem; font-weight: 500;
          color: ${dark ? "rgba(255,255,255,0.7)" : "rgba(30,40,60,0.8)"};
          background: transparent; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; text-align: left;
          transition: all 0.15s; letter-spacing: 0.06em;
        }
        .lang-option:hover { background: rgba(201,168,76,0.1); color: #c9a84c; }
        .lang-option.active { color: #c9a84c; font-weight: 700; }
        .dark-toggle, .hamburger-btn {
          background: transparent; border: 1px solid rgba(201,168,76,0.25);
          border-radius: 2px; color: ${dark ? "rgba(255,255,255,0.6)" : "rgba(30,40,60,0.6)"};
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 0.9rem; transition: all 0.2s; padding: 0;
        }
        .dark-toggle:hover, .hamburger-btn:hover { border-color: #c9a84c; color: #c9a84c; }
        .mobile-controls { display: none; align-items: center; gap: 0.6rem; justify-content: flex-end; flex-shrink: 0; }

        /* ── SIDEBAR ── */
        .sidebar-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .sidebar-overlay.open { opacity: 1; pointer-events: all; }
        .sidebar {
          position: fixed; top: 0; right: 0; bottom: 0; width: 280px;
          background: ${sidebarBg};
          border-left: 1px solid rgba(201,168,76,0.15);
          z-index: 201; display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 2rem 1.5rem;
        }
        .sidebar.open { transform: translateX(0); }
        .sidebar-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 2rem; padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }
        .sidebar-close {
          background: transparent; border: 1px solid rgba(201,168,76,0.25);
          border-radius: 2px; color: ${dark ? "rgba(255,255,255,0.6)" : "rgba(30,40,60,0.6)"};
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1rem; transition: all 0.2s; padding: 0;
        }
        .sidebar-close:hover { border-color: #c9a84c; color: #c9a84c; }
        .sidebar-home {
          display: block; padding: 0.75rem 0 1.25rem;
          font-size: 0.95rem; font-weight: 600;
          color: ${dark ? "rgba(255,255,255,0.9)" : "rgba(30,40,60,0.9)"};
          text-decoration: none;
          border-bottom: 1px solid rgba(201,168,76,0.12);
          margin-bottom: 1.25rem;
          transition: color 0.2s, padding-left 0.2s;
        }
        .sidebar-home:hover { color: #c9a84c; padding-left: 0.5rem; }
        .sidebar-section-label {
          font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(201,168,76,0.6); margin-bottom: 0.5rem; margin-top: 1.25rem;
        }
        .sidebar-section-label:first-of-type { margin-top: 0; }
        .sidebar-link {
          display: block; padding: 0.75rem 0;
          font-size: 0.95rem; font-weight: 500;
          color: ${dark ? "rgba(255,255,255,0.75)" : "rgba(30,40,60,0.8)"};
          text-decoration: none; border-bottom: 1px solid rgba(201,168,76,0.06);
          transition: color 0.2s, padding-left 0.2s;
        }
        .sidebar-link:hover { color: #c9a84c; padding-left: 0.5rem; }
        .sidebar-link:last-child { border-bottom: none; }
        .sidebar-footer {
          margin-top: auto; padding-top: 1.5rem;
          border-top: 1px solid rgba(201,168,76,0.12);
        }

        @media (max-width: 768px) {
          .nav-left, .nav-right { display: none !important; }
          .mobile-controls { display: flex !important; }
          .navbar { grid-template-columns: auto 1fr auto; padding: 1rem 1.25rem; }
          .navbar.scrolled { padding: 0.75rem 1.25rem; }
          .nav-logo { align-items: flex-start; }
        }
        @media (min-width: 769px) {
          .sidebar, .sidebar-overlay { display: none; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}${hidden ? " hidden" : ""}`}>
        {/* LEFT */}
        <div className="nav-left">
          <Link href="/">{lang === "KO" ? "홈" : "Home"}</Link>
          {PAGE_LINKS.map(l => (
            <Link key={l.href} href={l.href}>{label(l)}</Link>
          ))}
        </div>

        {/* CENTER */}
        <Link href="/" className="nav-logo">
          <Image
            src={dark ? "/assets/shiba-white.svg" : "/assets/shiba.svg"}
            alt="WOW Automation" width={120} height={40} priority
          />
        </Link>

        {/* RIGHT */}
        <div className="nav-right">
          {ANCHOR_LINKS.map(l => (
            <Link key={l.href} href={l.href}>{label(l)}</Link>
          ))}
          <div className="nav-controls">
            <div className="lang-dropdown" ref={langRefDesktop}>
              <button className={`lang-btn${langOpen ? " open" : ""}`} onClick={() => setLangOpen(p => !p)}>
                {lang}
                <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
              {langOpen && (
                <div className="lang-menu">
                  {(["KO", "EN"] as Lang[]).map(l => (
                    <button key={l} className={`lang-option${lang === l ? " active" : ""}`}
                      onClick={() => { onLangChange(l); setLangOpen(false); }}>
                      {l === "KO" ? "🇰🇷 한국어" : "🇺🇸 English"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="dark-toggle" onClick={() => onDarkChange(!dark)}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* MOBILE controls */}
        <div className="mobile-controls">
          <div className="lang-dropdown" ref={langRefMobile}>
            <button className={`lang-btn${langOpen ? " open" : ""}`} onClick={() => setLangOpen(p => !p)}>
              {lang}
              <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            {langOpen && (
              <div className="lang-menu">
                {(["KO", "EN"] as Lang[]).map(l => (
                  <button key={l} className={`lang-option${lang === l ? " active" : ""}`}
                    onClick={() => { onLangChange(l); setLangOpen(false); }}>
                    {l === "KO" ? "🇰🇷 한국어" : "🇺🇸 English"}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="dark-toggle" onClick={() => onDarkChange(!dark)}>{dark ? "☀️" : "🌙"}</button>
          <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>☰</button>
        </div>
      </nav>

      <div className={`sidebar-overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      <div className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="nav-logo" onClick={() => setSidebarOpen(false)}>
            <Image
              src={dark ? "/assets/shiba-white.svg" : "/assets/shiba.svg"}
              alt="WOW Automation" width={100} height={34} priority
            />
          </Link>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {/* HOME */}
        <Link href="/" className="sidebar-home" onClick={() => setSidebarOpen(false)}>
          {label(HOME_LINK)}
        </Link>

        {/* PAGES */}
        <div className="sidebar-section-label">{lang === "KO" ? "페이지" : "Pages"}</div>
        {PAGE_LINKS.map(l => (
          <Link key={l.href} href={l.href} className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            {label(l)}
          </Link>
        ))}

        {/* SECTIONS */}
        <div className="sidebar-section-label">{lang === "KO" ? "섹션" : "Sections"}</div>
        {ANCHOR_LINKS.map(l => (
          <Link key={l.href} href={l.href} className="sidebar-link" onClick={() => setSidebarOpen(false)}>
            {label(l)}
          </Link>
        ))}

        <div className="sidebar-footer">
          <span style={{ fontSize: "0.75rem", color: "rgba(128,128,128,0.5)", letterSpacing: "0.05em" }}>
            © 2024 WOW Automation
          </span>
        </div>
      </div>
    </>
  );
}