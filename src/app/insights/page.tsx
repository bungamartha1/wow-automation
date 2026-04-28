"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

/* ─── DATA ─── */
const POSTS = {
  KO: [
    {
      id: 1,
      category: "트렌드",
      tag: "industry",
      featured: true,
      date: "2025. 03. 01",
      readTime: "5분",
      title: "2025년 대한민국 RPA 시장 전망: AI와의 융합이 가져올 변화",
      excerpt: "국내 RPA 시장은 2025년을 기점으로 단순 자동화를 넘어 AI와 결합된 지능형 자동화로 빠르게 전환되고 있습니다. Microsoft Power Automate를 중심으로 한 로우코드 플랫폼의 확산이 중소기업까지 자동화의 문턱을 낮추고 있습니다.",
      author: "WOW Automation 편집팀",
    },
    {
      id: 2,
      category: "RPA 팁",
      tag: "tips",
      featured: false,
      date: "2025. 02. 18",
      readTime: "4분",
      title: "Power Automate 도입 전 반드시 확인해야 할 5가지 체크리스트",
      excerpt: "RPA 도입 실패의 70%는 사전 준비 부족에서 비롯됩니다. 프로세스 선정부터 ROI 측정 방법까지, 성공적인 자동화를 위한 필수 체크리스트를 공유합니다.",
      author: "김승화 대표",
    },
    {
      id: 3,
      category: "공지",
      tag: "announcement",
      featured: false,
      date: "2025. 02. 05",
      readTime: "2분",
      title: "WOW Automation, 한국핀테크(주) RPA 구축 프로젝트 성공적 완료",
      excerpt: "WOW Automation이 한국핀테크(주)의 인보이스 처리 자동화 프로젝트를 성공적으로 완료했습니다. 월 3,200건 처리, 87% 시간 절감이라는 성과를 달성했습니다.",
      author: "WOW Automation",
    },
    {
      id: 4,
      category: "트렌드",
      tag: "industry",
      featured: false,
      date: "2025. 01. 22",
      readTime: "6분",
      title: "제조업 디지털 전환의 핵심: MES-ERP 연동 자동화 사례 분석",
      excerpt: "국내 제조업체들이 MES와 ERP 시스템 간 데이터 연동에 RPA를 도입해 생산성을 획기적으로 높이고 있습니다. 실제 사례와 함께 도입 방법론을 소개합니다.",
      author: "WOW Automation 기술팀",
    },
    {
      id: 5,
      category: "RPA 팁",
      tag: "tips",
      featured: false,
      date: "2025. 01. 10",
      readTime: "3분",
      title: "ROI 계산법: 우리 회사 RPA 투자 대비 효과를 정확히 측정하는 방법",
      excerpt: "많은 기업들이 RPA 도입 후 실질적인 ROI를 측정하지 못합니다. 시간 절감, 오류 감소, 직원 만족도까지 포함한 종합적인 ROI 측정 프레임워크를 소개합니다.",
      author: "김승화 대표",
    },
    {
      id: 6,
      category: "공지",
      tag: "announcement",
      featured: false,
      date: "2024. 12. 20",
      readTime: "2분",
      title: "WOW Automation 공식 홈페이지 오픈 안내",
      excerpt: "안녕하세요, WOW Automation입니다. 2024년 설립 이후 꾸준히 성장해온 저희가 드디어 공식 홈페이지를 오픈하게 되었습니다. 앞으로도 많은 관심과 성원 부탁드립니다.",
      author: "WOW Automation",
    },
  ],
  EN: [
    {
      id: 1,
      category: "Trends",
      tag: "industry",
      featured: true,
      date: "Mar 1, 2025",
      readTime: "5 min",
      title: "Korea RPA Market Outlook 2025: How AI Fusion Is Changing Everything",
      excerpt: "The Korean RPA market is rapidly shifting beyond simple automation toward AI-powered intelligent automation. The spread of low-code platforms like Microsoft Power Automate is lowering the barrier to entry even for SMEs.",
      author: "WOW Automation Editorial",
    },
    {
      id: 2,
      category: "RPA Tips",
      tag: "tips",
      featured: false,
      date: "Feb 18, 2025",
      readTime: "4 min",
      title: "5 Checklists You Must Review Before Adopting Power Automate",
      excerpt: "70% of RPA failures stem from inadequate preparation. We share the essential checklist for successful automation — from process selection to ROI measurement methods.",
      author: "Seunghwa KIM, CEO",
    },
    {
      id: 3,
      category: "Announcement",
      tag: "announcement",
      featured: false,
      date: "Feb 5, 2025",
      readTime: "2 min",
      title: "WOW Automation Successfully Completes RPA Project for Korea Fintech Corp",
      excerpt: "WOW Automation has successfully completed an invoice processing automation project for Korea Fintech Corp, achieving 3,200 monthly transactions processed with 87% time reduction.",
      author: "WOW Automation",
    },
    {
      id: 4,
      category: "Trends",
      tag: "industry",
      featured: false,
      date: "Jan 22, 2025",
      readTime: "6 min",
      title: "Manufacturing Digital Transformation: MES-ERP Integration Automation Case Study",
      excerpt: "Korean manufacturers are dramatically improving productivity by adopting RPA for MES-ERP data integration. We introduce real-world cases and implementation methodology.",
      author: "WOW Automation Tech Team",
    },
    {
      id: 5,
      category: "RPA Tips",
      tag: "tips",
      featured: false,
      date: "Jan 10, 2025",
      readTime: "3 min",
      title: "ROI Calculation: How to Accurately Measure Your Company's RPA Returns",
      excerpt: "Many companies fail to measure actual ROI after RPA adoption. We introduce a comprehensive ROI measurement framework covering time savings, error reduction, and employee satisfaction.",
      author: "Seunghwa KIM, CEO",
    },
    {
      id: 6,
      category: "Announcement",
      tag: "announcement",
      featured: false,
      date: "Dec 20, 2024",
      readTime: "2 min",
      title: "WOW Automation Official Website Launch",
      excerpt: "Hello, this is WOW Automation. After steady growth since our founding in 2024, we are proud to officially launch our website. We look forward to your continued support.",
      author: "WOW Automation",
    },
  ],
};

