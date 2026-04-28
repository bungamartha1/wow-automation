"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import PartnersGrid from "@/components/ui/PartnersGrid";

const tr = {
  KO: {
    heroLabel:   "회사소개",
    heroTitle1:  "자동화로",
    heroTitle2:  "더 나은",
    heroTitle3:  "비즈니스를.",
    heroDesc:    "WOW Automation은 대한민국 기업의 업무 효율을 극대화하기 위해 설립된 RPA 전문기업입니다.",
    heroSince:   "Since 2024",
    heroLocation:"경기도, 대한민국",

    overviewLabel: "COMPANY OVERVIEW",
    overviewTitle: "WOW Automation 소개",
    founded:       "설립 연도",
    foundedVal:    "2024년",
    location:      "소재지",
    locationVal:   "경기도, 대한민국",
    specialty:     "전문 분야",
    specialtyVal:  "RPA · 지능형 자동화",
    overview1: "WOW Automation은 반복적이고 비효율적인 업무 프로세스를 자동화하여 기업이 본질적인 가치 창출에 집중할 수 있도록 돕습니다.",
    overview2: "컨설팅부터 설계, 개발, 배포까지 자동화의 전 과정을 책임지며, 고객사의 디지털 전환 여정을 함께합니다.",
    commitLabel: "우리의 약속",
    commits: [
      { n: "01", t: "현장 중심 접근", d: "고객사 현장을 직접 방문하여 실제 프로세스를 분석합니다." },
      { n: "02", t: "맞춤형 솔루션",  d: "획일화된 패키지가 아닌 귀사만을 위한 자동화를 설계합니다." },
      { n: "03", t: "지속적인 지원",  d: "배포 이후에도 지속적인 모니터링과 개선을 제공합니다." },
    ],

    visionLabel:   "VISION & MISSION",
    visionTitle:   "우리가 나아가는 방향",
    visionHead:    "Vision",
    visionText:    "자동화를 통해 모든 기업이 더 인간적인 일에 집중할 수 있는 세상을 만듭니다.",
    missionHead:   "Mission",
    missionText:   "고객의 비즈니스를 깊이 이해하고, 실질적인 성과를 만드는 자동화 솔루션을 제공합니다.",
    values: [
      { icon: "◆", t: "신뢰",   d: "고객과의 약속을 지키고 투명하게 소통합니다." },
      { icon: "◆", t: "전문성", d: "RPA 분야의 깊은 기술력과 경험으로 최고의 결과물을 만듭니다." },
      { icon: "◆", t: "성과",   d: "측정 가능한 ROI와 실질적인 업무 효율 향상을 보장합니다." },
    ],

    ceoLabel:   "CEO MESSAGE",
    ceoTitle:   "대표 인사말",
    ceoName:    "김승화",
    ceoRole:    "대표 / WOW Automation",
    ceoMessage: [
      "안녕하세요, WOW Automation 대표 김승화입니다.",
      "저는 오랫동안 기업 현장에서 반복 업무에 지쳐가는 직원들을 보아왔습니다. 뛰어난 인재들이 단순 데이터 입력이나 반복적인 보고서 작성에 시간을 쓰는 모습이 안타까웠습니다.",
      "WOW Automation은 그 문제를 해결하기 위해 시작했습니다. 자동화를 통해 직원들이 더 창의적이고 의미 있는 일에 집중할 수 있도록, 기업이 더 빠르게 성장할 수 있도록 돕는 것이 저희의 사명입니다.",
      "고객 한 분 한 분의 비즈니스를 내 일처럼 생각하며, 진심으로 함께 성장하겠습니다. 감사합니다.",
    ],

    partnersLabel: "PARTNERS",
    partnersTitle: "함께하는 파트너사",
    partnersDesc:  "WOW Automation과 함께 성장하는 파트너사들입니다.",

    ctaTitle: "자동화로 비즈니스를\n혁신할 준비가 되셨나요?",
    ctaBtn:   "무료 상담 신청",
  },
  EN: {
    heroLabel:   "ABOUT US",
    heroTitle1:  "Building",
    heroTitle2:  "Better",
    heroTitle3:  "Business.",
    heroDesc:    "WOW Automation is a Korean RPA specialist firm dedicated to maximizing operational efficiency for businesses.",
    heroSince:   "Since 2024",
    heroLocation:"Gyeonggi-do, South Korea",

    overviewLabel: "COMPANY OVERVIEW",
    overviewTitle: "About WOW Automation",
    founded:       "Founded",
    foundedVal:    "2024",
    location:      "Location",
    locationVal:   "Gyeonggi-do, South Korea",
    specialty:     "Specialty",
    specialtyVal:  "RPA · Intelligent Automation",
    overview1: "WOW Automation helps companies eliminate repetitive, inefficient processes so they can focus on creating real value.",
    overview2: "From consulting and design to development and deployment, we own the entire automation journey alongside our clients.",
    commitLabel: "Our Commitment",
    commits: [
      { n: "01", t: "Field-First Approach", d: "We visit your site and analyze your actual processes firsthand." },
      { n: "02", t: "Tailored Solutions",   d: "We design automation uniquely for your business, not off-the-shelf." },
      { n: "03", t: "Ongoing Support",      d: "We provide continuous monitoring and improvement post-deployment." },
    ],

    visionLabel:   "VISION & MISSION",
    visionTitle:   "Where We Are Headed",
    visionHead:    "Vision",
    visionText:    "A world where automation frees every business to focus on more human, more meaningful work.",
    missionHead:   "Mission",
    missionText:   "To deeply understand each client's business and deliver automation solutions that produce measurable results.",
    values: [
      { icon: "◆", t: "Trust",     d: "We keep our promises and communicate transparently." },
      { icon: "◆", t: "Expertise", d: "Deep technical knowledge in RPA delivers the best outcomes." },
      { icon: "◆", t: "Results",   d: "We guarantee measurable ROI and genuine efficiency gains." },
    ],

    ceoLabel:   "CEO MESSAGE",
    ceoTitle:   "A Message from Our CEO",
    ceoName:    "Seunghwa KIM",
    ceoRole:    "CEO / WOW Automation",
    ceoMessage: [
      "Hello, I'm Seunghwa KIM, CEO of WOW Automation.",
      "For years, I watched talented people exhaust themselves on repetitive work — data entry, routine reports, copy-paste tasks. It felt like a waste of human potential.",
      "WOW Automation was born from that observation. Our mission is to automate the repetitive, so that your team can focus on what truly matters: creative thinking, meaningful decisions, and real growth.",
      "We treat every client's business as if it were our own. Thank you for trusting us with your journey.",
    ],

    partnersLabel: "PARTNERS",
    partnersTitle: "Our Partners",
    partnersDesc:  "Companies that grow together with WOW Automation.",

    ctaTitle: "Ready to transform your\nbusiness with automation?",
    ctaBtn:   "Get a Free Consultation",
  },
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.75s ${delay}s ease, transform 0.75s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  const lang = useLang();
  const T = tr[lang];
  const [heroVis, setHeroVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        .ap * { box-sizing: border-box; }

        /* ─── HERO ─── */
        .ap-hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--bg);
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }
        /* Diagonal gold accent */
        .ap-hero::after {
          content: '';
          position: absolute;
          top: -10%; right: -5%;
          width: 55%; height: 130%;
          background: linear-gradient(160deg, rgba(201,168,76,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        /* Vertical gold rule */
        .ap-hero-rule {
          position: absolute;
          left: 50%; top: 80px; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--gold), transparent);
          opacity: 0.2;
        }

        .ap-hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: 6rem 4rem 6rem;
          position: relative; z-index: 2;
        }
        .ap-hero-label {
          font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 2.5rem;
          display: flex; align-items: center; gap: 0.75rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ap-hero-label.vis { opacity: 1; transform: translateY(0); }
        .ap-hero-label::before { content: ''; width: 32px; height: 1px; background: var(--gold); }

        .ap-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 6vw, 6rem);
          font-weight: 900; line-height: 0.95;
          color: var(--text);
          margin-bottom: 2rem;
        }
        .ap-hero-h1 .line1 {
          display: block;
          opacity: 0; transform: translateX(-30px);
          transition: opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease;
        }
        .ap-hero-h1 .line2 {
          display: block; color: var(--gold);
          font-style: italic;
          opacity: 0; transform: translateX(-30px);
          transition: opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease;
        }
        .ap-hero-h1 .line3 {
          display: block;
          opacity: 0; transform: translateX(-30px);
          transition: opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease;
        }
        .ap-hero-h1 .line1.vis, .ap-hero-h1 .line2.vis, .ap-hero-h1 .line3.vis {
          opacity: 1; transform: translateX(0);
        }
        .ap-hero-desc {
          font-size: 1rem; color: var(--text-dim); line-height: 1.8;
          max-width: 420px; margin-bottom: 3rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.7s 0.4s ease, transform 0.7s 0.4s ease;
        }
        .ap-hero-desc.vis { opacity: 1; transform: translateY(0); }

        .ap-hero-meta {
          display: flex; gap: 2rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.7s 0.5s ease, transform 0.7s 0.5s ease;
        }
        .ap-hero-meta.vis { opacity: 1; transform: translateY(0); }
        .ap-hero-meta-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .ap-hero-meta-label { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); opacity: 0.7; }
        .ap-hero-meta-value { font-size: 0.85rem; color: var(--text-dim); font-weight: 500; }

        /* Right side — large decorative number */
        .ap-hero-right {
          display: flex; flex-direction: column; justify-content: center; align-items: center;
          position: relative; z-index: 2; padding: 4rem;
          gap: 3rem;
        }
        .ap-hero-stat {
          text-align: center;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ap-hero-stat.vis { opacity: 1; transform: translateY(0); }
        .ap-hero-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 900; line-height: 1;
          color: var(--gold);
        }
        .ap-hero-stat-label {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-dim); margin-top: 0.5rem;
        }
        .ap-hero-stats-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem 3rem;
          border: 1px solid var(--border); padding: 2.5rem;
          position: relative;
        }
        .ap-hero-stats-row::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 40px; height: 3px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }

        /* ─── SECTION SHARED ─── */
        .ap-section { padding: 7rem 4rem; background: var(--bg); }
        .ap-section.alt { background: var(--bg-mid); }
        .ap-section-inner { max-width: 1200px; }

        .ap-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .ap-eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--gold); }
        .ap-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700; line-height: 1.15; color: var(--text);
          margin-bottom: 0.75rem;
        }
        .ap-rule { width: 48px; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); margin-bottom: 3.5rem; }

        /* ─── OVERVIEW ─── */
        .ap-overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
        .ap-overview-text p { color: var(--text-dim); line-height: 1.85; font-size: 0.95rem; margin-bottom: 1.2rem; }

        .ap-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border: 1px solid var(--border); margin-top: 2.5rem; }
        .ap-meta-cell { background: var(--card-bg); padding: 1.3rem 1.5rem; }
        .ap-meta-cell.full { grid-column: 1 / -1; }
        .ap-meta-k { font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.35rem; }
        .ap-meta-v { font-size: 0.92rem; font-weight: 600; color: var(--text); }

        .ap-commit-panel {
          background: var(--card-bg); border: 1px solid var(--border);
          padding: 2.5rem; position: relative;
        }
        .ap-commit-panel::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 48px; height: 3px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .ap-commit-label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.8rem; }
        .ap-commit-item { display: flex; gap: 1.2rem; padding: 1.2rem 0; border-bottom: 1px solid var(--border); }
        .ap-commit-item:last-child { border-bottom: none; padding-bottom: 0; }
        .ap-commit-n { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--gold); opacity: 0.4; min-width: 28px; line-height: 1.2; }
        .ap-commit-t { font-size: 0.88rem; font-weight: 600; color: var(--text); margin-bottom: 0.25rem; }
        .ap-commit-d { font-size: 0.8rem; color: var(--text-dim); line-height: 1.65; }

        /* ─── VISION ─── */
        .ap-vm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2.5rem; }
        .ap-vm-card {
          background: var(--card-bg); border: 1px solid var(--border);
          padding: 2.2rem 2rem; position: relative; overflow: hidden;
        }
        .ap-vm-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transition: width 0.5s ease;
        }
        .ap-vm-card:hover::before { width: 100%; }
        .ap-vm-head {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: 1.2rem; color: var(--gold); margin-bottom: 1rem;
        }
        .ap-vm-text { font-size: 0.9rem; color: var(--text-dim); line-height: 1.8; }

        .ap-values-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .ap-value {
          padding: 2rem 1.8rem;
          border: 1px solid var(--border);
          border-top: 2px solid var(--gold);
          background: var(--card-bg);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ap-value:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .ap-value-icon { font-size: 0.5rem; color: var(--gold); margin-bottom: 1rem; letter-spacing: 0.2em; }
        .ap-value-t { font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 0.5rem; }
        .ap-value-d { font-size: 0.82rem; color: var(--text-dim); line-height: 1.7; }

        /* ─── CEO ─── */
        .ap-ceo-layout {
          display: grid; grid-template-columns: 220px 1fr; gap: 5rem; align-items: start;
        }
        .ap-ceo-left { display: flex; flex-direction: column; gap: 1.2rem; }
        .ap-ceo-photo {
          width: 100%; aspect-ratio: 3/4;
          background: var(--bg-light); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; position: relative;
        }
        .ap-ceo-photo::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 40%;
          background: linear-gradient(to top, rgba(201,168,76,0.08), transparent);
        }
        .ap-ceo-placeholder { font-size: 4rem; opacity: 0.3; }
        .ap-ceo-name { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--text); }
        .ap-ceo-role { font-size: 0.72rem; color: var(--text-dim); letter-spacing: 0.06em; margin-top: 0.1rem; }

        .ap-ceo-right { padding-top: 0.5rem; }
        .ap-open-quote {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: 6rem; line-height: 0.7; color: var(--gold); opacity: 0.2;
          display: block; margin-bottom: 0.5rem; user-select: none;
        }
        .ap-ceo-paras { display: flex; flex-direction: column; gap: 1.1rem; margin-bottom: 2rem; }
        .ap-ceo-paras p { font-size: 0.95rem; color: var(--text-dim); line-height: 1.9; }
        .ap-ceo-paras p:first-child { color: var(--text); font-weight: 500; font-size: 1rem; }
        .ap-ceo-sig-line {
          display: flex; align-items: center; gap: 1rem;
          border-top: 1px solid var(--border); padding-top: 1.5rem;
        }
        .ap-ceo-sig-dash { width: 32px; height: 1px; background: var(--gold); opacity: 0.5; }
        .ap-ceo-sig-text { font-size: 0.8rem; color: var(--text-dim); font-style: italic; }

        /* ─── PARTNERS ─── */
        .ap-partners-desc { font-size: 0.9rem; color: var(--text-dim); margin-bottom: 2.5rem; max-width: 480px; }

        /* ─── CTA ─── */
        .ap-cta {
          padding: 8rem 4rem;
          background: var(--bg);
          border-top: 1px solid var(--border);
          display: grid; grid-template-columns: 1fr auto;
          gap: 3rem; align-items: center;
          position: relative; overflow: hidden;
        }
        .ap-cta::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .ap-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 700; line-height: 1.15; color: var(--text);
          white-space: pre-line;
        }
        .ap-cta-title .gold { color: var(--gold); font-style: italic; }
        .ap-cta-btn {
          display: inline-block; white-space: nowrap;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: #fff; border: none; border-radius: 2px;
          padding: 1.1rem 2.8rem; font-size: 0.85rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; font-family: 'DM Sans', sans-serif;
          transition: all 0.3s; position: relative; overflow: hidden;
        }
        html.light .ap-cta-btn { color: #1a2035; }
        .ap-cta-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .ap-cta-btn:hover::after { transform: translateX(0); }
        .ap-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(184,147,62,0.4); }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .ap-hero { grid-template-columns: 1fr; min-height: auto; }
          .ap-hero-right { display: none; }
          .ap-hero-rule { display: none; }
          .ap-hero-left { padding: 6rem 2rem 4rem; }
          .ap-section { padding: 5rem 2rem; }
          .ap-overview-grid { grid-template-columns: 1fr; gap: 3rem; }
          .ap-vm-row { grid-template-columns: 1fr; }
          .ap-values-row { grid-template-columns: 1fr; }
          .ap-ceo-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .ap-ceo-left { flex-direction: row; align-items: center; gap: 1.5rem; }
          .ap-ceo-photo { width: 100px; aspect-ratio: 1; }
          .ap-cta { grid-template-columns: 1fr; padding: 4rem 2rem; }
          .ap-cta-title { white-space: normal; }
        }
      `}</style>

      <div className="ap">

        {/* ── HERO ── */}
        <div className="ap-hero">
          <div className="ap-hero-rule" />

          <div className="ap-hero-left">
            <div className={`ap-hero-label${heroVis ? " vis" : ""}`}>{T.heroLabel}</div>
            <h1 className="ap-hero-h1">
              <span className={`line1${heroVis ? " vis" : ""}`}>{T.heroTitle1}</span>
              <span className={`line2${heroVis ? " vis" : ""}`}>{T.heroTitle2}</span>
              <span className={`line3${heroVis ? " vis" : ""}`}>{T.heroTitle3}</span>
            </h1>
            <p className={`ap-hero-desc${heroVis ? " vis" : ""}`}>{T.heroDesc}</p>
            <div className={`ap-hero-meta${heroVis ? " vis" : ""}`}>
              <div className="ap-hero-meta-item">
                <span className="ap-hero-meta-label">Est.</span>
                <span className="ap-hero-meta-value">{T.heroSince}</span>
              </div>
              <div style={{ width: "1px", background: "var(--border)", alignSelf: "stretch" }} />
              <div className="ap-hero-meta-item">
                <span className="ap-hero-meta-label">Location</span>
                <span className="ap-hero-meta-value">{T.heroLocation}</span>
              </div>
            </div>
          </div>

          {/* Right — stats */}
          <div className="ap-hero-right">
            <div className={`ap-hero-stats-row${heroVis ? " vis" : ""}`} style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(24px)", transition: "opacity 0.8s 0.3s ease, transform 0.8s 0.3s ease" }}>
              {[
                { v: "500+",  l: lang === "KO" ? "봇 배포" : "Bots Deployed" },
                { v: "87%",   l: lang === "KO" ? "시간 절약" : "Time Saved" },
                { v: "3x",    l: lang === "KO" ? "6개월 ROI" : "ROI in 6mo" },
                { v: "99.9%", l: lang === "KO" ? "업타임" : "Uptime" },
              ].map(s => (
                <div key={s.l} className="ap-hero-stat vis">
                  <div className="ap-hero-stat-value">{s.v}</div>
                  <div className="ap-hero-stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        <div className="ap-section">
          <Reveal><div className="ap-eyebrow">{T.overviewLabel}</div></Reveal>
          <Reveal delay={0.05}><h2 className="ap-h2">{T.overviewTitle}</h2></Reveal>
          <Reveal delay={0.1}><div className="ap-rule" /></Reveal>
          <div className="ap-overview-grid">
            <Reveal delay={0.1}>
              <div className="ap-overview-text">
                <p>{T.overview1}</p>
                <p>{T.overview2}</p>
                <div className="ap-meta-grid">
                  <div className="ap-meta-cell">
                    <div className="ap-meta-k">{T.founded}</div>
                    <div className="ap-meta-v">{T.foundedVal}</div>
                  </div>
                  <div className="ap-meta-cell">
                    <div className="ap-meta-k">{T.location}</div>
                    <div className="ap-meta-v">{T.locationVal}</div>
                  </div>
                  <div className="ap-meta-cell full">
                    <div className="ap-meta-k">{T.specialty}</div>
                    <div className="ap-meta-v">{T.specialtyVal}</div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="ap-commit-panel">
                <div className="ap-commit-label">{T.commitLabel}</div>
                {T.commits.map(c => (
                  <div key={c.n} className="ap-commit-item">
                    <div className="ap-commit-n">{c.n}</div>
                    <div>
                      <div className="ap-commit-t">{c.t}</div>
                      <div className="ap-commit-d">{c.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── VISION & MISSION ── */}
        <div className="ap-section alt">
          <Reveal><div className="ap-eyebrow">{T.visionLabel}</div></Reveal>
          <Reveal delay={0.05}><h2 className="ap-h2">{T.visionTitle}</h2></Reveal>
          <Reveal delay={0.1}><div className="ap-rule" /></Reveal>
          <Reveal delay={0.15}>
            <div className="ap-vm-row">
              <div className="ap-vm-card">
                <div className="ap-vm-head">{T.visionHead}</div>
                <div className="ap-vm-text">{T.visionText}</div>
              </div>
              <div className="ap-vm-card">
                <div className="ap-vm-head">{T.missionHead}</div>
                <div className="ap-vm-text">{T.missionText}</div>
              </div>
            </div>
          </Reveal>
          <div className="ap-values-row">
            {T.values.map((v, i) => (
              <Reveal key={v.t} delay={0.1 + i * 0.1}>
                <div className="ap-value">
                  <div className="ap-value-icon">{v.icon} {v.icon} {v.icon}</div>
                  <div className="ap-value-t">{v.t}</div>
                  <div className="ap-value-d">{v.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── CEO MESSAGE ── */}
        <div className="ap-section">
          <Reveal><div className="ap-eyebrow">{T.ceoLabel}</div></Reveal>
          <Reveal delay={0.05}><h2 className="ap-h2">{T.ceoTitle}</h2></Reveal>
          <Reveal delay={0.1}><div className="ap-rule" /></Reveal>
          <Reveal delay={0.15}>
            <div className="ap-ceo-layout">
              <div className="ap-ceo-left">
                <div className="ap-ceo-photo">
                  <img
                  src="/assets/ceo_sh.jpg"
                  alt={T.ceoName}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <div>
                  <div className="ap-ceo-name">{T.ceoName}</div>
                  <div className="ap-ceo-role">{T.ceoRole}</div>
                </div>
              </div>
              <div className="ap-ceo-right">
                <span className="ap-open-quote">"</span>
                <div className="ap-ceo-paras">
                  {T.ceoMessage.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="ap-ceo-sig-line">
                  <div className="ap-ceo-sig-dash" />
                  <div className="ap-ceo-sig-text">{T.ceoName}, {T.ceoRole}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── PARTNERS ── */}
        <div className="ap-section alt">
          <Reveal><div className="ap-eyebrow">{T.partnersLabel}</div></Reveal>
          <Reveal delay={0.05}><h2 className="ap-h2">{T.partnersTitle}</h2></Reveal>
          <Reveal delay={0.1}><div className="ap-rule" /></Reveal>
          <Reveal delay={0.15}><p className="ap-partners-desc">{T.partnersDesc}</p></Reveal>
          <Reveal delay={0.2}><PartnersGrid /></Reveal>
        </div>

        {/* ── CTA ── */}
        <Reveal>
          <div className="ap-cta">
            <div className="ap-cta-title">
              {T.ctaTitle.split("\n").map((line, i) => (
                <span key={i}>{i === 1 ? <span className="gold">{line}</span> : line}{i === 0 ? "\n" : ""}</span>
              ))}
            </div>
            <Link href="/#contact" className="ap-cta-btn">{T.ctaBtn}</Link>
          </div>
        </Reveal>

      </div>
    </>
  );
}