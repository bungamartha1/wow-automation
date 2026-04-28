"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

/* ─── DATA ─── */
const PROJECTS = {
  KO: [
    {
      id: 1,
      industry: "금융",
      company: "알튼코리아",
      title: "인보이스 자동 처리 시스템",
      summary: "월 3,000건 이상의 인보이스를 수동으로 처리하던 업무를 Power Automate로 완전 자동화했습니다.",
      before: "담당자 3명이 하루 평균 6시간씩 인보이스를 수기로 입력하고 검토",
      after: "Power Automate 봇이 24/7 자동 처리, 오류율 0.1% 이하 달성",
      stats: [
        { label: "처리 시간 절감", value: "87%" },
        { label: "월 처리 건수", value: "3,200+" },
        { label: "ROI 달성 기간", value: "1개월" },
      ],
      tech: ["Power Automate", "SharePoint", "SAP"],
      duration: "3주",
    },
    {
      id: 2,
      industry: "물류",
      company: "경동나비엔",
      title: "배송 현황 자동 보고 시스템",
      summary: "매일 수동으로 작성하던 배송 현황 보고서를 자동화하여 운영 효율을 3배 향상시켰습니다.",
      before: "물류팀이 매일 오전 2시간씩 ERP에서 데이터를 수집해 엑셀 보고서 작성",
      after: "Power Automate가 자동으로 데이터 수집 후 보고서 생성 및 이메일 발송",
      stats: [
        { label: "업무 시간 절감", value: "90%" },
        { label: "6개월 ROI", value: "3x" },
        { label: "배포 기간", value: "3주" },
      ],
      tech: ["Power Automate", "Excel", "Outlook"],
      duration: "3주",
    },
    {
      id: 3,
      industry: "의료",
      company: "충남대학교병원",
      title: "환자 접수 및 예약 자동화",
      summary: "전화 및 온라인으로 분산된 예약 데이터를 통합하고 접수 프로세스를 자동화했습니다.",
      before: "접수 담당자가 전화, 카카오, 홈페이지 등 3개 채널의 예약을 수동으로 통합 관리",
      after: "Power Automate가 모든 채널의 예약을 자동 수집·분류·입력, 알림 문자 자동 발송",
      stats: [
        { label: "대기 시간 감소", value: "70%" },
        { label: "예약 오류율", value: "0%" },
        { label: "업타임 SLA", value: "99.9%" },
      ],
      tech: ["Power Automate", "Teams", "Dataverse"],
      duration: "4주",
    },
    {
      id: 4,
      industry: "제조",
      company: "웅진",
      title: "생산 실적 데이터 자동 집계",
      summary: "현장 PLC 시스템과 ERP 간 데이터 연동을 자동화하여 실시간 생산 현황 파악이 가능해졌습니다.",
      before: "공장 관리자가 각 라인별 생산 데이터를 수동으로 취합, 일 1회 ERP에 입력",
      after: "Power Automate가 시간별 자동 집계 및 ERP 입력, 이상 발생 시 즉시 알림",
      stats: [
        { label: "데이터 입력 시간", value: "95% 절감" },
        { label: "실시간 정확도", value: "99.8%" },
        { label: "이상 감지 속도", value: "즉시" },
      ],
      tech: ["Power Automate", "Power BI", "SAP"],
      duration: "5주",
    },
    {
      id: 5,
      industry: "HR",
      company: "로얄앤컴퍼니",
      title: "입사 온보딩 프로세스 자동화",
      summary: "신규 입사자 온보딩에 필요한 계정 생성, 문서 발송, 교육 일정 안내를 모두 자동화했습니다.",
      before: "HR 담당자가 신규 입사자 1인당 평균 4시간의 온보딩 행정 업무 수행",
      after: "Power Automate가 계정 생성부터 웰컴 패키지 발송까지 자동 처리",
      stats: [
        { label: "온보딩 시간 절감", value: "80%" },
        { label: "인당 처리 시간", value: "45분 → 9분" },
        { label: "직원 만족도", value: "4.8/5" },
      ],
      tech: ["Power Automate", "Microsoft 365", "Teams"],
      duration: "2주",
    },
    {
      id: 6,
      industry: "금융",
      company: "한국자동차환경협회",
      title: "규정 준수 보고서 자동 생성",
      summary: "금융감독원 제출용 규정 준수 보고서를 자동 생성하여 컴플라이언스 팀의 부담을 대폭 줄였습니다.",
      before: "컴플라이언스 팀이 매주 40시간을 투자해 각종 규정 보고서를 수동 작성",
      after: "Power Automate가 데이터 수집·분석·보고서 생성 전 과정 자동화",
      stats: [
        { label: "주간 업무 절감", value: "38시간" },
        { label: "보고서 정확도", value: "100%" },
        { label: "ROI", value: "5x" },
      ],
      tech: ["Power Automate", "Power BI", "SharePoint"],
      duration: "6주",
    },
  ],
  EN: [
    {
      id: 1,
      industry: "Finance",
      company: "Alten Korea",
      title: "Automated Invoice Processing System",
      summary: "Fully automated manual processing of 3,000+ monthly invoices using Power Automate.",
      before: "3 staff members spent an average of 6 hours/day manually entering and reviewing invoices",
      after: "Power Automate bots process 24/7 with error rate below 0.1%",
      stats: [
        { label: "Time Reduction", value: "87%" },
        { label: "Monthly Volume", value: "3,200+" },
        { label: "ROI Timeline", value: "1 Month" },
      ],
      tech: ["Power Automate", "SharePoint", "SAP"],
      duration: "3 Weeks",
    },
    {
      id: 2,
      industry: "Logistics",
      company: "Kyungdong Navien",
      title: "Automated Delivery Status Reporting",
      summary: "Automated daily delivery reports, tripling operational efficiency.",
      before: "Logistics team spent 2 hours every morning manually extracting ERP data for Excel reports",
      after: "Power Automate automatically collects data, generates reports, and emails stakeholders",
      stats: [
        { label: "Time Saved", value: "90%" },
        { label: "6-Month ROI", value: "3x" },
        { label: "Deployment", value: "3 Weeks" },
      ],
      tech: ["Power Automate", "Excel", "Outlook"],
      duration: "3 Weeks",
    },
    {
      id: 3,
      industry: "Healthcare",
      company: "Chungnam National University Hospita",
      title: "Patient Intake & Appointment Automation",
      summary: "Unified appointment data from multiple channels and automated the intake process.",
      before: "Receptionists manually consolidated bookings from phone, KakaoTalk, and website",
      after: "Power Automate collects, sorts, and enters all bookings automatically with SMS notifications",
      stats: [
        { label: "Wait Time Reduction", value: "70%" },
        { label: "Booking Error Rate", value: "0%" },
        { label: "Uptime SLA", value: "99.9%" },
      ],
      tech: ["Power Automate", "Teams", "Dataverse"],
      duration: "4 Weeks",
    },
    {
      id: 4,
      industry: "Manufacturing",
      company: "Woongjin",
      title: "Production Data Auto-Aggregation",
      summary: "Automated data sync between PLC systems and ERP for real-time production visibility.",
      before: "Factory managers manually collected per-line production data and entered it into ERP once daily",
      after: "Power Automate aggregates hourly and sends instant alerts for anomalies",
      stats: [
        { label: "Data Entry Time", value: "95% Saved" },
        { label: "Real-time Accuracy", value: "99.8%" },
        { label: "Anomaly Detection", value: "Instant" },
      ],
      tech: ["Power Automate", "Power BI", "SAP"],
      duration: "5 Weeks",
    },
    {
      id: 5,
      industry: "HR",
      company: "ROYAL&CO",
      title: "Employee Onboarding Automation",
      summary: "Automated account creation, document delivery, and training scheduling for new hires.",
      before: "HR staff spent an average of 4 hours per new hire on onboarding admin tasks",
      after: "Power Automate handles everything from account setup to welcome package delivery",
      stats: [
        { label: "Onboarding Time Saved", value: "80%" },
        { label: "Processing Time", value: "45min → 9min" },
        { label: "Employee Satisfaction", value: "4.8/5" },
      ],
      tech: ["Power Automate", "Microsoft 365", "Teams"],
      duration: "2 Weeks",
    },
    {
      id: 6,
      industry: "Finance",
      company: "Korea Automobile Environmental Association",
      title: "Compliance Report Auto-Generation",
      summary: "Automated FSS compliance report generation, dramatically reducing the compliance team's workload.",
      before: "Compliance team spent 40 hours weekly manually creating regulatory reports",
      after: "Power Automate handles the full pipeline: data collection, analysis, and report generation",
      stats: [
        { label: "Weekly Hours Saved", value: "38hrs" },
        { label: "Report Accuracy", value: "100%" },
        { label: "ROI", value: "5x" },
      ],
      tech: ["Power Automate", "Power BI", "SharePoint"],
      duration: "6 Weeks",
    },
  ],
};

