import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   LAMAR NATIONAL BANK — WORLD CLASS v3
   Cinematic Blue · Texas Luxury · Award-Grade
   ═══════════════════════════════════════════════ */

const C = {
  bg: "#f8f6f3",
  bgAlt: "#f0ede8",
  navy: "#091b33",
  navyMid: "#0e2545",
  blue: "#1a4076",
  blueRich: "#1d4d8a",
  accent: "#3d8bfd",
  accentSoft: "rgba(61,139,253,0.12)",
  accentGlow: "rgba(61,139,253,0.25)",
  ice: "#c0d9f7",
  iceSoft: "rgba(192,217,247,0.15)",
  white: "#ffffff",
  text: "#0a1019",
  textSoft: "#3a4250",
  textMuted: "#7c8594",
  onDark: "#e8edf4",
  onDarkSoft: "rgba(232,237,244,0.6)",
  onDarkMuted: "rgba(232,237,244,0.35)",
  glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.08)",
  cardBorder: "rgba(10,16,25,0.06)",
};

const LOGO = "https://www.lamarnationalbank.com/wp-content/uploads/2020/12/output-onlinepngtools-15-2-980x237-1.png";
const LOGO_MARK = "https://www.lamarnationalbank.com/wp-content/uploads/2025/01/pr23110b.png";

const LOCS = [
  { city: "Paris", st: "TX", addr: "200 S Collegiate Dr.", zip: "75460", ph: "(903) 785-0701", flag: true },
  { city: "Frisco", st: "TX", addr: "6801 Gaylord Pkwy.", zip: "75034", ph: "(469) 956-4336" },
  { city: "Celina", st: "TX", addr: "110 S Preston Rd.", zip: "75009", ph: "(469) 296-1192" },
  { city: "Reno", st: "TX", addr: "6270 Lamar Rd.", zip: "75462", ph: "(903) 785-0701" },
  { city: "Northlake", st: "TX", addr: "100 Plaza Place, Ste. 100", zip: "76226", ph: "(972) 318-1060" },
  { city: "Anna", st: "TX", addr: "1515 W White St.", zip: "75409", ph: "(945) 732-4300" },
  { city: "College Station", st: "TX", addr: "4282 Boonville Rd., Ste. 200", zip: "77802", ph: "(979) 500-3609", lpo: true },
];

const TESTS = [
  { q: "What I appreciate most is the personal and proactive approach. Because you took the time to learn about my small business, you have on several occasions anticipated my banking needs before I even knew what they were. Lamar is a place where my small business is treated like a Fortune 500.", n: "James Black", t: "Owner, Homebody Accents" },
  { q: "Gunter ISD moved all funds to Lamar Bank two years ago and we have had amazing service from day one. When I have questions or need anything they get back to me immediately and go above and beyond. You do not get that kind of service anywhere these days.", n: "Brittany Floyd", t: "Gunter ISD" },
  { q: "Lamar National has the best service. I never have to wait for help. Recommended them to someone who opened an account within minutes of walking through the doors. Amazing place, amazing customer service!", n: "Lauren Douglas", t: "Valued Client" },
];

const SVCS = [
  { title: "Personal Banking", desc: "Checking, savings, and money market accounts designed around your life — not the other way around.", link: "https://www.lamarnationalbank.com/personal-banking/",
    icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>` },
  { title: "Business Banking", desc: "From startups to established enterprises, scalable solutions with dedicated market presidents who know your community.", link: "https://www.lamarnationalbank.com/business-banking/",
    icon: `<rect x="3" y="7" width="18" height="13" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" stroke-width="1.5" fill="none"/>` },
  { title: "Home Loans", desc: "Competitive rates and local decision-making mean faster closings and a smoother path to homeownership.", link: "https://loans.lamarnational.com",
    icon: `<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M9 21V14h6v7" stroke="currentColor" stroke-width="1.5" fill="none"/>` },
  { title: "Cards & Lending", desc: "Personal loans, student loans, credit cards, and lines of credit — flexible financing when you need it.", link: "https://www.lamarnationalbank.com/personal-banking/#personal_loan",
    icon: `<rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M2 10h20" stroke="currentColor" stroke-width="1.5"/>` },
  { title: "Digital Banking", desc: "Mobile deposit, bill pay, transfers, and real-time alerts — your entire bank in your pocket, 24/7.", link: "https://www.lamarnationalbank.com/go-digital/",
    icon: `<rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M11 18h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>` },
  { title: "1031 Exchange", desc: "Specialized tax-deferred exchange services for real estate investors looking to maximize returns.", link: "https://lamar1031.com/",
    icon: `<path d="M17 1l4 4-4 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11V9a4 4 0 0 1 4-4h14" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M7 23l-4-4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="currentColor" stroke-width="1.5" fill="none"/>` },
];

/* ── Hooks ── */
function useInView(o = {}) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } }, { threshold: 0.12, ...o });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [r, v];
}

