"use client";
import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import { LangContext } from "@/context/LangContext";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const footerTr = {
  KO: {
    aboutTitle:  "회사",
    links: [
      { label: "회사소개", href: "/about" },
      { label: "구축실적", href: "/portfolio" },
      { label: "인사이트", href: "/insights" },
    ],
    socialTitle: "함께해요",
    copy: "© 2024 WOW Automation. All rights reserved.",
  },
  EN: {
    aboutTitle:  "Company",
    links: [
      { label: "About WOW Automation", href: "/about" },
      { label: "Portfolio",            href: "/portfolio" },
      { label: "Insights",             href: "/insights" },
    ],
    socialTitle: "Join Our Community",
    copy: "© 2024 WOW Automation. All rights reserved.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<"KO" | "EN">("KO");
  const [dark, setDark] = useState(false);
  const ft = footerTr[lang];

  return (
    <html lang={lang === "KO" ? "ko" : "en"} className={dark ? "dark" : "light"}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LangContext.Provider value={lang}>

          <Navbar lang={lang} onLangChange={setLang} dark={dark} onDarkChange={setDark} />

          <main>{children}</main>

          {/* Use a div wrapper instead of footer tag to avoid CSS conflicts */}
          <div className="site-footer">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');

              /* Reset everything inside site-footer */
              .site-footer {
                background: #111827 !important;
                font-family: 'DM Sans', sans-serif !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                display: block !important;
                box-sizing: border-box !important;
              }

              /* TOP GRID */
              .site-footer .sf-grid {
                display: grid !important;
                grid-template-columns: 1fr 1fr 1fr !important;
                gap: 2rem !important;
                padding: 3rem 4rem !important;
                margin: 0 !important;
                box-sizing: border-box !important;
                width: 100% !important;
              }

              .site-footer .sf-brand {
                display: flex !important;
                flex-direction: column !important;
                gap: 0.5rem !important;
              }
              .site-footer .sf-brand-name {
                font-size: 0.95rem !important;
                font-weight: 600 !important;
                color: rgba(255,255,255,0.85) !important;
                margin-top: 0.6rem !important;
              }
              .site-footer .sf-addr-ko {
                font-size: 0.8rem !important;
                color: rgba(255,255,255,0.4) !important;
                margin: 0 !important;
              }
              .site-footer .sf-addr-en {
                font-size: 0.75rem !important;
                color: rgba(255,255,255,0.25) !important;
                margin: 0 !important;
              }

              .site-footer .sf-col {
                display: flex !important;
                flex-direction: column !important;
              }
              .site-footer .sf-col-title {
                font-size: 0.88rem !important;
                font-weight: 600 !important;
                color: rgba(255,255,255,0.85) !important;
                margin: 0 0 1.2rem 0 !important;
                padding: 0 !important;
              }
              .site-footer .sf-col-links {
                display: flex !important;
                flex-direction: column !important;
                gap: 0.8rem !important;
              }
              .site-footer .sf-col-links a {
                font-size: 0.82rem !important;
                color: rgba(255,255,255,0.4) !important;
                text-decoration: none !important;
                transition: color 0.2s !important;
              }
              .site-footer .sf-col-links a:hover { color: #c9a84c !important; }

              .site-footer .sf-socials {
                display: flex !important;
                align-items: center !important;
                gap: 1.2rem !important;
              }
              .site-footer .sf-social-btn {
                color: rgba(255,255,255,0.45) !important;
                text-decoration: none !important;
                transition: color 0.2s !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }
              .site-footer .sf-social-btn:hover { color: #c9a84c !important; }
              .site-footer .sf-social-btn svg { width: 20px !important; height: 20px !important; }

              /* FULL-WIDTH LINE */
              .site-footer .sf-line {
                display: block !important;
                width: calc(100% - 64px) !important;
                height: 1px !important;
                background: rgba(255,255,255,0.1) !important;
                margin: 0 32px !important;
                padding: 0 !important;
                border: none !important;
                box-sizing: border-box !important;
              }

              /* COPYRIGHT */
              .site-footer .sf-copy {
                display: block !important;
                width: 100% !important;
                text-align: center !important;
                padding: 1.2rem 4rem !important;
                font-size: 0.75rem !important;
                color: rgba(255,255,255,0.22) !important;
                letter-spacing: 0.03em !important;
                margin: 0 !important;
                box-sizing: border-box !important;
              }

              /* MOBILE */
              @media (max-width: 768px) {
                .site-footer .sf-grid {
                  grid-template-columns: 1fr !important;
                  padding: 2rem 1.5rem !important;
                  gap: 2rem !important;
                }
                .site-footer .sf-copy {
                  padding: 1rem 1.5rem !important;
                }
              }
            `}</style>

            {/* TOP GRID */}
            <div className="sf-grid">

              {/* LEFT */}
              <div className="sf-brand">
                <Image src="/assets/shiba-white.svg" alt="WOW Automation" width={100} height={32} />
                <div className="sf-brand-name">WOW Automation</div>
                <div className="sf-addr-ko">경기도, 대한민국</div>
                <div className="sf-addr-en">Gyeonggi-do, South Korea</div>
              </div>

              {/* MIDDLE */}
              <div className="sf-col">
                <div className="sf-col-title">{ft.aboutTitle}</div>
                <div className="sf-col-links">
                  {ft.links.map(l => (
                    <Link key={l.href} href={l.href}>{l.label}</Link>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="sf-col">
                <div className="sf-col-title">{ft.socialTitle}</div>
                <div className="sf-socials">
                  <a href="#" className="sf-social-btn" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  <a href="#" className="sf-social-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="#" className="sf-social-btn" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                    </svg>
                  </a>
                  <a href="#" className="sf-social-btn" aria-label="KakaoTalk">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.76 5.33 4.41 6.84l-.9 3.3a.3.3 0 00.44.34l3.8-2.53C10.5 18.98 11.24 19 12 19c5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* FULL-WIDTH LINE */}
            <span className="sf-line" />

            {/* COPYRIGHT */}
            <span className="sf-copy">{ft.copy}</span>

          </div>

        </LangContext.Provider>
      </body>
    </html>
  );
}