const CATEGORY_FILTERS = {
  KO: ["전체", "트렌드", "RPA 팁", "공지"],
  EN: ["All",  "Trends", "RPA Tips", "Announcement"],
};

const TAG_MAP: Record<string, string> = {
  "트렌드": "industry", "Trends": "industry",
  "RPA 팁": "tips",    "RPA Tips": "tips",
  "공지": "announcement", "Announcement": "announcement",
};

const TAG_COLORS: Record<string, string> = {
  industry:     "rgba(59,130,246,0.15)",
  tips:         "rgba(201,168,76,0.15)",
  announcement: "rgba(16,185,129,0.15)",
};
const TAG_TEXT: Record<string, string> = {
  industry:     "#60a5fa",
  tips:         "#c9a84c",
  announcement: "#34d399",
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

export default function InsightsPage() {
  const lang = useLang();
  const posts = POSTS[lang];
  const filters = CATEGORY_FILTERS[lang];

  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [heroVis, setHeroVis] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroVis(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => { setActiveFilter(filters[0]); }, [lang]);

  const featured = posts.find(p => p.featured)!;
  const rest = posts.filter(p => !p.featured);

  const filtered = activeFilter === filters[0]
    ? rest
    : rest.filter(p => p.tag === TAG_MAP[activeFilter]);

  const tr = {
    KO: {
      heroLabel:  "인사이트",
      heroTitle1: "자동화의",
      heroTitle2: "최신 트렌드와",
      heroTitle3: "인사이트.",
      heroDesc:   "RPA 업계 동향, 실무 팁, WOW Automation 소식을 한 곳에서 확인하세요.",
      featuredLabel: "FEATURED",
      readMore:   "자세히 읽기 →",
      readTime:   (t: string) => `읽는 시간 ${t}`,
      comingSoon: "더 많은 콘텐츠가 준비 중입니다.",
      ctaTitle:   "자동화 전문가의\n인사이트를 받아보세요.",
      ctaDesc:    "WOW Automation의 최신 소식과 RPA 트렌드를 이메일로 받아보세요.",
      ctaBtn:     "뉴스레터 구독",
      ctaOr:      "또는",
      ctaConsult: "무료 상담 신청 →",
    },
    EN: {
      heroLabel:  "INSIGHTS",
      heroTitle1: "Trends &",
      heroTitle2: "Insights on",
      heroTitle3: "Automation.",
      heroDesc:   "Industry trends, practical RPA tips, and WOW Automation news — all in one place.",
      featuredLabel: "FEATURED",
      readMore:   "Read More →",
      readTime:   (t: string) => `${t} read`,
      comingSoon: "More content coming soon.",
      ctaTitle:   "Get insights from\nautomation experts.",
      ctaDesc:    "Receive the latest WOW Automation news and RPA trends by email.",
      ctaBtn:     "Subscribe to Newsletter",
      ctaOr:      "or",
      ctaConsult: "Get Free Consultation →",
    },
  }[lang];

  const tagColor = (tag: string) => TAG_COLORS[tag] || "rgba(201,168,76,0.1)";
  const tagText  = (tag: string) => TAG_TEXT[tag]  || "#c9a84c";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        .ins * { box-sizing: border-box; }

        /* ── HERO ── */
        .ins-hero {
          min-height: 55vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 10rem 4rem 5rem;
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .ins-hero::after {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 40%; height: 100%;
          background: linear-gradient(160deg, rgba(201,168,76,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .ins-hero-label {
          font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 2rem;
          display: flex; align-items: center; gap: 0.75rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ins-hero-label.vis { opacity: 1; transform: translateY(0); }
        .ins-hero-label::before { content: ''; width: 32px; height: 1px; background: var(--gold); }
        .ins-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 5.5vw, 5.5rem);
          font-weight: 900; line-height: 1;
          color: var(--text); margin-bottom: 1.5rem;
        }
        .ins-hero-h1 .line1 { display: block; opacity: 0; transform: translateX(-24px); transition: opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease; }
        .ins-hero-h1 .line2 { display: block; color: var(--gold); font-style: italic; opacity: 0; transform: translateX(-24px); transition: opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease; }
        .ins-hero-h1 .line3 { display: block; opacity: 0; transform: translateX(-24px); transition: opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease; }
        .ins-hero-h1 .line1.vis, .ins-hero-h1 .line2.vis, .ins-hero-h1 .line3.vis { opacity: 1; transform: translateX(0); }
        .ins-hero-desc {
          font-size: 1rem; color: var(--text-dim); line-height: 1.8; max-width: 520px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.7s 0.4s ease, transform 0.7s 0.4s ease;
        }
        .ins-hero-desc.vis { opacity: 1; transform: translateY(0); }

        /* ── FEATURED ── */
        .ins-featured-section { padding: 4rem 4rem 0; background: var(--bg); }
        .ins-featured {
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid var(--border);
          background: var(--card-bg);
          position: relative; overflow: hidden;
          transition: box-shadow 0.3s ease;
        }
        .ins-featured:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
        .ins-featured::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light), transparent);
        }
        .ins-featured-visual {
          background: var(--bg-mid);
          min-height: 320px;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          border-right: 1px solid var(--border);
        }
        .ins-featured-visual-inner {
          text-align: center; padding: 3rem;
        }
        .ins-featured-visual-icon {
          font-family: 'Playfair Display', serif;
          font-size: 5rem; font-weight: 900; font-style: italic;
          color: var(--gold); opacity: 0.15; line-height: 1;
          user-select: none;
        }
        .ins-featured-content { padding: 3rem; display: flex; flex-direction: column; justify-content: center; }
        .ins-featured-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .ins-featured-badge {
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          background: var(--gold); color: #fff;
          padding: 0.25rem 0.6rem; font-weight: 700;
        }
        html.light .ins-featured-badge { color: #1a2035; }
        .ins-cat-tag {
          font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.25rem 0.6rem; font-weight: 600;
        }
        .ins-featured-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 2.5vw, 1.8rem); font-weight: 700; line-height: 1.25;
          color: var(--text); margin-bottom: 1rem;
        }
        .ins-featured-excerpt { font-size: 0.88rem; color: var(--text-dim); line-height: 1.8; margin-bottom: 1.5rem; flex: 1; }
        .ins-featured-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .ins-meta-text { font-size: 0.75rem; color: var(--text-dim); }
        .ins-meta-sep { width: 3px; height: 3px; border-radius: 50%; background: var(--border); }
        .ins-read-more {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.82rem; font-weight: 600; color: var(--gold);
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; padding: 0;
          text-decoration: none; transition: gap 0.2s;
        }
        .ins-read-more:hover { gap: 0.7rem; }

        /* ── FILTER + GRID ── */
        .ins-grid-section { padding: 4rem; background: var(--bg); }
        .ins-grid-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;
          padding-bottom: 1.5rem; border-bottom: 1px solid var(--border);
        }
        .ins-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .ins-filter-btn {
          padding: 0.45rem 1.1rem;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em;
          font-family: 'DM Sans', sans-serif; text-transform: uppercase;
          border: 1px solid var(--border);
          background: transparent; color: var(--text-dim);
          cursor: pointer; transition: all 0.2s;
        }
        .ins-filter-btn:hover { border-color: var(--gold); color: var(--gold); }
        .ins-filter-btn.active { background: var(--gold); border-color: var(--gold); color: #fff; }
        html.light .ins-filter-btn.active { color: #1a2035; }

        .ins-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

        /* ── POST CARD ── */
        .ins-card {
          background: var(--card-bg); border: 1px solid var(--border);
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: default;
        }
        .ins-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transition: width 0.4s ease;
        }
        .ins-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.08); border-color: var(--gold); }
        .ins-card:hover::before { width: 100%; }

        .ins-card-visual {
          height: 120px; background: var(--bg-mid);
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid var(--border);
          overflow: hidden;
        }
        .ins-card-visual-text {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: 3rem; font-weight: 900;
          color: var(--gold); opacity: 0.12; user-select: none;
        }
        .ins-card-body { padding: 1.5rem 1.75rem; flex: 1; display: flex; flex-direction: column; }
        .ins-card-top { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem; }
        .ins-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; line-height: 1.35;
          color: var(--text); margin-bottom: 0.75rem;
        }
        .ins-card-excerpt { font-size: 0.8rem; color: var(--text-dim); line-height: 1.7; flex: 1; margin-bottom: 1.2rem; }
        .ins-card-foot {
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid var(--border); padding-top: 1rem; margin-top: auto;
        }
        .ins-card-author { font-size: 0.72rem; color: var(--text-dim); }
        .ins-card-date { font-size: 0.7rem; color: var(--text-dim); opacity: 0.7; }

        /* Coming soon */
        .ins-coming-soon {
          grid-column: 1 / -1;
          text-align: center; padding: 4rem 2rem;
          border: 1px dashed var(--border);
          color: var(--text-dim); font-size: 0.88rem;
        }

        /* ── CTA ── */
        .ins-cta {
          margin: 4rem 4rem;
          padding: 4rem;
          background: var(--bg-mid);
          border: 1px solid var(--border);
          position: relative; overflow: hidden;
          text-align: center;
        }
        .ins-cta::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .ins-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700; color: var(--text);
          white-space: pre-line; margin-bottom: 0.75rem; line-height: 1.2;
        }
        .ins-cta-desc { font-size: 0.9rem; color: var(--text-dim); margin-bottom: 2rem; }
        .ins-cta-actions { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
        .ins-cta-btn {
          display: inline-block;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: #fff; border: none; border-radius: 2px;
          padding: 0.9rem 2.2rem; font-size: 0.85rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          text-decoration: none; font-family: 'DM Sans', sans-serif;
          cursor: pointer; transition: all 0.25s;
        }
        html.light .ins-cta-btn { color: #1a2035; }
        .ins-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,147,62,0.35); }
        .ins-cta-or { font-size: 0.78rem; color: var(--text-dim); }
        .ins-cta-link {
          font-size: 0.85rem; font-weight: 600; color: var(--gold);
          text-decoration: none; transition: opacity 0.2s;
        }
        .ins-cta-link:hover { opacity: 0.7; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .ins-hero { padding: 8rem 2rem 4rem; min-height: auto; }
          .ins-featured-section { padding: 3rem 2rem 0; }
          .ins-featured { grid-template-columns: 1fr; }
          .ins-featured-visual { min-height: 160px; border-right: none; border-bottom: 1px solid var(--border); }
          .ins-grid-section { padding: 3rem 2rem; }
          .ins-grid { grid-template-columns: 1fr; }
          .ins-cta { margin: 2rem; padding: 2.5rem 1.5rem; }
          .ins-cta-title { white-space: normal; }
        }
      `}</style>

      <div className="ins">

        {/* ── HERO ── */}
        <div className="ins-hero">
          <div className={`ins-hero-label${heroVis ? " vis" : ""}`}>{tr.heroLabel}</div>
          <h1 className="ins-hero-h1">
            <span className={`line1${heroVis ? " vis" : ""}`}>{tr.heroTitle1}</span>
            <span className={`line2${heroVis ? " vis" : ""}`}>{tr.heroTitle2}</span>
            <span className={`line3${heroVis ? " vis" : ""}`}>{tr.heroTitle3}</span>
          </h1>
          <p className={`ins-hero-desc${heroVis ? " vis" : ""}`}>{tr.heroDesc}</p>
        </div>

        {/* ── FEATURED POST ── */}
        <div className="ins-featured-section">
          <Reveal>
            <div className="ins-featured">
              <div className="ins-featured-visual">
                <div className="ins-featured-visual-inner">
                  <div className="ins-featured-visual-icon">RPA</div>
                </div>
              </div>
              <div className="ins-featured-content">
                <div className="ins-featured-top">
                  <span className="ins-featured-badge">{tr.featuredLabel}</span>
                  <span
                    className="ins-cat-tag"
                    style={{ background: tagColor(featured.tag), color: tagText(featured.tag) }}
                  >
                    {featured.category}
                  </span>
                </div>
                <h2 className="ins-featured-title">{featured.title}</h2>
                <p className="ins-featured-excerpt">{featured.excerpt}</p>
                <div className="ins-featured-meta">
                  <span className="ins-meta-text">{featured.author}</span>
                  <div className="ins-meta-sep" />
                  <span className="ins-meta-text">{featured.date}</span>
                  <div className="ins-meta-sep" />
                  <span className="ins-meta-text">{tr.readTime(featured.readTime)}</span>
                </div>
                <a href="#" className="ins-read-more">{tr.readMore}</a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── GRID ── */}
        <div className="ins-grid-section">
          <div className="ins-grid-header">
            <div className="ins-filters">
              {filters.map(f => (
                <button
                  key={f}
                  className={`ins-filter-btn${activeFilter === f ? " active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="ins-grid">
            {filtered.length === 0 ? (
              <div className="ins-coming-soon">{tr.comingSoon}</div>
            ) : (
              filtered.map((post, i) => (
                <Reveal key={post.id} delay={i % 3 * 0.08}>
                  <div className="ins-card">
                    <div className="ins-card-visual">
                      <div className="ins-card-visual-text">{post.category}</div>
                    </div>
                    <div className="ins-card-body">
                      <div className="ins-card-top">
                        <span
                          className="ins-cat-tag"
                          style={{ background: tagColor(post.tag), color: tagText(post.tag) }}
                        >
                          {post.category}
                        </span>
                        <span className="ins-meta-text">{tr.readTime(post.readTime)}</span>
                      </div>
                      <div className="ins-card-title">{post.title}</div>
                      <p className="ins-card-excerpt">{post.excerpt}</p>
                      <div className="ins-card-foot">
                        <span className="ins-card-author">{post.author}</span>
                        <span className="ins-card-date">{post.date}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>

        {/* ── CTA ── */}
        <Reveal>
          <div className="ins-cta">
            <div className="ins-cta-title">{tr.ctaTitle}</div>
            <p className="ins-cta-desc">{tr.ctaDesc}</p>
            <div className="ins-cta-actions">
              <Link href="/#contact" className="ins-cta-btn">{tr.ctaBtn}</Link>
              <span className="ins-cta-or">{tr.ctaOr}</span>
              <Link href="/#contact" className="ins-cta-link">{tr.ctaConsult}</Link>
            </div>
          </div>
        </Reveal>

      </div>
    </>
  );
}