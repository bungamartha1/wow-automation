"use client";
import { useState, useEffect, useRef } from "react";
import FloatingLines from "@/components/ui/FloatingLines";
import PartnersGrid from "@/components/ui/PartnersGrid";
import { useLang } from "@/context/LangContext";
import { t } from "@/lib/translations";

const SERVICES = {
  KO: [
    { icon: "🔍", title: "RPA 컨설팅 & 평가", desc: "귀사의 프로세스를 분석하고 자동화 가능성과 ROI를 평가합니다.", points: ["프로세스 발굴", "실현 가능성 분석", "ROI 매핑", "자동화 로드맵"] },
    { icon: "⚙️", title: "RPA 설계 & 개발", desc: "귀사의 시스템에 맞는 맞춤형 RPA 봇을 설계하고 개발합니다.", points: ["봇 아키텍처", "워크플로우 엔지니어링", "시스템 통합", "테스트 및 배포"] },
    { icon: "🤖", title: "지능형 자동화", desc: "AI와 RPA를 결합하여 복잡하고 인지적인 업무를 자동화합니다.", points: ["AI + RPA 융합", "OCR 문서 처리", "의사결정 자동화", "예측 워크플로우"] },
  ],
  EN: [
    { icon: "🔍", title: "RPA Consulting & Assessment", desc: "We analyze your processes and evaluate automation potential and ROI.", points: ["Process Discovery", "Feasibility Analysis", "ROI Mapping", "Automation Roadmap"] },
    { icon: "⚙️", title: "RPA Design & Development", desc: "We design and build custom RPA bots tailored to your systems.", points: ["Bot Architecture", "Workflow Engineering", "System Integration", "Testing & Deployment"] },
    { icon: "🤖", title: "Intelligent Automation", desc: "We combine AI and RPA to automate complex, cognitive workflows.", points: ["AI + RPA Fusion", "OCR Document Processing", "Decision Automation", "Predictive Workflows"] },
  ],
};

const TESTIMONIALS = {
  KO: [
    { name: "도자기",  role: "CTO, 알튼코리아",                          quote: "WOW Automation 덕분에 인보이스 처리 시간이 87% 단축되었습니다. 첫 달부터 ROI가 확인되었습니다." },
    { name: "박찬열",  role: "Operations Director, 충남대학교병원",       quote: "그들의 RPA 봇은 하루 3,000건 이상의 거래를 오류 없이 처리합니다. 탁월한 품질입니다." },
    { name: "카르멘",  role: "CEO, 이디야",                              quote: "상담부터 배포까지 3주. WOW Automation은 우리가 협력한 가장 효율적인 파트너입니다." },
    { name: "카이",  role: "IT Manager, 경동나비엔",                     quote: "복잡한 ERP 연동 작업을 자동화하여 매월 200시간 이상을 절약하고 있습니다." },
    { name: "새끼",  role: "CFO, 웅진",                                 quote: "도입 후 데이터 입력 오류가 99% 감소했습니다. 정말 놀라운 결과입니다." },
    { name: "해리포터",  role: "HR Director, 계명대학교동산의료원",         quote: "직원 온보딩 프로세스가 완전히 자동화되어 HR팀이 핵심 업무에 집중할 수 있게 되었습니다." },
    { name: "박마틴",  role: "HR Director, 로얄앤컴퍼니",         quote: "직원 온보딩 프로세스가 완전히 자동화되어 HR팀이 핵심 업무에 집중할 수 있게 되었습니다." },
    { name: "일론 머스크", role: "CEO, 한국자동차환경협회",                    quote: "WOW Automation 짱이양!." },
  ],
  EN: [
    { name: "Do Jagi",   role: "CTO, Alten Korea",                  quote: "WOW Automation reduced our invoice processing time by 87%. The ROI was visible within the first month." },
    { name: "Park Chanyeol",  role: "Operations Director, Chungnam National University Hospital", quote: "Their RPA bots handle 3,000+ transactions daily with zero errors. Exceptional quality." },
    { name: "Carmen", role: "CEO, EDIYA",                     quote: "From consultation to deployment in 3 weeks. WOW Automation is the most efficient partner we've worked with." },
    { name: "KAI",   role: "IT Manager, Kyungdong Navien",             quote: "We save over 200 hours monthly by automating complex ERP integration tasks." },
    { name: "Saekki",   role: "CFO, Woongjin",                      quote: "Data entry errors dropped by 99% after implementation. Truly remarkable results." },
    { name: "Harry Potter", role: "HR Director, Keimyung University Dongsan Medical Center",                    quote: "Our employee onboarding is fully automated, letting the HR team focus on what truly matters." },
    { name: "Park Martin", role: "HR Director, ROYAL&CO",                    quote: "Our employee onboarding is fully automated, letting the HR team focus on what truly matters." },    
    { name: "Harry Potter", role: "CEO, Korea Automobile Environmental Association",                    quote: "WOW Automation is the best!." },
  ],
};