const INDUSTRY_FILTERS = {
  KO: ["전체", "금융", "물류", "의료", "제조", "HR"],
  EN: ["All",  "Finance", "Logistics", "Healthcare", "Manufacturing", "HR"],
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
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
    }}>
      {children}
    </div>
  );
}

function CaseStudyModal({ project, onClose, lang }: { project: typeof PROJECTS.KO[0]; onClose: () => void; lang: "KO" | "EN" }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", handler); };
  }, [onClose]);

  const label = {
    KO: { before: "자동화 이전", after: "자동화 이후", tech: "사용 기술", duration: "프로젝트 기간", cta: "유사 프로젝트 문의하기" },
    EN: { before: "Before Automation", after: "After Automation", tech: "Tech Stack", duration: "Project Duration", cta: "Inquire About Similar Project" },
  }[lang];

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={e => e.stopPropagation()}>
        <button className="pf-modal-close" onClick={onClose}>✕</button>

        <div className="pf-modal-header">
          <span className="pf-modal-industry">{project.industry}</span>
          <h2 className="pf-modal-title">{project.title}</h2>
          <p className="pf-modal-company">{project.company}</p>
        </div>

        <div className="pf-modal-stats">
          {project.stats.map(s => (
            <div key={s.label} className="pf-modal-stat">
              <div className="pf-modal-stat-value">{s.value}</div>
              <div className="pf-modal-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="pf-modal-ba">
          <div className="pf-modal-ba-col">
            <div className="pf-modal-ba-label before">{label.before}</div>
            <p className="pf-modal-ba-text">{project.before}</p>
          </div>
          <div className="pf-modal-ba-arrow">→</div>
          <div className="pf-modal-ba-col">
            <div className="pf-modal-ba-label after">{label.after}</div>
            <p className="pf-modal-ba-text">{project.after}</p>
          </div>
        </div>

        <div className="pf-modal-footer">
          <div className="pf-modal-tech">
            <span className="pf-modal-tech-label">{label.tech}</span>
            <div className="pf-modal-tags">
              {project.tech.map(t => <span key={t} className="pf-tag">{t}</span>)}
            </div>
          </div>
          <div className="pf-modal-duration">
            <span className="pf-modal-tech-label">{label.duration}</span>
            <span className="pf-modal-duration-val">{project.duration}</span>
          </div>
        </div>

        <Link href="/#contact" className="pf-modal-cta" onClick={onClose}>{label.cta} →</Link>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const lang = useLang();
  const projects = PROJECTS[lang];
  const filters = INDUSTRY_FILTERS[lang];

  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [activeProject, setActiveProject] = useState<typeof PROJECTS.KO[0] | null>(null);
  const [heroVis, setHeroVis] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHeroVis(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => { setActiveFilter(filters[0]); }, [lang]);

  const filtered = activeFilter === filters[0]
    ? projects
    : projects.filter(p => p.industry === activeFilter);

  const tr = {
    KO: {
      heroLabel: "구축 실적",
      heroTitle1: "실제 현장에서",
      heroTitle2: "증명된",
      heroTitle3: "자동화 성과.",
      heroDesc: "WOW Automation이 구축한 RPA 프로젝트의 실제 성과와 케이스 스터디를 확인하세요.",
      total: `총 ${projects.length}개 프로젝트`,
      viewCase: "케이스 스터디 보기",
      ctaTitle: "귀사의 프로세스도\n자동화할 수 있습니다.",
      ctaBtn: "무료 상담 신청",
    },
    EN: {
      heroLabel: "PORTFOLIO",
      heroTitle1: "Real Results,",
      heroTitle2: "Proven",
      heroTitle3: "in the Field.",
      heroDesc: "Explore the real-world RPA projects and case studies delivered by WOW Automation.",
      total: `${projects.length} Projects`,
      viewCase: "View Case Study",
      ctaTitle: "Your processes can be\nautomated too.",
      ctaBtn: "Get Free Consultation",
    },
  }[lang];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        .pf * { box-sizing: border-box; }

        /* ── HERO ── */
        .pf-hero {
          min-height: 60vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 10rem 4rem 5rem;
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .pf-hero::after {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 40%; height: 100%;
          background: linear-gradient(160deg, rgba(201,168,76,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .pf-hero-label {
          font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 2rem;
          display: flex; align-items: center; gap: 0.75rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .pf-hero-label.vis { opacity: 1; transform: translateY(0); }
        .pf-hero-label::before { content: ''; width: 32px; height: 1px; background: var(--gold); }
        .pf-hero-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 5.5vw, 5.5rem);
          font-weight: 900; line-height: 1;
          color: var(--text); margin-bottom: 1.5rem;
        }
        .pf-hero-h1 .line1 {
          display: block;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease;
        }
        .pf-hero-h1 .line2 {
          display: block; color: var(--gold); font-style: italic;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease;
        }
        .pf-hero-h1 .line3 {
          display: block;
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease;
        }
        .pf-hero-h1 .line1.vis, .pf-hero-h1 .line2.vis, .pf-hero-h1 .line3.vis { opacity: 1; transform: translateX(0); }
        .pf-hero-desc {
          font-size: 1rem; color: var(--text-dim); line-height: 1.8;
          max-width: 560px;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.7s 0.4s ease, transform 0.7s 0.4s ease;
        }
        .pf-hero-desc.vis { opacity: 1; transform: translateY(0); }

        /* ── FILTER BAR ── */
        .pf-filter-bar {
          padding: 2.5rem 4rem;
          background: var(--bg-mid);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; flex-wrap: wrap;
        }
        .pf-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .pf-filter-btn {
          padding: 0.5rem 1.2rem;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em;
          font-family: 'DM Sans', sans-serif;
          border: 1px solid var(--border);
          background: transparent; color: var(--text-dim);
          cursor: pointer; transition: all 0.2s;
          text-transform: uppercase;
        }
        .pf-filter-btn:hover { border-color: var(--gold); color: var(--gold); }
        .pf-filter-btn.active {
          background: var(--gold); border-color: var(--gold);
          color: #fff;
        }
        html.light .pf-filter-btn.active { color: #1a2035; }
        .pf-total { font-size: 0.8rem; color: var(--text-dim); letter-spacing: 0.05em; white-space: nowrap; }

        /* ── GRID ── */
        .pf-grid-section { padding: 5rem 4rem; background: var(--bg); }
        .pf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* ── CARD ── */
        .pf-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }
        .pf-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transition: width 0.4s ease;
        }
        .pf-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); border-color: var(--gold); }
        .pf-card:hover::before { width: 100%; }

        .pf-card-head { padding: 1.8rem 2rem 1.2rem; }
        .pf-card-industry {
          display: inline-block;
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold); border: 1px solid rgba(201,168,76,0.3);
          padding: 0.25rem 0.6rem; margin-bottom: 1rem;
        }
        .pf-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; line-height: 1.3;
          color: var(--text); margin-bottom: 0.4rem;
        }
        .pf-card-company { font-size: 0.78rem; color: var(--text-dim); }

        .pf-card-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .pf-card-stat { padding: 1rem; text-align: center; border-right: 1px solid var(--border); }
        .pf-card-stat:last-child { border-right: none; }
        .pf-card-stat-value { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--gold); line-height: 1; }
        .pf-card-stat-label { font-size: 0.65rem; color: var(--text-dim); margin-top: 0.3rem; line-height: 1.3; }

        .pf-card-body { padding: 1.4rem 2rem; flex: 1; }
        .pf-card-summary { font-size: 0.83rem; color: var(--text-dim); line-height: 1.7; }

        .pf-card-foot {
          padding: 1.2rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid var(--border);
        }
        .pf-card-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .pf-tag {
          font-size: 0.65rem; letter-spacing: 0.05em;
          background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2);
          color: var(--gold); padding: 0.2rem 0.5rem;
        }
        .pf-card-more {
          font-size: 0.75rem; font-weight: 600; color: var(--gold);
          display: flex; align-items: center; gap: 0.3rem;
          white-space: nowrap; background: none; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif; padding: 0;
          transition: gap 0.2s;
        }
        .pf-card-more:hover { gap: 0.5rem; }

        /* ── MODAL ── */
        .pf-modal-overlay {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 2rem;
          opacity: 0; animation: pfFadeIn 0.25s ease forwards;
        }
        @keyframes pfFadeIn { to { opacity: 1; } }
        .pf-modal {
          background: var(--card-bg); border: 1px solid var(--border);
          max-width: 680px; width: 100%;
          max-height: 90vh; overflow-y: auto;
          position: relative;
          transform: translateY(20px);
          animation: pfSlideUp 0.3s ease forwards;
          box-shadow: 0 32px 80px rgba(0,0,0,0.25);
        }
        @keyframes pfSlideUp { to { transform: translateY(0); } }
        .pf-modal-close {
          position: sticky; top: 0; float: right;
          margin: 1.25rem 1.25rem 0 0;
          background: var(--card-bg); border: 1px solid var(--border);
          border-radius: 2px; color: var(--text-dim);
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 0.85rem; transition: all 0.2s;
          z-index: 10;
        }
        .pf-modal-close:hover { border-color: var(--gold); color: var(--gold); }
        .pf-modal-header { padding: 2rem 2.5rem 1.5rem; border-bottom: 1px solid var(--border); }
        .pf-modal-industry {
          display: inline-block;
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold); border: 1px solid rgba(201,168,76,0.3);
          padding: 0.25rem 0.6rem; margin-bottom: 1rem;
        }
        .pf-modal-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight: 700;
          color: var(--text); margin-bottom: 0.4rem; line-height: 1.2;
        }
        .pf-modal-company { font-size: 0.85rem; color: var(--text-dim); }

        .pf-modal-stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid var(--border);
          background: var(--bg-mid);
        }
        .pf-modal-stat { padding: 1.5rem; text-align: center; border-right: 1px solid var(--border); }
        .pf-modal-stat:last-child { border-right: none; }
        .pf-modal-stat-value { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: var(--gold); line-height: 1; }
        .pf-modal-stat-label { font-size: 0.7rem; color: var(--text-dim); margin-top: 0.4rem; }

        .pf-modal-ba {
          display: grid; grid-template-columns: 1fr auto 1fr;
          gap: 1rem; align-items: center;
          padding: 2rem 2.5rem; border-bottom: 1px solid var(--border);
        }
        .pf-modal-ba-label {
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 0.75rem; font-weight: 600;
        }
        .pf-modal-ba-label.before { color: var(--text-dim); }
        .pf-modal-ba-label.after { color: var(--gold); }
        .pf-modal-ba-text { font-size: 0.85rem; color: var(--text-dim); line-height: 1.7; }
        .pf-modal-ba-arrow { font-size: 1.5rem; color: var(--gold); opacity: 0.4; }

        .pf-modal-footer {
          display: flex; gap: 2rem; align-items: flex-start;
          padding: 1.5rem 2.5rem; border-bottom: 1px solid var(--border);
        }
        .pf-modal-tech-label { font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.6rem; }
        .pf-modal-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .pf-modal-duration-val { font-size: 0.9rem; font-weight: 600; color: var(--text); }

        .pf-modal-cta {
          display: block; margin: 1.5rem 2.5rem 2.5rem;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: #fff; text-decoration: none; text-align: center;
          padding: 1rem 2rem; font-size: 0.85rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.25s;
        }
        html.light .pf-modal-cta { color: #1a2035; }
        .pf-modal-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,147,62,0.35); }

        /* ── CTA ── */
        .pf-cta {
          padding: 8rem 4rem;
          background: var(--bg-mid);
          border-top: 1px solid var(--border);
          display: grid; grid-template-columns: 1fr auto;
          gap: 3rem; align-items: center;
          position: relative; overflow: hidden;
        }
        .pf-cta::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        .pf-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 700; line-height: 1.15; color: var(--text);
          white-space: pre-line;
        }
        .pf-cta-title .gold { color: var(--gold); font-style: italic; }
        .pf-cta-btn {
          display: inline-block; white-space: nowrap;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: #fff; border: none; border-radius: 2px;
          padding: 1.1rem 2.8rem; font-size: 0.85rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; font-family: 'DM Sans', sans-serif;
          transition: all 0.3s;
        }
        html.light .pf-cta-btn { color: #1a2035; }
        .pf-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(184,147,62,0.4); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .pf-hero { padding: 8rem 2rem 4rem; min-height: auto; }
          .pf-filter-bar { padding: 1.5rem 2rem; }
          .pf-grid-section { padding: 3rem 2rem; }
          .pf-grid { grid-template-columns: 1fr; }
          .pf-cta { grid-template-columns: 1fr; padding: 4rem 2rem; }
          .pf-cta-title { white-space: normal; }
          .pf-modal-ba { grid-template-columns: 1fr; }
          .pf-modal-ba-arrow { display: none; }
          .pf-modal-footer { flex-direction: column; gap: 1rem; }
        }
      `}</style>

      <div className="pf">

        {/* ── HERO ── */}
        <div className="pf-hero">
          <div className={`pf-hero-label${heroVis ? " vis" : ""}`}>{tr.heroLabel}</div>
          <h1 className="pf-hero-h1">
            <span className={`line1${heroVis ? " vis" : ""}`}>{tr.heroTitle1}</span>
            <span className={`line2${heroVis ? " vis" : ""}`}>{tr.heroTitle2}</span>
            <span className={`line3${heroVis ? " vis" : ""}`}>{tr.heroTitle3}</span>
          </h1>
          <p className={`pf-hero-desc${heroVis ? " vis" : ""}`}>{tr.heroDesc}</p>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="pf-filter-bar">
          <div className="pf-filters">
            {filters.map(f => (
              <button
                key={f}
                className={`pf-filter-btn${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="pf-total">{tr.total}</span>
        </div>

        {/* ── PROJECT GRID ── */}
        <div className="pf-grid-section">
          <div className="pf-grid">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={i % 3 * 0.1}>
                <div className="pf-card" onClick={() => setActiveProject(project)}>
                  <div className="pf-card-head">
                    <span className="pf-card-industry">{project.industry}</span>
                    <div className="pf-card-title">{project.title}</div>
                    <div className="pf-card-company">{project.company}</div>
                  </div>

                  <div className="pf-card-stats">
                    {project.stats.map(s => (
                      <div key={s.label} className="pf-card-stat">
                        <div className="pf-card-stat-value">{s.value}</div>
                        <div className="pf-card-stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pf-card-body">
                    <p className="pf-card-summary">{project.summary}</p>
                  </div>

                  <div className="pf-card-foot">
                    <div className="pf-card-tags">
                      {project.tech.slice(0, 2).map(t => <span key={t} className="pf-tag">{t}</span>)}
                    </div>
                    <button className="pf-card-more">
                      {tr.viewCase} →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <Reveal>
          <div className="pf-cta">
            <div className="pf-cta-title">
              {tr.ctaTitle.split("\n").map((line, i) => (
                <span key={i}>{i === 1 ? <span className="gold">{line}</span> : line}{i === 0 ? "\n" : ""}</span>
              ))}
            </div>
            <Link href="/#contact" className="pf-cta-btn">{tr.ctaBtn}</Link>
          </div>
        </Reveal>

      </div>

      {/* ── MODAL ── */}
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          lang={lang}
        />
      )}
    </>
  );
}