function Counter({ end, sfx = "", dur = 2200 }) {
  const [c, setC] = useState(0);
  const [r, v] = useInView();
  useEffect(() => {
    if (!v) return;
    let s = 0; const step = end / (dur / 16);
    const t = setInterval(() => { s += step; if (s >= end) { setC(end); clearInterval(t); } else setC(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [v, end, dur]);
  return <span ref={r}>{c}{sfx}</span>;
}

function R({ children, delay = 0, dir = "up", className = "" }) {
  const [r, v] = useInView();
  const m = { up: "translateY(60px)", left: "translateX(60px)", right: "translateX(-60px)", scale: "scale(0.95)" };
  return <div ref={r} className={className} style={{
    opacity: v ? 1 : 0, transform: v ? "none" : (m[dir] || m.up),
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  }}>{children}</div>;
}

function SvgIcon({ d, size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" dangerouslySetInnerHTML={{ __html: d }} />;
}

/* ════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════ */
export default function LNB() {
  const [sY, setSY] = useState(0);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [ready, setReady] = useState(false);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [hovering, setHov] = useState(false);

  useEffect(() => {
    const onS = () => setSY(window.scrollY);
    const onM = (e) => { setCurX(e.clientX); setCurY(e.clientY); };
    window.addEventListener("scroll", onS, { passive: true });
    window.addEventListener("mousemove", onM, { passive: true });
    setTimeout(() => setReady(true), 200);
    return () => { window.removeEventListener("scroll", onS); window.removeEventListener("mousemove", onM); };
  }, []);

  useEffect(() => {
    const ids = ["home","services","about","locations","testimonials","contact"];
    const obs = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); }, { threshold: 0.2 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = useCallback((id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); }, []);
  const navSolid = sY > 50;

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'DM Sans',sans-serif", overflowX: "hidden", cursor: "none" }}
      onMouseEnter={() => setHov(false)} >
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&display=swap" rel="stylesheet" />

      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{overflow-x:hidden;cursor:none}
        ::selection{background:${C.accent};color:#fff}
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:${C.navy}}
        ::-webkit-scrollbar-thumb{background:${C.blue};border-radius:3px}

        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-24px) rotate(1deg)}}
        @keyframes floatSlow{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(-0.5deg)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(80px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes dashDraw{to{stroke-dashoffset:0}}
        @keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 20px ${C.accentGlow}}50%{box-shadow:0 0 40px ${C.accentGlow},0 0 80px rgba(61,139,253,0.1)}}

        a{cursor:none}
        button{cursor:none}

        .nl{position:relative;color:${C.onDarkSoft};text-decoration:none;font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;padding:8px 0;transition:color 0.4s;cursor:none}
        .nl:hover,.nl.a{color:#fff}
        .nl::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:1.5px;background:${C.accent};transform:scaleX(0);transform-origin:right;transition:transform 0.5s cubic-bezier(0.16,1,0.3,1)}
        .nl:hover::after,.nl.a::after{transform:scaleX(1);transform-origin:left}

        .svc-card{position:relative;background:${C.white};border:1px solid ${C.cardBorder};border-radius:16px;padding:48px 36px 40px;transition:all 0.6s cubic-bezier(0.16,1,0.3,1);cursor:none;text-decoration:none;color:inherit;display:block;overflow:hidden}
        .svc-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,${C.accentSoft},transparent 60%);opacity:0;transition:opacity 0.5s;border-radius:16px}
        .svc-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,${C.accent},${C.ice});transform:scaleX(0);transform-origin:left;transition:transform 0.6s cubic-bezier(0.16,1,0.3,1)}
        .svc-card:hover{transform:translateY(-12px);box-shadow:0 32px 80px rgba(9,27,51,0.12),0 8px 24px rgba(9,27,51,0.06);border-color:transparent}
        .svc-card:hover::before{opacity:1}
        .svc-card:hover::after{transform:scaleX(1)}

        .loc-card{background:${C.white};border:1px solid ${C.cardBorder};border-radius:12px;padding:36px 30px;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);position:relative;overflow:hidden;cursor:none}
        .loc-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(9,27,51,0.1);border-color:${C.accent}}

        .glass-card{background:${C.glass};backdrop-filter:blur(20px) saturate(160%);border:1px solid ${C.glassBorder};border-radius:16px}

        .fi{width:100%;padding:18px 22px;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-size:15px;transition:all 0.3s;outline:none;cursor:none}
        .fi:focus{border-color:${C.accent};box-shadow:0 0 0 4px ${C.accentSoft};background:rgba(255,255,255,0.06)}
        .fi::placeholder{color:${C.onDarkMuted}}

        .marquee-t{display:flex;gap:80px;animation:marquee 40s linear infinite}

        .grain{position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:0.035;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:256px 256px}

        @media(max-width:1024px){.desk{display:none!important}.mob-tog{display:flex!important}}
        @media(max-width:768px){.rg2{grid-template-columns:1fr!important}.hm{display:none!important}}

        .mob-menu{position:fixed;inset:0;background:${C.navy};z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px}
      `}</style>

      {/* GRAIN OVERLAY */}
      <div className="grain" />

      {/* CUSTOM CURSOR */}
      <div className="hm" style={{
        position:"fixed",left:curX-5,top:curY-5,width:10,height:10,borderRadius:"50%",
        background:C.accent,zIndex:10000,pointerEvents:"none",
        transition:"transform 0.15s, opacity 0.3s",
        transform: hovering ? "scale(3)" : "scale(1)",
        mixBlendMode:"difference",
      }}/>
      <div className="hm" style={{
        position:"fixed",left:curX-24,top:curY-24,width:48,height:48,borderRadius:"50%",
        border:`1px solid ${C.accent}`,zIndex:9999,pointerEvents:"none",
        transition:"transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
        opacity:0.4,
        transform: hovering ? "scale(1.5)" : "scale(1)",
      }}/>

      {/* ═══════ NAV ═══════ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        padding:navSolid?"8px 0":"18px 0",
        background:navSolid?C.navy:"transparent",
        backdropFilter:navSolid?"blur(28px) saturate(180%)":"none",
        borderBottom:navSolid?`1px solid ${C.glassBorder}`:"none",
        transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{cursor:"none"}} onClick={()=>go("home")}
            onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
            <img src={LOGO} alt="Lamar National Bank" style={{height:navSolid?30:38,transition:"height 0.4s",filter:"brightness(0) invert(1)",objectFit:"contain"}}/>
          </div>
          <div className="desk" style={{display:"flex",alignItems:"center",gap:36}}>
            {[["home","Home"],["services","Services"],["about","About"],["locations","Locations"],["testimonials","Stories"],["contact","Contact"]].map(([id,l])=>(
              <span key={id} className={`nl ${active===id?"a":""}`} onClick={()=>go(id)}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>{l}</span>
            ))}
            <a href="https://lamarnationalbank.myebanking.net/" target="_blank" rel="noopener noreferrer"
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{padding:"11px 28px",background:C.accent,color:"#fff",fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",textDecoration:"none",borderRadius:6,transition:"all 0.4s",cursor:"none"}}>
              Online Banking
            </a>
          </div>
          <button className="mob-tog" onClick={()=>setMenu(!menu)} style={{display:"none",background:"none",border:"none",padding:10,flexDirection:"column",gap:6,cursor:"none"}}>
            {[0,1,2].map(i=><span key={i} style={{width:28,height:1.5,background:"#fff",transition:"all 0.3s",transform:menu?(i===0?"rotate(45deg) translateY(7.5px)":i===1?"scaleX(0)":"rotate(-45deg) translateY(-7.5px)"):"none",opacity:menu&&i===1?0:1}}/>)}
          </button>
        </div>
      </nav>

      {menu&&<div className="mob-menu">
        <button onClick={()=>setMenu(false)} style={{position:"absolute",top:20,right:24,background:"none",border:"none",color:"#fff",fontSize:28,cursor:"none"}}>✕</button>
        <img src={LOGO} alt="LNB" style={{height:28,filter:"brightness(0) invert(1)",marginBottom:20}}/>
        {[["home","Home"],["services","Services"],["about","About"],["locations","Locations"],["testimonials","Stories"],["contact","Contact"]].map(([id,l],i)=>(
          <span key={id} onClick={()=>go(id)} style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:"#fff",cursor:"none",opacity:0,animation:`slideUp 0.5s ${0.05+i*0.06}s forwards`}}>{l}</span>
        ))}
      </div>}

      {/* ═══════ HERO ═══════ */}
      <section id="home" style={{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden",background:C.navy}}>
        {/* Animated gradient mesh */}
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 60% at 20% 50%, ${C.navyMid}, transparent),radial-gradient(ellipse 60% 80% at 80% 20%, ${C.blue}, transparent),radial-gradient(ellipse 50% 50% at 50% 100%, #0a2a52, transparent)`,backgroundSize:"200% 200%",animation:"gradMove 20s ease infinite"}}/>
        
        {/* Dot grid */}
        <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${C.onDarkMuted} 0.5px, transparent 0.5px)`,backgroundSize:"32px 32px",opacity:0.15}}/>
        
        {/* Animated Texas Star SVG */}
        <div style={{position:"absolute",right:"-5%",top:"10%",width:"55vw",maxWidth:700,opacity:0.04,animation:"spinSlow 120s linear infinite"}}>
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="200,20 232,150 370,150 256,222 290,356 200,276 110,356 144,222 30,150 168,150" fill="white"/>
          </svg>
        </div>

        {/* Floating geometric accents */}
        <div style={{position:"absolute",top:"15%",right:"15%",width:200,height:200,border:`1px solid rgba(61,139,253,0.08)`,borderRadius:"50%",animation:"float 10s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"20%",left:"8%",width:120,height:120,border:`1px solid rgba(192,217,247,0.06)`,animation:"float 8s ease-in-out infinite 2s"}}/>
        <div style={{position:"absolute",top:"50%",right:"35%",width:8,height:8,borderRadius:"50%",background:C.accent,opacity:0.3,animation:"float 6s ease-in-out infinite 1s"}}/>
        <div style={{position:"absolute",top:"30%",left:"20%",width:6,height:6,borderRadius:"50%",background:C.ice,opacity:0.2,animation:"float 7s ease-in-out infinite 3s"}}/>
        
        {/* Decorative line */}
        <svg style={{position:"absolute",bottom:0,left:0,width:"100%",height:1,overflow:"visible"}} preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100%" y2="0" stroke={C.accent} strokeWidth="1" opacity="0.15"/>
        </svg>

        <div style={{position:"relative",zIndex:2,maxWidth:1400,margin:"0 auto",padding:"180px 48px 120px",width:"100%"}}>
          <div style={{maxWidth:820}}>
            {/* Eyebrow */}
            <div style={{display:"inline-flex",alignItems:"center",gap:16,marginBottom:40,opacity:ready?1:0,transform:ready?"none":"translateY(20px)",transition:"all 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s"}}>
              <svg width="40" height="2"><rect width="40" height="2" fill={C.accent}/></svg>
              <span style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:C.accent,fontWeight:600}}>Est. 1981 · Paris, Texas</span>
            </div>

            {/* Headline */}
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(48px,7vw,96px)",fontWeight:700,lineHeight:1.02,marginBottom:32,color:"#fff",opacity:ready?1:0,transform:ready?"none":"translateY(50px)",transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.4s"}}>
              Your Hometown.{" "}<br/>
              <span style={{fontWeight:400,fontStyle:"italic",background:`linear-gradient(135deg, ${C.ice}, ${C.accent})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Your Neighbors.</span><br/>
              Your Bank.
            </h1>

            {/* Sub */}
            <p style={{fontSize:"clamp(17px,1.6vw,21px)",lineHeight:1.8,color:C.onDarkSoft,maxWidth:540,marginBottom:56,opacity:ready?1:0,transform:ready?"none":"translateY(30px)",transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.6s"}}>
              Relationship banking built around you — not a formula. Local decisions, personal service, and over four decades of Texas&nbsp;trust.
            </p>

            {/* CTAs */}
            <div style={{display:"flex",flexWrap:"wrap",gap:20,opacity:ready?1:0,transform:ready?"none":"translateY(20px)",transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.8s"}}>
              <a href="http://lamarnationalbank.csinufund.com" target="_blank" rel="noopener noreferrer"
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{padding:"18px 44px",background:"#fff",color:C.navy,fontWeight:700,fontSize:13,letterSpacing:1.2,textTransform:"uppercase",textDecoration:"none",borderRadius:8,transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",cursor:"none"}}>
                Open an Account
              </a>
              <a href="https://loans.lamarnational.com" target="_blank" rel="noopener noreferrer"
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{padding:"17px 43px",background:"transparent",color:"#fff",fontWeight:600,fontSize:13,letterSpacing:1.2,textTransform:"uppercase",textDecoration:"none",border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:8,transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",cursor:"none"}}>
                Apply for a Loan
              </a>
            </div>
          </div>

          {/* FDIC */}
          <div className="hm" style={{position:"absolute",bottom:60,right:48,opacity:ready?0.35:0,transition:"opacity 1.2s 1.4s",fontSize:10,letterSpacing:2.5,textTransform:"uppercase",textAlign:"right",lineHeight:2,color:C.onDarkMuted}}>
            Member FDIC<br/>Equal Housing Lender<br/>NMLS ID 480341
          </div>
        </div>

        {/* Scroll */}
        <div style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:10,opacity:ready?0.35:0,transition:"opacity 1s 1.6s"}}>
          <span style={{fontSize:9,letterSpacing:4,textTransform:"uppercase",color:C.onDarkMuted}}>Scroll</span>
          <div style={{width:1,height:40,background:`linear-gradient(to bottom, ${C.accent}, transparent)`}}/>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <div style={{background:C.navy,borderBottom:`1px solid ${C.glassBorder}`,padding:"16px 0",overflow:"hidden"}}>
        <div className="marquee-t">
          {[...Array(2)].map((_,i)=>(
            <div key={i} style={{display:"flex",gap:80,alignItems:"center",flexShrink:0}}>
              {["Relationship Banking at Its Best","Personal Banking","Business Solutions","Home Loans","Digital Banking","1031 Exchange","Treasury Management","Student Loans"].map((t,j)=>(
                <span key={j} style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:400,color:C.onDarkSoft,whiteSpace:"nowrap",letterSpacing:1,fontStyle:"italic"}}>
                  {t}<span style={{margin:"0 24px",color:C.accent,opacity:0.4,fontStyle:"normal"}}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" style={{padding:"140px 48px",maxWidth:1400,margin:"0 auto"}}>
        <R><div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
          <svg width="48" height="2"><rect width="48" height="2" fill={C.accent} rx="1"/></svg>
          <span style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:C.accent,fontWeight:600}}>What We Offer</span>
        </div></R>
        <R delay={0.08}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4.5vw,60px)",fontWeight:600,marginBottom:12,color:C.text,lineHeight:1.1}}>Banking Services</h2></R>
        <R delay={0.12}><p style={{fontSize:18,color:C.textSoft,maxWidth:520,marginBottom:80,lineHeight:1.75}}>Every service backed by local expertise and a team that knows you by name.</p></R>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(360px, 1fr))",gap:28}}>
          {SVCS.map((s,i)=>(
            <R key={i} delay={0.06+i*0.06}>
              <a href={s.link} target="_blank" rel="noopener noreferrer" className="svc-card"
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                <div style={{width:52,height:52,borderRadius:12,background:C.accentSoft,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,color:C.accent,transition:"all 0.4s"}}>
                  <SvgIcon d={s.icon} size={24}/>
                </div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:600,marginBottom:14,color:C.text}}>{s.title}</h3>
                <p style={{fontSize:15,lineHeight:1.75,color:C.textSoft,marginBottom:24}}>{s.desc}</p>
                <span style={{fontSize:12,fontWeight:600,color:C.accent,letterSpacing:1.5,textTransform:"uppercase",display:"inline-flex",alignItems:"center",gap:8}}>
                  Explore <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>
            </R>
          ))}
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section style={{background:C.navy,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${C.onDarkMuted} 0.5px, transparent 0.5px)`,backgroundSize:"40px 40px",opacity:0.08}}/>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"100px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:48,position:"relative"}}>
          {[{v:1981,l:"Founded",s:""},{v:7,l:"Locations Across Texas",s:""},{v:40,l:"Years of Trust",s:"+"},{v:100,l:"Local Decisions",s:"%"}].map((s,i)=>(
            <R key={i} delay={0.08+i*0.1}><div style={{textAlign:"center",flex:"1 1 200px"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(48px,5vw,72px)",fontWeight:300,color:"#fff",lineHeight:1,letterSpacing:"-2px"}}>
                <Counter end={s.v} sfx={s.s}/>
              </div>
              <div style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:C.onDarkMuted,marginTop:12,fontWeight:500}}>{s.l}</div>
            </div></R>
          ))}
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" style={{padding:"140px 48px",maxWidth:1400,margin:"0 auto"}}>
        <div className="rg2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:100,alignItems:"center"}}>
          <div>
            <R><div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
              <svg width="48" height="2"><rect width="48" height="2" fill={C.accent} rx="1"/></svg>
              <span style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:C.accent,fontWeight:600}}>Our Story</span>
            </div></R>
            <R delay={0.08}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(34px,4vw,52px)",fontWeight:600,marginBottom:32,color:C.text,lineHeight:1.12}}>
              Relationship Banking<br/><span style={{fontStyle:"italic",fontWeight:400,color:C.blueRich}}>at Its Best</span>
            </h2></R>
            <R delay={0.14}><p style={{fontSize:17,lineHeight:1.85,color:C.textSoft,marginBottom:24}}>
              Lamar National Bank was founded in 1981 in Paris, Texas, by business leaders who believed banking should be built on relationships — not red tape. Over four decades later, that belief drives everything we do.
            </p></R>
            <R delay={0.18}><p style={{fontSize:17,lineHeight:1.85,color:C.textSoft,marginBottom:24}}>
              Each branch is led by a local market president with the authority to make decisions tailored to your community. We build lifelong, multigenerational relationships — one customer, one family, one community at a time.
            </p></R>
            <R delay={0.22}><p style={{fontSize:17,lineHeight:1.85,color:C.textSoft,marginBottom:40}}>
              From Paris to Frisco, Celina to College Station, our growth is driven by the same philosophy that started it all: know your customer, earn their trust, exceed their expectations.
            </p></R>
            <R delay={0.26}><a href="https://www.lamarnationalbank.com/about-us/" target="_blank" rel="noopener noreferrer"
              onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{display:"inline-flex",alignItems:"center",gap:10,padding:"16px 36px",border:`1.5px solid ${C.blue}`,color:C.blue,fontWeight:600,fontSize:13,letterSpacing:1.2,textTransform:"uppercase",textDecoration:"none",borderRadius:8,transition:"all 0.4s",cursor:"none"}}>
              Our Full Story <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={C.blue} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a></R>
          </div>
          <R delay={0.15} dir="left">
            <div style={{position:"relative"}}>
              {/* Decorative frame */}
              <div style={{position:"absolute",top:-24,right:-24,width:"100%",height:"100%",border:`1.5px solid ${C.accent}`,borderRadius:16,opacity:0.12}}/>
              <div style={{position:"absolute",bottom:-16,left:-16,width:80,height:80,borderRadius:"50%",background:C.accentSoft,animation:"pulseGlow 4s ease-in-out infinite"}}/>
              <div style={{background:C.bgAlt,borderRadius:16,padding:60,position:"relative",borderLeft:`4px solid ${C.accent}`}}>
                <svg width="48" height="48" viewBox="0 0 48 48" style={{marginBottom:20,opacity:0.15}}>
                  <text x="0" y="44" fontFamily="'Playfair Display',serif" fontSize="64" fill={C.blue}>"</text>
                </svg>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:23,fontStyle:"italic",lineHeight:1.65,color:C.text,marginBottom:28,fontWeight:400}}>
                  It's about having conversations and learning about your frustrations. It's about solving problems and working together to help you reach your goals.
                </p>
                <svg width="40" height="2"><rect width="40" height="2" fill={C.accent} rx="1"/></svg>
                <div style={{marginTop:14,fontSize:12,letterSpacing:3,textTransform:"uppercase",color:C.accent,fontWeight:600}}>Lamar National Bank</div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ═══════ LOCATIONS ═══════ */}
      <section id="locations" style={{padding:"140px 48px",background:C.bgAlt}}>
        <div style={{maxWidth:1400,margin:"0 auto"}}>
          <R><div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
            <svg width="48" height="2"><rect width="48" height="2" fill={C.accent} rx="1"/></svg>
            <span style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:C.accent,fontWeight:600}}>Find Us</span>
          </div></R>
          <R delay={0.08}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4.5vw,60px)",fontWeight:600,marginBottom:12,color:C.text}}>Our Locations</h2></R>
          <R delay={0.12}><p style={{fontSize:18,color:C.textSoft,maxWidth:540,marginBottom:80,lineHeight:1.75}}>Seven branches across Texas, each led by a dedicated market president.</p></R>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(290px, 1fr))",gap:20}}>
            {LOCS.map((l,i)=>(
              <R key={i} delay={0.04+i*0.04}>
                <div className="loc-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:600,color:C.text}}>
                      {l.city}<span style={{color:C.textMuted,fontSize:15,fontWeight:400}}>, {l.st}</span>
                    </h3>
                    {l.flag&&<span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",background:C.accentSoft,color:C.accent,padding:"4px 12px",borderRadius:20,fontWeight:600}}>Flagship</span>}
                    {l.lpo&&<span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",background:C.bgAlt,color:C.textMuted,padding:"4px 12px",borderRadius:20,fontWeight:600}}>LPO</span>}
                  </div>
                  <p style={{fontSize:14,color:C.textSoft,lineHeight:1.6,marginBottom:4}}>{l.addr}</p>
                  <p style={{fontSize:14,color:C.textMuted,marginBottom:16}}>{l.city}, {l.st} {l.zip}</p>
                  <a href={`tel:${l.ph.replace(/\D/g,"")}`} style={{fontSize:15,color:C.accent,textDecoration:"none",fontWeight:600,cursor:"none"}}>{l.ph}</a>
                </div>
              </R>
            ))}
          </div>

          <R delay={0.3}><div style={{marginTop:56,padding:"32px 40px",background:C.white,borderRadius:12,border:`1px solid ${C.cardBorder}`,display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"24px 64px"}}>
            {[{l:"Main Line",v:"(903) 785-0701"},{l:"Telebanking",v:"1-844-744-3388"},{l:"Lost Debit Card",v:"1-800-545-4274"},{l:"Routing Number",v:"111909870"}].map((x,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{fontSize:10,letterSpacing:2.5,textTransform:"uppercase",color:C.textMuted,marginBottom:4,fontWeight:500}}>{x.l}</div>
                <div style={{fontSize:17,color:C.text,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>{x.v}</div>
              </div>
            ))}
          </div></R>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section id="testimonials" style={{padding:"140px 0",background:C.navy,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 60% at 80% 50%, ${C.navyMid}, transparent)`}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${C.onDarkMuted} 0.5px, transparent 0.5px)`,backgroundSize:"40px 40px",opacity:0.06}}/>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 48px",marginBottom:72,position:"relative"}}>
          <R><div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
            <svg width="48" height="2"><rect width="48" height="2" fill={C.accent} rx="1" opacity="0.5"/></svg>
            <span style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:C.onDarkMuted,fontWeight:600}}>Client Stories</span>
          </div></R>
          <R delay={0.08}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4.5vw,60px)",fontWeight:600,color:"#fff"}}>What They Say</h2></R>
        </div>
        <div style={{overflowX:"auto",paddingLeft:"max(48px, calc((100vw - 1304px)/2))",paddingBottom:24,display:"flex",gap:28,scrollbarWidth:"none",position:"relative"}}>
          {TESTS.map((t,i)=>(
            <R key={i} delay={0.08+i*0.1} dir="left">
              <div className="glass-card" style={{minWidth:480,maxWidth:480,padding:52,flexShrink:0}}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:56,color:C.accent,lineHeight:1,opacity:0.3,marginBottom:16}}>"</div>
                <p style={{fontSize:16,lineHeight:1.85,color:C.onDark,marginBottom:36,fontStyle:"italic"}}>{t.q}</p>
                <svg width="32" height="2"><rect width="32" height="2" fill={C.accent} rx="1" opacity="0.4"/></svg>
                <div style={{marginTop:16,fontWeight:600,fontSize:15,color:"#fff"}}>{t.n}</div>
                <div style={{fontSize:13,color:C.onDarkMuted,marginTop:2}}>{t.t}</div>
              </div>
            </R>
          ))}
          <div style={{minWidth:48,flexShrink:0}}/>
        </div>
      </section>

      {/* ═══════ MOBILE APP ═══════ */}
      <section style={{padding:"140px 48px",maxWidth:1400,margin:"0 auto"}}>
        <div className="rg2" style={{background:`linear-gradient(135deg, ${C.navy}, ${C.navyMid})`,borderRadius:20,padding:"80px 64px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(rgba(255,255,255,0.03) 0.5px, transparent 0.5px)`,backgroundSize:"24px 24px"}}/>
          <R><div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
              <svg width="48" height="2"><rect width="48" height="2" fill={C.accent} rx="1"/></svg>
              <span style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:C.accent,fontWeight:600}}>Go Digital</span>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(30px,3.2vw,44px)",fontWeight:600,marginBottom:24,color:"#fff",lineHeight:1.15}}>
              Your Entire Bank,<br/>In Your Pocket
            </h2>
            <p style={{fontSize:17,lineHeight:1.8,color:C.onDarkSoft,marginBottom:40}}>
              Deposit checks, track transactions, transfer funds, pay bills — anytime, anywhere. Download the Lamar National Bank app.
            </p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              {[{l:"App Store",u:"https://apps.apple.com/us/app/lamar-national-bank/id1145592593"},{l:"Google Play",u:"https://play.google.com/store/apps/details?id=com.csiweb.digitalbanking.bk0265"}].map((a,i)=>(
                <a key={i} href={a.u} target="_blank" rel="noopener noreferrer"
                  onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                  style={{display:"inline-flex",alignItems:"center",gap:10,padding:"14px 28px",background:"#fff",color:C.navy,textDecoration:"none",fontWeight:700,fontSize:13,borderRadius:8,transition:"all 0.4s",cursor:"none",letterSpacing:0.5}}>
                  {a.l}
                </a>
              ))}
            </div>
          </div></R>
          <R delay={0.15} dir="left"><div style={{display:"flex",justifyContent:"center",position:"relative",zIndex:1}}>
            <div style={{width:220,height:440,borderRadius:32,border:`2px solid rgba(61,139,253,0.2)`,background:`linear-gradient(180deg, ${C.blue}, ${C.navy})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,position:"relative",boxShadow:`0 40px 80px rgba(0,0,0,0.3), 0 0 60px ${C.accentGlow}`}}>
              <div style={{position:"absolute",top:14,width:60,height:4,borderRadius:2,background:"rgba(255,255,255,0.06)"}}/>
              <img src={LOGO_MARK} alt="LNB" style={{width:44,height:44,objectFit:"contain",filter:"brightness(0) invert(1)",opacity:0.85}}/>
              <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.onDarkMuted}}>Mobile Banking</div>
              <div style={{width:"60%",height:1,background:"rgba(255,255,255,0.06)"}}/>
              <div style={{display:"flex",flexDirection:"column",gap:7,width:"70%"}}>
                {["Accounts","Transfers","Deposit","Pay Bills"].map((x,j)=>(
                  <div key={j} style={{padding:"8px 12px",background:"rgba(255,255,255,0.04)",borderRadius:8,fontSize:11,color:C.onDarkSoft,textAlign:"center",border:"1px solid rgba(255,255,255,0.04)"}}>{x}</div>
                ))}
              </div>
            </div>
          </div></R>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" style={{padding:"140px 48px",background:C.navy,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 50% at 30% 80%, ${C.navyMid}, transparent)`}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${C.onDarkMuted} 0.5px, transparent 0.5px)`,backgroundSize:"40px 40px",opacity:0.05}}/>
        <div style={{maxWidth:720,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <R><div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:12}}>
            <svg width="48" height="2"><rect width="48" height="2" fill={C.accent} rx="1" opacity="0.4"/></svg>
            <span style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:C.onDarkMuted,fontWeight:600}}>Get Started</span>
            <svg width="48" height="2"><rect width="48" height="2" fill={C.accent} rx="1" opacity="0.4"/></svg>
          </div></R>
          <R delay={0.08}><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4.5vw,56px)",fontWeight:600,marginBottom:14,color:"#fff"}}>Start a Conversation</h2></R>
          <R delay={0.12}><p style={{fontSize:17,color:C.onDarkSoft,marginBottom:56,lineHeight:1.75}}>Tell us about yourself and what you're looking for. A member of our team will reach out personally.</p></R>
          <R delay={0.16}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <input className="fi" placeholder="First Name"/>
              <input className="fi" placeholder="Last Name"/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <input className="fi" type="email" placeholder="Email Address"/>
              <input className="fi" type="tel" placeholder="Phone Number"/>
            </div>
            <select className="fi" style={{marginBottom:16,appearance:"none"}}>
              <option value="">I'm interested in...</option>
              {["Checking Accounts","Savings & CDs","Credit or Debit Card","Home Loan / Mortgage","Personal Loan","Business Banking","Treasury Services","1031 Exchange","Other"].map((o,i)=><option key={i}>{o}</option>)}
            </select>
            <select className="fi" style={{marginBottom:16,appearance:"none"}}>
              <option value="">Nearest Branch</option>
              {LOCS.map((l,i)=><option key={i}>{l.city}, {l.st}</option>)}
            </select>
            <textarea className="fi" rows={4} placeholder="Tell us about your banking needs..." style={{marginBottom:28,resize:"vertical"}}/>
            <button onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
              style={{width:"100%",padding:"20px",background:C.accent,color:"#fff",border:"none",borderRadius:10,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,letterSpacing:1.5,textTransform:"uppercase",cursor:"none",transition:"all 0.4s"}}>
              Send My Information →
            </button>
            <p style={{fontSize:12,color:C.onDarkMuted,marginTop:18}}>Submissions should not include sensitive or confidential information.</p>
          </R>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{background:C.navy,borderTop:`1px solid ${C.glassBorder}`,padding:"80px 48px 40px"}}>
        <div style={{maxWidth:1400,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:48,marginBottom:64}}>
            <div>
              <img src={LOGO} alt="Lamar National Bank" style={{height:32,filter:"brightness(0) invert(1)",objectFit:"contain",marginBottom:20}}/>
              <p style={{fontSize:14,lineHeight:1.8,color:C.onDarkMuted,marginBottom:24}}>Relationship banking built around you. Locally owned by Texans since 1981.</p>
              <div style={{display:"flex",gap:12}}>
                {[{l:"FB",u:"https://www.facebook.com/lamarnationalbank/"},{l:"IG",u:"https://www.instagram.com/lamarnationalbank/"},{l:"LI",u:"https://www.linkedin.com/company/lamar-national-bank/"}].map((s,i)=>(
                  <a key={i} href={s.u} target="_blank" rel="noopener noreferrer"
                    onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                    style={{width:36,height:36,border:`1px solid ${C.glassBorder}`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:600,color:C.onDarkMuted,textDecoration:"none",cursor:"none",transition:"all 0.3s"}}>{s.l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.accent,marginBottom:20,fontWeight:600}}>Banking</h4>
              {["Personal Banking","Business Banking","Online Banking","Home Loans","Student Loans","1031 Exchange"].map((l,i)=>(
                <div key={i} style={{marginBottom:10}}><span style={{fontSize:14,color:C.onDarkMuted,cursor:"none",transition:"color 0.3s"}}>{l}</span></div>
              ))}
            </div>
            <div>
              <h4 style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.accent,marginBottom:20,fontWeight:600}}>Resources</h4>
              {["Order Checks","Secure Upload","Education Center","News Room","Fraud Prevention","Duo Mobile Auth"].map((l,i)=>(
                <div key={i} style={{marginBottom:10}}><span style={{fontSize:14,color:C.onDarkMuted,cursor:"none"}}>{l}</span></div>
              ))}
            </div>
            <div>
              <h4 style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.accent,marginBottom:20,fontWeight:600}}>Contact</h4>
              <div style={{fontSize:14,color:C.onDarkMuted,lineHeight:2.2}}>
                Main: <span style={{color:"#fff"}}>(903) 785-0701</span><br/>
                Telebanking: <span style={{color:"#fff"}}>1-844-744-3388</span><br/>
                Lost Card: <span style={{color:"#fff"}}>1-800-545-4274</span><br/>
                <span style={{marginTop:8,display:"inline-block"}}>Routing: <span style={{color:"#fff"}}>111909870</span></span><br/>
                NMLS ID: <span style={{color:"#fff"}}>480341</span>
              </div>
            </div>
          </div>
          <div style={{borderTop:`1px solid ${C.glassBorder}`,paddingTop:28}}>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:20,marginBottom:20}}>
              <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
                {["Privacy Policy","Mobile Privacy","Terms & Conditions","FDIC Notice"].map((l,i)=>(
                  <span key={i} style={{fontSize:12,color:C.onDarkMuted,cursor:"none"}}>{l}</span>
                ))}
              </div>
              <div style={{display:"flex",gap:12}}>
                {["FDIC","EHL"].map((b,i)=>(
                  <div key={i} style={{padding:"5px 14px",border:`1px solid ${C.glassBorder}`,borderRadius:4,fontSize:10,fontWeight:700,color:C.onDarkMuted,letterSpacing:2}}>{b}</div>
                ))}
              </div>
            </div>
            <p style={{fontSize:11,color:C.onDarkMuted,lineHeight:1.8,opacity:0.6}}>
              Member FDIC. Equal Housing Lender. Lamar National Bank is a VeriSign Secure Site. © {new Date().getFullYear()} Lamar National Bank. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