const TROW1 = { KO: TESTIMONIALS.KO.slice(0, 3), EN: TESTIMONIALS.EN.slice(0, 3) };
const TROW2 = { KO: TESTIMONIALS.KO.slice(3),    EN: TESTIMONIALS.EN.slice(3) };

const STATS = {
  KO: [
    { value: "500+",  label: "봇 배포" },
    { value: "87%",   label: "평균 시간 절약" },
    { value: "3x",    label: "6개월 ROI" },
    { value: "99.9%", label: "업타임 SLA" },
  ],
  EN: [
    { value: "500+",  label: "Bots Deployed" },
    { value: "87%",   label: "Avg. Time Saved" },
    { value: "3x",    label: "ROI in 6 Months" },
    { value: "99.9%", label: "Uptime SLA" },
  ],
};

const NORMAL_SPEED = 0.45;
const SLOW_SPEED   = 0.06;
const TM_GAP       = 16;

function TestimonialMarquee({ items, direction = 1 }: {
  items: typeof TESTIMONIALS.EN;
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

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".tm-card"));
    const oneSetWidth = cards.slice(0, items.length)
      .reduce((acc, el) => acc + el.offsetWidth + TM_GAP, 0);

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
      <div ref={trackRef} style={{ display: "flex", gap: `${TM_GAP}px`, width: "max-content", willChange: "transform", padding: "4px 0" }}>
        {[...items, ...items, ...items].map((item, i) => (
          <div key={`${item.name}-${i}`} className="tm-card">
            <p className="tm-quote">&ldquo;{item.quote}&rdquo;</p>
            <div className="tm-author">
              <div className="tm-avatar">{item.name[0]}</div>
              <div>
                <div className="tm-name">{item.name}</div>
                <div className="tm-role">{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type ServiceType = (typeof SERVICES.EN)[0] | null;

export default function Home() {
  const lang = useLang();
  const tr = t[lang];

  const [mounted,       setMounted]       = useState(false);
  const [activeService, setActiveService] = useState<ServiceType>(null);
  const [formData,      setFormData]      = useState({ company: "", name: "", email: "", phone: "", message: "" });
  const [submitting,    setSubmitting]    = useState(false);
  const [submitted,     setSubmitted]     = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = activeService ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeService]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveService(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;900&display=swap');

        /* HERO */
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 80px 4rem 0; background: var(--bg); }
        .hero-bg { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; }
        .hero-content { position: relative; z-index: 2; max-width: 700px; text-align: center; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 900; line-height: 1.05; margin-bottom: 0.5rem; animation: fadeUp 0.8s 0.15s ease both; color: var(--text); }
        .hero h1 .gold { color: var(--gold); }
        .hero-sub { font-family: 'Noto Serif KR', serif; font-size: clamp(1rem, 2vw, 1.3rem); color: var(--text-dim); margin-bottom: 1.5rem; animation: fadeUp 0.8s 0.25s ease both; }
        .hero p { font-size: 1.05rem; color: var(--text-dim); line-height: 1.7; max-width: 520px; margin: 0 auto 2.5rem; animation: fadeUp 0.8s 0.35s ease both; }
        .hero-actions { display: flex; flex-direction: column; align-items: center; gap: 1rem; animation: fadeUp 0.8s 0.45s ease both; }
        .btn-primary { background: linear-gradient(135deg, var(--gold), var(--gold-light)); color: #fff; border: none; border-radius: 4px; padding: 1rem 2.2rem; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s; text-decoration: none; display: inline-block; }
        html.light .btn-primary { color: #1a2035; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(184,147,62,0.35); }
        .btn-secondary { color: var(--text-dim); background: transparent; border: none; padding: 0.5rem 0; font-size: 0.9rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--border); transition: all 0.2s; }
        .btn-secondary:hover { color: var(--gold); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        /* STATS */
        .stats { background: var(--bg-mid); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 3rem 4rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        /* alternating section backgrounds from stats onward */
        .stat { text-align: center; }
        .stat-value { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 700; color: var(--gold); line-height: 1; }
        .stat-label { font-size: 0.8rem; color: var(--text-dim); margin-top: 0.4rem; letter-spacing: 0.05em; }

        /* SECTIONS */
        section { padding: 7rem 4rem; background: var(--bg); transition: background 0.3s ease; }
        .section-label { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
        .section-label::before { content: ''; width: 32px; height: 1px; background: var(--gold); }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; line-height: 1.15; margin-bottom: 1.5rem; color: var(--text); }
        .section-divider { width: 60px; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); margin-bottom: 3rem; }

        /* ABOUT */
        #about { background: var(--bg); }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .about-text p { color: var(--text-dim); line-height: 1.8; margin-bottom: 1.2rem; font-size: 0.95rem; }
        .about-panel { background: var(--card-bg); border: 1px solid var(--border); padding: 2.5rem; position: relative; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
        .about-panel::before { content: ''; position: absolute; top: 0; left: 0; width: 60px; height: 3px; background: linear-gradient(90deg, var(--gold), transparent); }
        .about-panel-item { display: flex; gap: 1rem; padding: 1.2rem 0; border-bottom: 1px solid var(--border); }
        .about-panel-item:last-child { border-bottom: none; }
        .about-panel-icon { color: var(--gold); font-size: 1.2rem; margin-top: 2px; }
        .about-panel-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.2rem; color: var(--text); }
        .about-panel-desc { font-size: 0.82rem; color: var(--text-dim); line-height: 1.5; }

        /* SERVICES */
        #services { background: var(--bg-mid); }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .service-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 2px; padding: 2.5rem; display: flex; flex-direction: column; transition: all 0.3s; position: relative; overflow: hidden; cursor: pointer; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); transition: width 0.4s ease; }
        .service-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
        .service-card:hover::before { width: 100%; }
        .service-card-icon { font-size: 2rem; margin-bottom: 1.5rem; }
        .service-card-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.15rem; margin-bottom: 1rem; line-height: 1.3; color: var(--text); }
        .service-card-desc { font-size: 0.84rem; color: var(--text-dim); line-height: 1.7; flex: 1; }
        .service-card-more { display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 1.5rem; font-size: 0.82rem; font-weight: 600; color: var(--gold); letter-spacing: 0.04em; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; padding: 0; transition: gap 0.2s; }
        .service-card-more:hover { gap: 0.7rem; }
        .service-card-more svg { width: 14px; height: 14px; }

        /* MODAL */
        .modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 2rem; opacity: 0; animation: fadeIn 0.25s ease forwards; }
        @keyframes fadeIn { to { opacity: 1; } }
        .modal { background: var(--card-bg); border: 1px solid var(--border); max-width: 520px; width: 100%; padding: 2.5rem; position: relative; transform: translateY(20px); animation: slideUp 0.3s ease forwards; box-shadow: 0 24px 60px rgba(0,0,0,0.2); }
        @keyframes slideUp { to { transform: translateY(0); } }
        .modal::before { content: ''; position: absolute; top: 0; left: 0; width: 80px; height: 3px; background: linear-gradient(90deg, var(--gold), transparent); }
        .modal-close { position: absolute; top: 1.25rem; right: 1.25rem; background: transparent; border: 1px solid var(--border); border-radius: 2px; color: var(--text-dim); width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
        .modal-close:hover { border-color: var(--gold); color: var(--gold); }
        .modal-icon { font-size: 2.2rem; margin-bottom: 1rem; }
        .modal-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.3; color: var(--text); }
        .modal-desc { font-size: 0.9rem; color: var(--text-dim); line-height: 1.7; margin-bottom: 1.5rem; }
        .modal-points { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }
        .modal-points li { display: flex; align-items: center; gap: 0.75rem; font-size: 0.88rem; color: var(--text); }
        .modal-points li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
        .modal-cta { display: inline-block; background: linear-gradient(135deg, var(--gold), var(--gold-light)); color: #fff; border: none; border-radius: 4px; padding: 0.85rem 1.8rem; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s; text-decoration: none; }
        html.light .modal-cta { color: #1a2035; }
        .modal-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,147,62,0.35); }

        /* TESTIMONIALS — marquee style */
        #testimonials { background: var(--bg); padding-bottom: 0; }
        .tm-rows { display: flex; flex-direction: column; gap: 16px; overflow: hidden; position: relative; margin: 0 -4rem; padding: 4px 0 5rem; }
        .tm-rows::before, .tm-rows::after { content: ''; position: absolute; top: 0; bottom: 0; width: 160px; z-index: 2; pointer-events: none; }
        .tm-rows::before { left: 0; background: linear-gradient(to right, var(--bg), transparent); }
        .tm-rows::after  { right: 0; background: linear-gradient(to left,  var(--bg), transparent); }

        .tm-card {
          flex-shrink: 0;
          width: 340px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.75rem;
          display: flex; flex-direction: column; gap: 1.25rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .tm-card:hover { border-color: rgba(201,168,76,0.4); box-shadow: 0 8px 28px rgba(0,0,0,0.1); }
        .tm-quote { font-size: 0.88rem; color: var(--text); line-height: 1.7; flex: 1; margin: 0; }
        .tm-author { display: flex; align-items: center; gap: 0.75rem; border-top: 1px solid var(--border); padding-top: 1rem; }
        .tm-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700; color: #1a2035;
          flex-shrink: 0;
        }
        .tm-name { font-size: 0.82rem; font-weight: 600; color: var(--gold); }
        .tm-role { font-size: 0.74rem; color: var(--text-dim); margin-top: 0.1rem; }

        /* PARTNERS */
        #partners { background: var(--bg-mid); padding: 0; }
        .partners-section-inner { padding: 5rem 4rem 0; background: var(--bg-mid); }
        .partners-marquee-wrap { padding: 0px 0px 32px 0px; margin-top: 3rem; }

        /* CONTACT */
        #contact { background: var(--bg-mid); }
        .contact-info p { color: var(--text-dim); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1rem; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 5rem; align-items: start; }
        .contact-detail { display: flex; align-items: center; gap: 0.75rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); }
        .contact-detail-icon { color: var(--gold); font-size: 1rem; }
        .contact-detail-text { font-size: 0.85rem; color: var(--text-dim); }
        .contact-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-label { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold-dim); font-weight: 500; }
        .form-input, .form-textarea { background: var(--bg); border: 1px solid var(--border); border-radius: 4px; color: var(--text); padding: 1rem; font-size: 0.9rem; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s; width: 100%; }
        .form-input:focus, .form-textarea:focus { border-color: var(--gold); }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--text-dim); opacity: 0.5; }
        .form-textarea { resize: vertical; min-height: 120px; }
        .form-submit { background: linear-gradient(135deg, var(--gold), var(--gold-light)); color: #fff; border: none; border-radius: 4px; padding: 1rem 2rem; font-size: 0.88rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s; align-self: flex-start; }
        html.light .form-submit { color: #1a2035; }
        .form-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(184,147,62,0.35); }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .success-message { background: rgba(184,147,62,0.08); border: 1px solid rgba(184,147,62,0.3); padding: 2rem; text-align: center; }
        .success-message h3 { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1.4rem; margin-bottom: 0.5rem; }
        .success-message p { color: var(--text-dim); font-size: 0.88rem; }

        @media (max-width: 1024px) {
          section:not(.hero), .stats { padding-left: 2rem; padding-right: 2rem; }
          .hero { padding: 120px 1.5rem 3rem; min-height: 100svh; }
          .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .services-grid { grid-template-columns: 1fr; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .form-row { grid-template-columns: 1fr; }
          .tm-rows { margin: 0 -2rem; }
          .tm-rows::before, .tm-rows::after { width: 60px; }
          .tm-card { width: 280px; }
          .partners-section-inner { padding: 4rem 2rem 0; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          {mounted && (
            <FloatingLines
              enabledWaves={["top", "middle", "bottom"]}
              lineCount={4} lineDistance={6} bendRadius={5} bendStrength={-0.5}
              animationSpeed={0.3} interactive={true} parallax={true}
              linesGradient={["#c9a84c", "#e8c97a", "#c9a84c"]} mixBlendMode="normal"
            />
          )}
        </div>
        <div className="hero-content">
          <h1>{tr.heroTitle1}<br /><span className="gold">{tr.heroTitle2}</span><br />{tr.heroTitle3}</h1>
          <p className="hero-sub">{tr.heroSub}</p>
          <p>{tr.heroDesc}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">{tr.heroCta}</a>
            <a href="#services" className="btn-secondary">{tr.heroExplore}</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        {STATS[lang].map(s => (
          <div key={s.label} className="stat">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div className="about-text">
            <div className="section-label">{tr.aboutLabel}</div>
            <h2 className="section-title">{tr.aboutTitle}</h2>
            <div className="section-divider" />
            <p>{tr.aboutDesc1}</p>
            <p>{tr.aboutDesc2}</p>
          </div>
          <div className="about-panel">
            {[
              { icon: "🎯", title: tr.panel1Title, desc: tr.panel1Desc },
              { icon: "🛠️", title: tr.panel2Title, desc: tr.panel2Desc },
              { icon: "🔧", title: tr.panel3Title, desc: tr.panel3Desc },
            ].map(item => (
              <div key={item.title} className="about-panel-item">
                <div className="about-panel-icon">{item.icon}</div>
                <div>
                  <div className="about-panel-title">{item.title}</div>
                  <div className="about-panel-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="section-label">{tr.servicesLabel}</div>
        <h2 className="section-title">{tr.servicesTitle}</h2>
        <div className="section-divider" />
        <div className="services-grid">
          {SERVICES[lang].map(s => (
            <div key={s.title} className="service-card" onClick={() => setActiveService(s)}>
              <div className="service-card-icon">{s.icon}</div>
              <div className="service-card-title">{s.title}</div>
              <div className="service-card-desc">{s.desc}</div>
              <button className="service-card-more">
                {lang === "KO" ? "자세히 보기" : "View More"}
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 7h12M7 1l6 6-6 6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — 2 row marquee */}
      <section id="testimonials">
        <div className="section-label">{tr.testimonialsLabel}</div>
        <h2 className="section-title">{tr.testimonialsTitle}</h2>
        <div className="section-divider" />
        <div className="tm-rows">
          <TestimonialMarquee items={TROW1[lang]} direction={1}  />
          <TestimonialMarquee items={TROW2[lang]} direction={-1} />
        </div>
      </section>

      {/* PARTNERS */}
      {/* <section id="partners">
        <div className="partners-section-inner">
          <div className="section-label">{lang === "KO" ? "파트너" : "Partners"}</div>
          <h2 className="section-title">{lang === "KO" ? "함께하는 파트너사" : "Our Trusted Partners"}</h2>
          <div className="section-divider" />
        </div>
        <div className="partners-marquee-wrap">
          <PartnersGrid />
        </div>
      </section> */}

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-label">{tr.contactLabel}</div>
            <h2 className="section-title">{tr.contactTitle}</h2>
            <div className="section-divider" />
            <p>{tr.contactDesc1}</p>
            <div className="contact-detail">
              <span className="contact-detail-icon">📍</span>
              <span className="contact-detail-text">{tr.contactAddr}</span>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-icon">⏱️</span>
              <span className="contact-detail-text">{tr.contactReply}</span>
            </div>
          </div>
          <div>
            {submitted ? (
              <div className="success-message">
                <h3>{tr.successTitle}</h3>
                <p>{tr.successDesc}</p>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{tr.formCompany}</label>
                    <input className="form-input" placeholder={tr.formPlaceholderCompany} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{tr.formName}</label>
                    <input className="form-input" placeholder={tr.formPlaceholderName} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{tr.formEmail}</label>
                    <input className="form-input" type="email" placeholder={tr.formPlaceholderEmail} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{tr.formPhone}</label>
                    <input className="form-input" placeholder={tr.formPlaceholderPhone} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{tr.formMessage}</label>
                  <textarea className="form-textarea" placeholder={tr.formPlaceholderMessage} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                </div>
                <button className="form-submit" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? tr.formSending : tr.formSubmit}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SERVICE MODAL */}
      {activeService && (
        <div className="modal-overlay" onClick={() => setActiveService(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveService(null)}>✕</button>
            <div className="modal-icon">{activeService.icon}</div>
            <div className="modal-title">{activeService.title}</div>
            <div className="modal-desc">{activeService.desc}</div>
            <ul className="modal-points">
              {activeService.points.map(p => (<li key={p}>{p}</li>))}
            </ul>
            <a href="#contact" className="modal-cta" onClick={() => setActiveService(null)}>
              {lang === "KO" ? "무료 상담 신청 →" : "Get Free Consultation →"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}